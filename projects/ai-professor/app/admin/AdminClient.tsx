'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Users, BookOpen, DollarSign, Crown, FileText, 
  Settings, BarChart3, Globe
} from 'lucide-react'

const ADMIN_EMAILS = ['bryanbleong@gmail.com']

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [stats, setStats] = useState({ userCount: 0, courseCount: 0, enrollmentCount: 0, revenue: 0, topCourses: [] as any[] })

  useEffect(() => {
    // Check localStorage for auth store
    try {
      const stored = localStorage.getItem('auth-storage')
      if (stored) {
        const parsed = JSON.parse(stored)
        const email = parsed?.state?.user?.email
        if (email && ADMIN_EMAILS.includes(email)) {
          setIsAdmin(true)
          setUserEmail(email)
          fetchStats()
        } else {
          router.push('/dashboard')
        }
      } else {
        router.push('/auth/login')
      }
    } catch (e) {
      console.error('Auth check failed:', e)
      router.push('/auth/login')
    } finally {
      setLoading(false)
    }

    // Listen for storage changes (logout)
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem('auth-storage')
        if (!stored) {
          router.push('/auth/login')
          return
        }
        const parsed = JSON.parse(stored)
        if (!parsed?.state?.user?.email) {
          router.push('/auth/login')
        }
      } catch (e) {
        router.push('/auth/login')
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Listen for logout - redirect if user is no longer admin
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const stored = localStorage.getItem('auth-storage')
        if (!stored) {
          router.push('/auth/login')
        } else {
          const parsed = JSON.parse(stored)
          const email = parsed?.state?.user?.email
          if (!email || !ADMIN_EMAILS.includes(email)) {
            router.push('/dashboard')
          }
        }
      } catch {
        router.push('/auth/login')
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [router])

  const fetchStats = async () => {
    try {
      const [statsRes, coursesRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/courses'),
      ])
      const statsData = await statsRes.json()
      const coursesData = await coursesRes.json()
      setStats({
        userCount: statsData.data?.userCount || 0,
        courseCount: statsData.data?.courseCount || coursesData.data?.length || 0,
        enrollmentCount: statsData.data?.enrollmentCount || 0,
        revenue: statsData.data?.revenue || 0,
        topCourses: coursesData.data?.slice(0, 5) || [],
      })
    } catch (e) {
      console.error('Stats error:', e)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
            <Crown className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, {userEmail}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Users', value: stats.userCount, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
            { title: 'Enrollments', value: stats.enrollmentCount, icon: BookOpen, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
            { title: 'Courses', value: stats.courseCount, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
            { title: 'Revenue', value: '$' + stats.revenue.toLocaleString(), icon: DollarSign, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
          ].map((card) => (
            <div key={card.title} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={"w-10 h-10 " + card.bg + " rounded-lg flex items-center justify-center"}>
                  <card.icon className={"w-5 h-5 " + card.color} />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</div>
              <p className="text-sm text-gray-500 mt-1">{card.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">User Activity</h2>
            <div className="h-48 flex items-end justify-between gap-2">
              {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-primary-500 rounded-t-sm hover:bg-primary-600 transition-all" style={{ height: h + '%' }}></div>
                  <span className="text-xs text-gray-400">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Courses</h2>
            <div className="space-y-3">
              {stats.topCourses.map((course: any, i: number) => (
                <div key={course.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">#{i+1} {course.title}</p>
                    <p className="text-xs text-gray-500">{course.difficulty || 'beginner'}</p>
                  </div>
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                    {course.is_published ? 'Live' : 'Draft'}
                  </span>
                </div>
              ))}
              {stats.topCourses.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No courses found</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: BookOpen, label: 'Manage Courses', href: '/courses' },
                { icon: Users, label: 'View Users', href: '/admin/users' },
                { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
                { icon: Globe, label: 'News Sources', href: '/admin/content' },
                { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
                { icon: FileText, label: 'Content', href: '/admin/content' },
              ].map((action) => (
                <Link key={action.label} href={action.href}>
                  <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                    <action.icon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{action.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-gray-500 mb-1">Platform</p><p className="text-sm font-medium text-gray-900 dark:text-white">Next.js 14 + Supabase</p></div>
              <div><p className="text-xs text-gray-500 mb-1">Hosting</p><p className="text-sm font-medium text-gray-900 dark:text-white">Vercel</p></div>
              <div><p className="text-xs text-gray-500 mb-1">Domain</p><p className="text-sm font-medium text-gray-900 dark:text-white">ai-professor-app.vercel.app</p></div>
              <div><p className="text-xs text-gray-500 mb-1">Status</p><p className="text-sm font-medium text-green-600">Operational</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
