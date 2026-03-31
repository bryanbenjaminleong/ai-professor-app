'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Clock, CheckCircle } from 'lucide-react'
import { Card, Button } from '@/components/ui'
import { useAuthStore } from '@/stores/auth-store'

export default function MyCoursesPage() {
  const { user } = useAuthStore()
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchEnrollments()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchEnrollments = async () => {
    try {
      const res = await fetch('/api/enrollments')
      const data = await res.json()
      if (data.success) setEnrollments(data.data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Courses</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Track your enrolled courses and progress</p>
      </div>

      {enrollments.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No courses yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Start learning by enrolling in a course</p>
          <Link href="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => (
            <Link key={enrollment.id} href={"/courses/" + enrollment.course_id}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {enrollment.courses?.title || 'Course'}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Enrolled
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
