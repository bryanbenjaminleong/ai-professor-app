import { Metadata } from 'next'
import CourseDetailClient from './CourseDetailClient'
import CourseErrorBoundary from './ErrorBoundary'
import { db } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Course - AI Professor',
  description: 'Learn AI with expert-led courses',
}

async function getCourse(id: string) {
  try {
    const course = await db.courses.getById(id)
    return course
  } catch (error) {
    console.error('Failed to fetch course:', error)
    return null
  }
}

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id)

  // Strip lesson content — only send metadata needed for the course detail page.
  // Full lesson content is fetched on the lesson page itself.
  const strippedCourse = course
    ? {
        ...course,
        lessons: (course.lessons || []).map((lesson: any) => ({
          id: lesson.id,
          title: lesson.title,
          week_number: lesson.week_number,
          order_index: lesson.order_index,
        })),
      }
    : null

  return (
    <CourseErrorBoundary>
      <CourseDetailClient courseId={params.id} initialCourse={strippedCourse} />
    </CourseErrorBoundary>
  )
}
