/**
 * Voice Preference API Route
 * GET: Get user's voice preference
 * POST: Set user's voice preference
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { getUserFromRequest } from '@/lib/supabase'
import type { VoiceType } from '@/types/voice'

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = getSupabaseAdmin()

    // Get user's voice preference
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('preferred_voice')
      .eq('id', user.id)
      .single() as any

    if (error) {
      console.error('Error fetching voice preference:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch voice preference' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      preferredVoice: profile?.preferred_voice || 'female',
    })
  } catch (error) {
    console.error('Voice preference API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const preferredVoice: VoiceType = body.preferredVoice

    // Validate voice type
    if (!['male', 'female'].includes(preferredVoice)) {
      return NextResponse.json(
        { success: false, error: 'Invalid voice type. Must be "male" or "female"' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()

    // Update user's voice preference
    const { error } = await (supabase as any)
      .from('profiles')
      .update({ preferred_voice: preferredVoice })
      .eq('id', user.id)

    if (error) {
      console.error('Error updating voice preference:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to update voice preference' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Voice preference updated successfully',
      preferredVoice,
    })
  } catch (error) {
    console.error('Voice preference update error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
