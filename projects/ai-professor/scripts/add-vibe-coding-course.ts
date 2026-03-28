import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  // Get first user
  const { data: users } = await supabase
    .from('users')
    .select('id')
    .limit(1)

  const instructorId = users?.[0]?.id
  
  if (!instructorId) {
    console.error('No users found')
    return
  }
  
  console.log('Using instructor:', instructorId)

  // Create the course
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .insert({
      title: 'Vibe Coding Masterclass',
      description: 'Master the art of AI-assisted coding. Learn to describe intent, review AI output, and ship faster than ever.',
      topic: 'Development',
      difficulty: 'beginner',
      duration_weeks: 4,
      is_published: true,
      instructor_id: instructorId,
    })
    .select()
    .single()

  if (courseError) {
    console.error('Error creating course:', courseError)
    return
  }

  console.log('Created course:', course.id)

  // Create lessons with week_number
  const lessons = [
    {
      course_id: course.id,
      title: 'Introduction to Vibe Coding',
      content: '# Introduction to Vibe Coding\n\nLearn the fundamentals of coding with AI. Vibe coding is a revolutionary approach where you describe intent and AI handles implementation.',
      order_index: 1,
      week_number: 1,
    },
    {
      course_id: course.id,
      title: 'The Vibe Coding Mindset',
      content: '# The Vibe Coding Mindset\n\nShift your mental model from syntax to intent. Focus on what you want, not how to write it.',
      order_index: 2,
      week_number: 1,
    },
    {
      course_id: course.id,
      title: 'Essential Tools for Vibe Coding',
      content: '# Essential Tools\n\nCursor, Windsurf, Claude, ChatGPT - the best tools for vibe coding.',
      order_index: 3,
      week_number: 2,
    },
    {
      course_id: course.id,
      title: 'Your First Vibe Coded Project',
      content: '# Your First Project\n\nBuild a portfolio page entirely through vibe coding.',
      order_index: 4,
      week_number: 2,
    },
  ]

  const { error: lessonsError } = await supabase
    .from('lessons')
    .insert(lessons)

  if (lessonsError) {
    console.error('Error creating lessons:', lessonsError)
    return
  }

  console.log('Created', lessons.length, 'lessons')
  console.log('Done! Course added successfully.')
}

main()
