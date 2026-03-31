import { Metadata } from 'next'
import CourseDetailClient from './CourseDetailClient'

export const metadata: Metadata = {
  title: 'Course - AI Professor',
  description: 'Learn AI with expert-led courses',
}

export const dynamic = 'force-dynamic'

export default async function CoursePage({ params }: { params: { id: string } }) {
  return <CourseDetailClient courseId={params.id} />
}
