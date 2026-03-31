'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Users, BookOpen, DollarSign, TrendingUp, Crown, FileText, Settings, BarChart3 } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'

const ADMIN_EMAILS = ['bryanbleong@gmail.com']

export default function AdminPage() {
  const router = useRouter()
  const { user, isLoading } = useAuthStore()
  const [stats, setStats] = useState({ userCount: 0, courseCount: 0, enrollmentCount: 0, revenue: 0 })

  useEffect(() => {
    if (!isLoading && user && !ADMIN_EMAILS.includes(user.email)) {
      router.push('/')
    }
  }, [user, isLoading, router])

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      const data = await res.json()
      if (data.success) {
        setStats(data.data)
      }
    } catch (e) {
      console.error('Failed to fetch stats:', e)
    }
  }

  if (isLoading) {
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
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Welcome back, {user.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Total Users</span>
              <Users className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.userCount}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Enrollments</span>
              <BookOpen className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.enrollmentCount}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Courses</span>
              <FileText className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.courseCount}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Revenue</span>
              <DollarSign className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">${stats.revenue.toLocaleString()}</div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/courses">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white mb-2">
                <BookOpen className="w-5 h-5" />
                Manage Courses
              </div>
              <p className="text-sm text-gray-500">View and manage all courses</p>
            </div>
          </Link>
          <Link href="/dashboard/courses">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white mb-2">
                <Users className="w-5 h-5" />
                View Users
              </div>
              <p className="text-sm text-gray-500">View and manage user accounts</p>
            </div>
          </Link>
          <Link href="/dashboard/settings">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white mb-2">
                <Settings className="w-5 h-5" />
                Settings
              </div>
              <p className="text-sm text-gray-500">Configure site settings</p>
            </div>
          </Link>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Admin Information</h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>Access all lesson content without enrollment</li>
            <li>View all users and their data</li>
            <li>Manage courses and content</li>
            <li>View analytics and reports</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">More admin features coming soon.</p>
        </div>
      </div>
    </div>
  )
}
