// Cron job endpoint for weekly content review
// Runs every Monday at 3 AM UTC (11 AM SGT)
// Uses OpenAI to analyze course content freshness

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import OpenAI from 'openai'

export const dynamic = 'force-dynamic'

interface FlaggedLesson {
  lesson_id: string
  reason: string
  severity: 'major' | 'minor' | 'patch'
}

export async function GET(request: NextRequest) {
  // Verify this is a legitimate cron request
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  const vercelCronHeader = request.headers.get('x-vercel-cron')
  const hasValidSecret = authHeader === `Bearer ${cronSecret}`
  const isVercelCron = vercelCronHeader === '1' || vercelCronHeader === 'true'

  if (!hasValidSecret && !isVercelCron) {
    console.warn('[ContentReview] Unauthorized request')
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const admin = getSupabaseAdmin() as any
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const now = new Date().toISOString()
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  try {
    console.log('[ContentReview] Starting weekly content review at', now)

    // Fetch all published courses with their lessons
    const { data: courses, error: coursesError } = await admin
      .from('courses')
      .select(`
        id,
        title,
        topic,
        description,
        version,
        changelog,
        lessons (
          id,
          title,
          week_number,
          content,
          version,
          changelog,
          last_reviewed_at
        )
      `)
      .eq('is_published', true)

    if (coursesError) {
      throw new Error(`Failed to fetch courses: ${coursesError.message}`)
    }

    if (!courses || courses.length === 0) {
      console.log('[ContentReview] No published courses found')
      return NextResponse.json({
        success: true,
        message: 'No published courses to review',
        reviewed: 0,
        updated: 0,
      })
    }

    console.log(`[ContentReview] Found ${courses.length} courses to review`)

    let totalUpdated = 0
    const results: Array<{
      courseId: string
      courseTitle: string
      flaggedLessons: number
      errors: string[]
    }> = []

    // Process each course (max 1 OpenAI call per course)
    for (const course of courses) {
      const courseResult = {
        courseId: course.id,
        courseTitle: course.title,
        flaggedLessons: 0,
        errors: [] as string[],
      }

      try {
        const lessons = course.lessons || []

        // Skip courses with no lessons
        if (lessons.length === 0) {
          results.push(courseResult)
          continue
        }

        // Build lesson summaries for the prompt
        const lessonSummaries = lessons.map((lesson: any) => ({
          id: lesson.id,
          title: lesson.title,
          week_number: lesson.week_number,
          content_preview: (lesson.content || '').substring(0, 300),
          last_reviewed: lesson.last_reviewed_at || 'never',
        }))

        // Call OpenAI to analyze content freshness
        const prompt = `You are an AI education content reviewer. Today is ${today}.

Course: "${course.title}" (Topic: ${course.topic})
Description: ${course.description || 'No description'}

Lessons:
${lessonSummaries
  .map(
    (l: any) =>
      `- ID: ${l.id} | Week ${l.week_number}: "${l.title}" | Last reviewed: ${l.last_reviewed} | Preview: ${l.content_preview}...`
  )
  .join('\n')}

Given the latest developments in AI and technology as of ${today}, identify which lessons have outdated content that needs updating.

Consider:
1. New AI model releases (GPT, Claude, Gemini, Llama, etc.)
2. Changed best practices or deprecated approaches
3. New tools or frameworks that should be covered
4. Outdated statistics or benchmarks
5. New research papers or breakthroughs

Return a JSON object with this exact structure:
{
  "flagged_lessons": [
    {
      "lesson_id": "the-lesson-id",
      "reason": "Brief explanation of what needs updating",
      "severity": "major|minor|patch"
    }
  ]
}

Be conservative - only flag lessons where content is genuinely outdated or incorrect. If everything looks current, return an empty array.`

        const response = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert AI education content reviewer. You analyze course content for freshness and relevance given the latest AI developments. Always respond with valid JSON.',
            },
            { role: 'user', content: prompt },
          ],
          temperature: 0.3,
          max_tokens: 1500,
          response_format: { type: 'json_object' },
        })

        const content = response.choices[0]?.message?.content
        if (!content) {
          courseResult.errors.push('No response from OpenAI')
          results.push(courseResult)
          continue
        }

        const parsed = JSON.parse(content)
        const flaggedLessons: FlaggedLesson[] = parsed.flagged_lessons || []

        courseResult.flaggedLessons = flaggedLessons.length

        if (flaggedLessons.length === 0) {
          // Still update last_reviewed_at for the course
          await admin
            .from('courses')
            .update({ last_reviewed_at: now })
            .eq('id', course.id)

          results.push(courseResult)
          continue
        }

        // Process flagged lessons
        for (const flag of flaggedLessons) {
          const lesson = lessons.find(
            (l: any) => l.id === flag.lesson_id
          )
          if (!lesson) {
            courseResult.errors.push(
              `Lesson ${flag.lesson_id} not found in course`
            )
            continue
          }

          const oldVersion = lesson.version || 1
          const newVersion = oldVersion + 1

          // Update lesson version and changelog
          const lessonChangelog = Array.isArray(lesson.changelog)
            ? lesson.changelog
            : []
          const newChangelog = [
            ...lessonChangelog,
            {
              version: newVersion,
              date: now,
              type: flag.severity || 'patch',
              summary: flag.reason,
            },
          ]

          const { error: lessonUpdateError } = await admin
            .from('lessons')
            .update({
              version: newVersion,
              last_reviewed_at: now,
              changelog: newChangelog,
            })
            .eq('id', flag.lesson_id)

          if (lessonUpdateError) {
            courseResult.errors.push(
              `Failed to update lesson ${flag.lesson_id}: ${lessonUpdateError.message}`
            )
            continue
          }

          // Create content_updates record
          await admin.from('content_updates').insert({
            course_id: course.id,
            lesson_id: flag.lesson_id,
            update_type: flag.severity || 'patch',
            summary: flag.reason,
            old_version: oldVersion,
            new_version: newVersion,
          })

          totalUpdated++
        }

        // Update course version and changelog
        const courseOldVersion = course.version || 1
        const courseNewVersion = courseOldVersion + 1
        const courseChangelog = Array.isArray(course.changelog)
          ? course.changelog
          : []
        const newCourseChangelog = [
          ...courseChangelog,
          {
            version: courseNewVersion,
            date: now,
            type: 'minor',
            summary: `${flaggedLessons.length} lesson(s) flagged for update`,
            lesson_ids: flaggedLessons.map((f) => f.lesson_id),
          },
        ]

        await admin
          .from('courses')
          .update({
            version: courseNewVersion,
            last_reviewed_at: now,
            changelog: newCourseChangelog,
          })
          .eq('id', course.id)

        // Notify enrolled users
        const { data: enrollments } = await admin
          .from('enrollments')
          .select('user_id')
          .eq('course_id', course.id)

        if (enrollments && enrollments.length > 0) {
          const notifications = enrollments.map((enrollment: any) => ({
            user_id: enrollment.user_id,
            type: 'content_update',
            title: `Updates available: ${course.title}`,
            message: `${flaggedLessons.length} lesson(s) have been flagged for content updates. Review the latest changes.`,
            related_course_id: course.id,
          }))

          // Batch insert notifications
          const { error: notifError } = await admin
            .from('notifications')
            .insert(notifications)

          if (notifError) {
            courseResult.errors.push(
              `Failed to create notifications: ${notifError.message}`
            )
          }
        }

        console.log(
          `[ContentReview] Course "${course.title}": ${flaggedLessons.length} lessons flagged`
        )
      } catch (courseError: any) {
        console.error(
          `[ContentReview] Error reviewing course ${course.title}:`,
          courseError
        )
        courseResult.errors.push(courseError.message)
      }

      results.push(courseResult)
    }

    const summary = {
      success: true,
      timestamp: now,
      totalCoursesReviewed: courses.length,
      totalLessonsUpdated: totalUpdated,
      results,
    }

    console.log('[ContentReview] Complete:', summary)

    return NextResponse.json(summary)
  } catch (error: any) {
    console.error('[ContentReview] Fatal error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: now,
      },
      { status: 500 }
    )
  }
}
