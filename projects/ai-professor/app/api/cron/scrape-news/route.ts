// Cron job endpoint for automatic news scraping
// Called by Vercel Cron Jobs twice daily (6 AM and 6 PM UTC)

import { NextRequest, NextResponse } from 'next/server'
import { scrapeAllNews } from '@/lib/news/scraper'
import { processAllUnprocessed } from '@/lib/news/summarizer'

export async function GET(request: NextRequest) {
  // Verify this is a legitimate cron request
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  
  // Allow through if:
  // 1. Has valid CRON_SECRET bearer token (manual trigger / GitHub Actions)
  // 2. Has Vercel cron signature header (automatic Vercel Cron calls)
  const vercelCronHeader = request.headers.get('x-vercel-cron')
  const hasValidSecret = authHeader === `Bearer ${cronSecret}`
  const isVercelCron = vercelCronHeader === '1' || vercelCronHeader === 'true'
  
  if (!hasValidSecret && !isVercelCron) {
    console.warn('[Cron] Unauthorized request - missing or invalid auth')
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    console.log('[Cron] Starting news scrape at', new Date().toISOString())
    
    const result = await scrapeAllNews()
    
    console.log('[Cron] Scrape complete:', result)
    
    // Process unprocessed items (generate AI summaries)
    console.log('[Cron] Starting AI summarization...')
    try {
      await processAllUnprocessed(50)
      console.log('[Cron] Summarization complete')
    } catch (summarizeError) {
      console.error('[Cron] Summarization failed (non-fatal):', summarizeError)
      // Don't fail the whole cron if summarization fails
    }
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      result,
    })
  } catch (error) {
    console.error('[Cron] Scrape failed:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Scrape failed',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
  return GET(request)
}
