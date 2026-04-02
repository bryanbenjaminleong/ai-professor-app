// Public API endpoint for homepage stats
// Returns dynamic counts for articles, guides, and courses

import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const revalidate = 300 // Cache for 5 minutes

export async function GET() {
  try {
    const admin = getSupabaseAdmin()
    
    // Fetch all counts in parallel
    const [
      { count: articleCount, error: articlesError },
      { count: courseCount, error: coursesError },
      { count: programCount, error: programsError },
    ] = await Promise.all([
      admin
        .from('news_items')
        .select('*', { count: 'exact', head: true }),
      admin
        .from('courses')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true),
      admin
        .from('learning_paths')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true),
    ])
    
    if (articlesError) {
      console.error('Error fetching article count:', articlesError)
    }
    if (coursesError) {
      console.error('Error fetching course count:', coursesError)
    }
    if (programsError) {
      console.error('Error fetching program count:', programsError)
    }
    
    return NextResponse.json({
      articles: articleCount || 0,
      guides: 24, // Hardcoded as per requirements
      courses: courseCount || 0,
      programs: programCount || 0,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Stats API error:', error)
    
    // Return fallback values on error
    return NextResponse.json({
      articles: 100,
      guides: 24,
      courses: 21,
      programs: 4,
      updatedAt: new Date().toISOString(),
      error: 'Failed to fetch live stats',
    })
  }
}
