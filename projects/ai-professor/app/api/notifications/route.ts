// Notifications API - GET (list) and PATCH (mark as read)
// Uses x-user-email header for auth (same pattern as other endpoints)

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// GET /api/notifications - Fetch notifications for current user
export async function GET(request: NextRequest) {
  try {
    const userEmail = request.headers.get('x-user-email')
    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: 'User email required' },
        { status: 401 }
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = getSupabaseAdmin() as any

    // Look up user profile by email
    const { data: profile, error: profileError } = await admin
      .from('profiles')
      .select('id')
      .eq('email', userEmail)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Build query
    const { searchParams } = new URL(request.url)
    let query = admin
      .from('notifications')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false })

    // Filter for unread only
    if (searchParams.get('unread') === 'true') {
      query = query.eq('is_read', false)
    }

    // Limit results
    const limit = parseInt(searchParams.get('limit') || '50')
    query = query.limit(limit)

    const { data: notifications, error: notifError } = await query

    if (notifError) {
      return NextResponse.json(
        { success: false, error: notifError.message },
        { status: 500 }
      )
    }

    // Get unread count
    const { count: unreadCount } = await admin
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', profile.id)
      .eq('is_read', false)

    return NextResponse.json({
      success: true,
      data: notifications || [],
      unreadCount: unreadCount || 0,
    })
  } catch (error: any) {
    console.error('[Notifications] GET error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// PATCH /api/notifications - Mark notifications as read
export async function PATCH(request: NextRequest) {
  try {
    const userEmail = request.headers.get('x-user-email')
    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: 'User email required' },
        { status: 401 }
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = getSupabaseAdmin() as any

    // Look up user profile
    const { data: profile, error: profileError } = await admin
      .from('profiles')
      .select('id')
      .eq('email', userEmail)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { notificationIds, markAll } = body

    if (markAll) {
      // Mark all as read for this user
      const { error } = await admin
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', profile.id)
        .eq('is_read', false)

      if (error) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'All notifications marked as read',
      })
    }

    if (!notificationIds || !Array.isArray(notificationIds) || notificationIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'notificationIds array required' },
        { status: 400 }
      )
    }

    // Mark specific notifications as read
    const { error } = await admin
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', profile.id)
      .in('id', notificationIds)

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `${notificationIds.length} notification(s) marked as read`,
    })
  } catch (error: any) {
    console.error('[Notifications] PATCH error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
