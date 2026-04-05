import { Metadata } from 'next'
import CoursesClient from './CoursesClient'
import { getSupabaseAdmin } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Modules - CXO Academy',
  description: 'Master AI with expert-led modules. From fundamentals to advanced topics.',
}

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic'

/* eslint-disable @typescript-eslint/no-explicit-any */

async function getCoursesWithProgramInfo() {
  const admin = getSupabaseAdmin()
  
  // Fetch all published courses
  const { data: courses, error: coursesError } = await admin
    .from('courses')
    .select('id, title, description, topic, difficulty, duration_weeks, image_url, lessons(count)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (coursesError) throw coursesError

  // Fetch path_courses
  const { data: pathCourses, error: pcError } = await admin
    .from('path_courses')
    .select('course_id, order_index, path_id')
  
  if (pcError) throw pcError

  // Fetch learning paths for names
  const { data: paths, error: pathsError } = await admin
    .from('learning_paths')
    .select('id, title')

  if (pathsError) throw pathsError

  // Build maps
  const pathNameMap: Record<string, string> = {}
  for (const p of (paths as any[] || [])) {
    pathNameMap[p.id] = p.title
  }

  const courseProgramMap: Record<string, { programName: string; programId: string; moduleNumber: number }> = {}
  for (const pc of (pathCourses as any[] || [])) {
    courseProgramMap[pc.course_id] = {
      programName: pathNameMap[pc.path_id] || '',
      programId: pc.path_id,
      moduleNumber: pc.order_index,
    }
  }

  return (courses as any[] || []).map(c => ({
    id: c.id,
    title: c.title,
    description: c.description || '',
    topic: c.topic,
    difficulty: c.difficulty,
    duration_weeks: c.duration_weeks,
    lesson_count: c.lessons?.[0]?.count || 0,
    image_url: c.image_url ?? undefined,
    programName: courseProgramMap[c.id]?.programName || null,
    programId: courseProgramMap[c.id]?.programId || null,
    moduleNumber: courseProgramMap[c.id]?.moduleNumber || null,
  }))
}

export default async function CoursesPage() {
  const courses = await getCoursesWithProgramInfo()
  return <CoursesClient initialCourses={courses} />
}
