// Admin Stats API

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

const ADMIN_EMAILS = ['bryanbleong@gmail.com']

export async function GET(request: NextRequest) {
  try {
    // Auth: check x-admin-email header (sent from admin client which verifies via localStorage)
    const adminEmail = request.headers.get('x-admin-email')
    if (!adminEmail || !ADMIN_EMAILS.includes(adminEmail)) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }

    const supabase = getSupabaseAdmin()

    // Get user count
    const { count: userCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    // Get course count
    const { count: courseCount } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true })

    // Get enrollment count
    const { count: enrollmentCount } = await supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      success: true,
      data: {
        userCount: userCount || 0,
        courseCount: courseCount || 0,
        enrollmentCount: enrollmentCount || 0,
        revenue: 0,
      }
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 })
  }
}
