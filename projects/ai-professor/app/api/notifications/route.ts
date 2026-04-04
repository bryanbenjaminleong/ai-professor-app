// Notifications API - GET (list) and PATCH (mark as read)
// Uses Bearer token authentication via requireAuth

import { NextRequest } from 'next/server'
import { requireAuth, createErrorResponse, createSuccessResponse } from '@/lib/auth'
import { getSupabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// GET /api/notifications - Fetch notifications for current user
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)

    // TODO: migrate to anon+JWT client for proper RLS enforcement
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = getSupabaseAdmin() as any

    // Build query
    const { searchParams } = new URL(request.url)
    let query = admin
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
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
      return createErrorResponse(notifError, 'Failed to fetch notifications', 500)
    }

    // Get unread count
    const { count: unreadCount } = await admin
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_read', false)

    return createSuccessResponse({
      notifications: notifications || [],
      unreadCount: unreadCount || 0,
    })
  } catch (error: any) {
    if (error.statusCode) return createErrorResponse(error, error.message, error.statusCode)
    console.error('[Notifications] GET error:', error)
    return createErrorResponse(error, 'Failed to fetch notifications')
  }
}

// PATCH /api/notifications - Mark notifications as read
export async function PATCH(request: NextRequest) {
  try {
    const user = await requireAuth(request)

    // TODO: migrate to anon+JWT client for proper RLS enforcement
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = getSupabaseAdmin() as any

    const body = await request.json()
    const { notificationIds, markAll } = body

    if (markAll) {
      // Mark all as read for this user
      const { error } = await admin
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false)

      if (error) {
        return createErrorResponse(error, 'Failed to update notifications', 500)
      }

      return createSuccessResponse({ message: 'All notifications marked as read' })
    }

    if (!notificationIds || !Array.isArray(notificationIds) || notificationIds.length === 0) {
      return createErrorResponse(
        new Error('notificationIds array required'),
        'Validation error',
        400
      )
    }

    // Mark specific notifications as read
    const { error } = await admin
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .in('id', notificationIds)

    if (error) {
      return createErrorResponse(error, 'Failed to update notifications', 500)
    }

    return createSuccessResponse({
      message: `${notificationIds.length} notification(s) marked as read`,
    })
  } catch (error: any) {
    if (error.statusCode) return createErrorResponse(error, error.message, error.statusCode)
    console.error('[Notifications] PATCH error:', error)
    return createErrorResponse(error, 'Failed to update notifications')
  }
}
