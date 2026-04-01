'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, BookOpen, ChevronRight, Star, RefreshCw } from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'
import { UpdatesSection } from '@/components/UpdatesSection'

interface Course {
  id: string
  title: string
  description: string
  topic: string
  difficulty: string
  duration_weeks: number
  version?: number
  changelog?: Array<{
    version: number
    date: string
    type: string
    summary: string
    lesson_ids?: string[]
  }>
}

interface Lesson {
  id: string
  title: string
  week_number: number
  order_index: number
  version?: number
  changelog?: Array<{
    version: number
    date: string
    type: string
    summary: string
  }>
}

type Tab = 'curriculum' | 'updates'

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export default function CourseDetailClient({ courseId }: { courseId: string }) {
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('curriculum')

  useEffect(() => {
    fetchCourse()
  }, [courseId])

  const fetchCourse = async () => {
    try {
      const response = await fetch('/api/courses/' + courseId)
      const data = await response.json()
      if (data.success && data.data) {
        setCourse(data.data)
        setLessons(data.data.lessons || [])
      }
    } catch (error) {
      console.error('Error fetching course:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Not Found</h1>
          <Link href="/courses"><Button>Back to Courses</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/courses" className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </Link>

          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex-1">
              <Badge className={DIFFICULTY_COLORS[course.difficulty] || DIFFICULTY_COLORS.beginner}>
                {course.difficulty || 'beginner'}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3">{course.title}</h1>
              <p className="text-lg text-white/80 mb-6">{course.description}</p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Self-paced</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{lessons.length || 10} lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  <span>New course</span>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 min-w-[200px]">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">$14.99</div>
                <div className="text-sm text-white/70 mb-4">One-time payment</div>
                <Button className="w-full bg-white text-primary-700 hover:bg-white/90">
                  Enroll Now
                </Button>
                <div className="text-xs text-white/60 mt-2">Secure payment</div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'curriculum'
                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-1.5" />
            Curriculum
          </button>
          <button
            onClick={() => setActiveTab('updates')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'updates'
                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <RefreshCw className="w-4 h-4 inline mr-1.5" />
            Updates
            {(course.version || 0) > 1 && (
              <span className="ml-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs px-1.5 py-0.5 rounded-full">
                v{course.version}
              </span>
            )}
          </button>
        </div>

        {/* Curriculum Tab */}
        {activeTab === 'curriculum' && (
          <>
            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <Link key={lesson.id} href={'/courses/' + courseId + '/lessons/' + lesson.id}>
                  <Card className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                            {lesson.title}
                          </h3>
                          {(lesson.version || 0) > 1 && (
                            <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs">
                              Updated v{lesson.version}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">Week {lesson.week_number}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {lessons.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Lessons Coming Soon</h3>
                <p className="text-gray-600 dark:text-gray-400">This course is being prepared. Check back soon!</p>
              </div>
            )}
          </>
        )}

        {/* Updates Tab */}
        {activeTab === 'updates' && (
          <UpdatesSection
            courseId={courseId}
            lessons={lessons.map((l) => ({
              id: l.id,
              title: l.title,
              version: l.version || 1,
              changelog: (l.changelog || []) as any[],
            }))}
            courseVersion={course.version || 1}
            courseChangelog={(course.changelog || []) as any[]}
          />
        )}
      </div>
    </div>
  )
}
