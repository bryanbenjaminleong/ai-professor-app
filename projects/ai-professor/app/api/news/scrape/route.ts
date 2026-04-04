// POST /api/news/scrape - Trigger manual scrape
// Requires CRON_SECRET bearer token authentication

import { NextRequest, NextResponse } from 'next/server'
import { scrapeAllNews, scrapeSpecificSource, getScrapingStats } from '@/lib/news/scraper'

function verifyCronAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (process.env.NODE_ENV === 'production') {
    if (!cronSecret) return false
    return authHeader === `Bearer ${cronSecret}`
  }
  // In non-production, still require the secret if configured
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) return false
  return true
}

export async function POST(request: NextRequest) {
  try {
    if (!verifyCronAuth(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const body = await request.json().catch(() => ({}))
    const { source } = body
    
    let result
    
    if (source) {
      result = await scrapeSpecificSource(source)
    } else {
      result = await scrapeAllNews()
    }
    
    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('Error triggering scrape:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to trigger scrape' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!verifyCronAuth(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    const stats = await getScrapingStats()
    
    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('Error fetching scrape stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch scrape stats' },
      { status: 500 }
    )
  }
}
