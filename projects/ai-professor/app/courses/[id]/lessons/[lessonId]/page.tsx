import { Metadata } from 'next'
import LessonClient from './LessonClient'
import { db } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Lesson - AI Professor',
  description: 'Learn with AI Professor',
}

const ADMIN_EMAILS = ['bryanbleong@gmail.com']

async function getLesson(lessonId: string) {
  try {
    const lesson = await db.lessons.getById(lessonId)
    return lesson
  } catch (error) {
    console.error('Failed to fetch lesson:', error)
    return null
  }
}

async function getCourse(courseId: string) {
  try {
    const course = await db.courses.getById(courseId)
    return course
  } catch (error) {
    console.error('Failed to fetch course:', error)
    return null
  }
}

export default async function LessonPage({ 
  params 
}: { 
  params: { id: string; lessonId: string } 
}) {
  const [lesson, course] = await Promise.all([
    getLesson(params.lessonId),
    getCourse(params.id),
  ])
  
  return <LessonClient 
    lesson={lesson as any} 
    course={course as any}
    courseId={params.id}
    adminEmails={ADMIN_EMAILS}
  />
}
