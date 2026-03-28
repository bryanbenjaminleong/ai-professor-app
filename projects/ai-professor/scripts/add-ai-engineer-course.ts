import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  // Read course JSON
  const courseData = JSON.parse(fs.readFileSync('/home/watson/.openclaw/workspace/courses/ai-engineer-bootcamp.json', 'utf8'))
  
  // Get first user for instructor
  const { data: users } = await supabase.from('users').select('id').limit(1)
  const instructorId = users?.[0]?.id
  
  if (!instructorId) {
    console.error('No users found')
    return
  }

  // Create course
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .insert({
      title: courseData.title,
      description: courseData.description,
      topic: courseData.topic,
      difficulty: 'intermediate',
      duration_weeks: 8,
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

  // Create lessons
  let lessonCount = 0
  let orderIndex = 0
  
  for (const week of courseData.weeks) {
    for (const lesson of week.lessons) {
      orderIndex++
      const { error } = await supabase.from('lessons').insert({
        course_id: course.id,
        title: lesson.title,
        content: lesson.content,
        order_index: orderIndex,
        week_number: week.week,
      })
      
      if (error) {
        console.error(`Error creating lesson ${lesson.title}:`, error.message)
      } else {
        lessonCount++
      }
    }
  }
  
  console.log(`Created ${lessonCount} lessons`)
  console.log('Done!')
}

main()
