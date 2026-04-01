// GET /api/courses/[id]/updates - Fetch content update history for a course

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = getSupabaseAdmin() as any
    const courseId = params.id

    // Fetch content updates for this course
    const { data: updates, error } = await admin
      .from('content_updates')
      .select('*')
      .eq('course_id', courseId)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updates || [],
    })
  } catch (error: any) {
    console.error('[CourseUpdates] Error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
