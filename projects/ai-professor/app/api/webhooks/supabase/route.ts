import { NextRequest, NextResponse } from 'next/server'

/**
 * Supabase Webhook Handler
 * 
 * To set up:
 * 1. Go to Supabase Dashboard → Database → Webhooks
 * 2. Create webhook pointing to: https://cxoacademy.co/api/webhooks/supabase
 * 3. Select events: INSERT, UPDATE, DELETE on sensitive tables
 * 4. Add secret: Use same ALERT_SECRET env var
 */

const ALERT_SECRET = process.env.ALERT_SECRET
const ALERTS_ENDPOINT = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}/api/alerts` 
  : 'http://localhost:3000/api/alerts'

interface SupabaseWebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  table: string
  schema: string
  record: Record<string, any>
  old_record?: Record<string, any>
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature
    const authHeader = request.headers.get('authorization')
    if (ALERT_SECRET && authHeader !== `Bearer ${ALERT_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload: SupabaseWebhookPayload = await request.json()
    
    // Define sensitive operations to alert on
    const sensitiveTables = [
      'users',
      'profiles', 
      'subscriptions',
      'ai_content_cache'
    ]

    // Only alert on sensitive table changes
    if (!sensitiveTables.includes(payload.table)) {
      return NextResponse.json({ received: true, alert: false })
    }

    // Determine severity
    const isHighRisk = 
      payload.table === 'subscriptions' ||
      payload.table === 'users' ||
      (payload.type === 'DELETE')

    // Send alert
    await fetch(ALERTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ALERT_SECRET || ''}`
      },
      body: JSON.stringify({
        type: 'custom',
        severity: isHighRisk ? 'high' : 'medium',
        message: `Database change detected on *${payload.table}*`,
        details: {
          operation: payload.type,
          table: payload.table,
          record_id: payload.record?.id || payload.old_record?.id
        },
        timestamp: payload.timestamp
      })
    })

    return NextResponse.json({ 
      received: true, 
      alert: true,
      table: payload.table 
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
