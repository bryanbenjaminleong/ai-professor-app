'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Users, BookOpen, DollarSign, TrendingUp, Crown, FileText, 
  Settings, BarChart3, ArrowUpRight, ArrowDownRight, Calendar,
  Activity, Eye, Clock, Globe
} from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'

const ADMIN_EMAILS = ['bryanbleong@gmail.com']

interface AdminStats {
  userCount: number
  courseCount: number
  enrollmentCount: number
  revenue: number
  recentUsers: any[]
  recentEnrollments: any[]
  topCourses: any[]
  newsCount: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const { user, isLoading, checkAuth } = useAuthStore()
  const [stats, setStats] = useState<AdminStats>({
    userCount: 0, courseCount: 0, enrollmentCount: 0, revenue: 0,
    recentUsers: [], recentEnrollments: [], topCourses: [], newsCount: 0
  })
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    checkAuth().finally(() => setAuthLoading(false))
  }, [])

  useEffect(() => {
    if (!isLoading && user && !ADMIN_EMAILS.includes(user.email)) {
      router.push('/')
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user && ADMIN_EMAILS.includes(user.email)) {
      fetchAllStats()
    }
  }, [user, timeRange])

  const fetchAllStats = async () => {
    setLoading(true)
    try {
      const [statsRes, usersRes, coursesRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/activity'),
        fetch('/api/courses'),
      ])
      
      const statsData = await statsRes.json()
      const usersData = await usersRes.json()
      const coursesData = await coursesRes.json()

      setStats({
        userCount: statsData.data?.userCount || 0,
        courseCount: statsData.data?.courseCount || coursesData.data?.length || 0,
        enrollmentCount: statsData.data?.enrollmentCount || 0,
        revenue: statsData.data?.revenue || 0,
        recentUsers: usersData.data?.recentUsers || [],
        recentEnrollments: usersData.data?.recentEnrollments || [],
        topCourses: coursesData.data?.slice(0, 5) || [],
        newsCount: statsData.data?.newsCount || 0,
      })
    } catch (e) {
      console.error('Failed to fetch stats:', e)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    router.push('/auth/login')
    return null
  }

  if (!ADMIN_EMAILS.includes(user.email)) {
    router.push('/')
    return null
  }

  const statCards = [
    { title: 'Total Users', value: stats.userCount, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30', change: '+12%' },
    { title: 'Enrollments', value: stats.enrollmentCount, icon: BookOpen, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30', change: '+8%' },
    { title: 'Published Courses', value: stats.courseCount, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30', change: '+2' },
    { title: 'Revenue', value: '$' + stats.revenue.toLocaleString(), icon: DollarSign, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30', change: '0%' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Welcome back, {user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {['24h', '7d', '30d', '90d'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  timeRange === range
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card) => (
            <div key={card.title} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${card.bg} rounded-lg flex items-center justify-center`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {card.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</div>
              <p className="text-sm text-gray-500 mt-1">{card.title}</p>
            </div>
          ))}
        </div>

        {/* Charts & Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Activity Chart Placeholder */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Activity</h2>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-48 flex items-end justify-between gap-2">
              {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-primary-500 rounded-t-sm transition-all hover:bg-primary-600"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-400">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {stats.recentUsers.slice(0, 5).map((u, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{u.email || 'New user'}</p>
                    <p className="text-xs text-gray-500">Signed up</p>
                  </div>
                </div>
              ))}
              {stats.recentUsers.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
              )}
            </div>
          </div>
        </div>

        {/* Courses & Quick Actions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Courses */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Courses</h2>
            <div className="space-y-3">
              {stats.topCourses.map((course, i) => (
                <div key={course.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 w-6">#{i + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{course.title}</p>
                      <p className="text-xs text-gray-500">{course.difficulty || 'beginner'}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-2 py-1 rounded-full">
                    {course.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
              ))}
              {stats.topCourses.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No courses found</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
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
        </div>

        {/* System Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Platform</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Next.js 14 + Supabase</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Hosting</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Vercel</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Domain</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">ai-professor-app.vercel.app</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <p className="text-sm font-medium text-green-600">Operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
