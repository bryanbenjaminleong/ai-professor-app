'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  Star, 
  Activity,
  Shield,
  Lock,
  Mail
} from 'lucide-react'
import { Button } from '@/components/ui'
import Link from 'next/link'

// Admin credentials
const ADMIN_EMAIL = 'bryanbleong@gmail.com'
const ADMIN_PASSWORD = 'OriginLabs2024!'
const SESSION_KEY = 'admin_session'

export default function AdminStatsPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if already authenticated this session
    const session = sessionStorage.getItem(SESSION_KEY)
    if (session === ADMIN_EMAIL) {
      setIsAuthenticated(true)
      fetchStats()
    }
  }, [])

  function handleLogin() {
    setError('')
    
    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      setError('Invalid email address')
      return
    }
    
    if (password !== ADMIN_PASSWORD) {
      setError('Invalid password')
      return
    }
    
    // Success
    setIsAuthenticated(true)
    sessionStorage.setItem(SESSION_KEY, ADMIN_EMAIL)
    fetchStats()
  }

  async function fetchStats() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
    setEmail('')
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-900 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
              <p className="text-gray-400">Enter your credentials</p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    autoFocus
                  />
                </div>
              </div>
              
              {/* Password */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <Button
                onClick={handleLogin}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Login
              </Button>
            </div>

            <Link href="/" className="block text-center text-gray-500 text-sm mt-6 hover:text-gray-400">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-red-600 text-white p-4 rounded-lg mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <div>
              <h1 className="text-xl font-bold">🛡️ ADMIN DASHBOARD</h1>
              <p className="text-xs text-red-200">Platform Analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-red-100">{ADMIN_EMAIL}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="border-red-300 text-red-100 hover:bg-red-700"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-blue-500">
            <Users className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-xs text-gray-500">Users</p>
            <p className="text-2xl font-bold text-white">{stats?.totalUsers || 0}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-green-500">
            <BookOpen className="w-5 h-5 text-green-400 mb-2" />
            <p className="text-xs text-gray-500">Courses</p>
            <p className="text-2xl font-bold text-white">{stats?.totalCourses || 0}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-purple-500">
            <FileText className="w-5 h-5 text-purple-400 mb-2" />
            <p className="text-xs text-gray-500">Lessons</p>
            <p className="text-2xl font-bold text-white">{stats?.totalLessons || 0}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-orange-500">
            <TrendingUp className="w-5 h-5 text-orange-400 mb-2" />
            <p className="text-xs text-gray-500">Enrollments</p>
            <p className="text-2xl font-bold text-white">{stats?.totalEnrollments || 0}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-yellow-500">
            <Star className="w-5 h-5 text-yellow-400 mb-2" />
            <p className="text-xs text-gray-500">Avg Rating</p>
            <p className="text-2xl font-bold text-white">{stats?.averageRating || 0}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-pink-500">
            <Activity className="w-5 h-5 text-pink-400 mb-2" />
            <p className="text-xs text-gray-500">Ratings</p>
            <p className="text-2xl font-bold text-white">{stats?.totalRatings || 0}</p>
          </div>
        </div>

        {loading && (
          <p className="text-gray-400 text-center">Loading stats...</p>
        )}

        <p className="text-gray-600 text-center text-sm">
          Admin Dashboard • {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
