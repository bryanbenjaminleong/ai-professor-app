// Admin Stats API

import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { db } from '@/lib/supabase'
import { createSuccessResponse, createErrorResponse } from '@/lib/auth'

const ADMIN_EMAILS = ['bryanbleong@gmail.com']

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
      return createErrorResponse(
        new Error('Unauthorized'),
        'Forbidden',
        403
      )
    }
    
    const stats = await db.analytics.getDashboardStats()
    
    return createSuccessResponse(stats)
  } catch (error) {
    return createErrorResponse(error, 'Failed to fetch stats')
  }
}
