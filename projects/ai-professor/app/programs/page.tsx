import { Metadata } from 'next'
import ProgramsClient from './ProgramsClient'
import { db } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Programs - AI Professor',
  description: 'Master a discipline end-to-end with our comprehensive 4-module programs.',
}

export const dynamic = 'force-dynamic'

async function getPrograms() {
  try {
    const paths = await db.learningPaths.getAll()
    return paths.map(p => {
      const modules = (p.path_courses || [])
        .sort((a: any, b: any) => a.order_index - b.order_index)
        .map((pc: any) => ({
          id: pc.courses.id,
          title: pc.courses.title,
          description: pc.courses.description || '',
          difficulty: pc.courses.difficulty,
          duration_weeks: pc.courses.duration_weeks,
          image_url: pc.courses.image_url,
          lesson_count: pc.courses.lessons?.[0]?.count || 0,
        }))
      const totalLessons = modules.reduce((sum: number, m: any) => sum + m.lesson_count, 0)
      return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        description: p.description || '',
        difficulty: p.difficulty,
        total_weeks: p.total_weeks,
        modules,
        total_lessons: totalLessons,
      }
    })
  } catch (error) {
    console.error('Failed to fetch programs:', error)
    return []
  }
}

export default async function ProgramsPage() {
  const programs = await getPrograms()
  return <ProgramsClient programs={programs} />
}
