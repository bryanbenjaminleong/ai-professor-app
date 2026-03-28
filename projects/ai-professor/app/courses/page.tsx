import { Metadata } from 'next'
import CoursesClient from './CoursesClient'

export const metadata: Metadata = {
  title: 'Courses - AI Professor',
  description: 'Master AI with expert-led courses. From fundamentals to advanced topics.',
}

async function getCourses() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000'
    
    const res = await fetch(`${baseUrl}/api/courses`, {
      cache: 'no-store',
    })
    const data = await res.json()
    return data.data?.courses || data.courses || data || []
  } catch (error) {
    console.error('Failed to fetch courses:', error)
    return []
  }
}

export default async function CoursesPage() {
  const courses = await getCourses()
  return <CoursesClient initialCourses={courses} />
}
