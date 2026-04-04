// TODO: migrate to anon+JWT client for proper RLS enforcement
// Course Ratings API

import { NextRequest } from 'next/server'
import { db, handleSupabaseError } from '@/lib/supabase'
import { 
  requireAuth, 
  applyRateLimit, 
  createSuccessResponse, 
  createErrorResponse,
  sanitizeInput,
} from '@/lib/auth'

// GET /api/ratings - Get ratings for a course
export async function GET(request: NextRequest) {
  try {
    await applyRateLimit(request, 200)
    
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('course_id')
    
    if (!courseId) {
      return createErrorResponse(
        new Error('course_id is required'),
        'Validation error',
        400
      )
    }
    
    const ratings = await db.ratings.getByCourse(courseId)
    
    // Calculate average
    const avgRating = ratings.length > 0 
      ? ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / ratings.length 
      : 0
    
    return createSuccessResponse({
      ratings,
      average: Math.round(avgRating * 10) / 10,
      count: ratings.length,
      distribution: {
        5: ratings.filter((r: any) => r.rating === 5).length,
        4: ratings.filter((r: any) => r.rating === 4).length,
        3: ratings.filter((r: any) => r.rating === 3).length,
        2: ratings.filter((r: any) => r.rating === 2).length,
        1: ratings.filter((r: any) => r.rating === 1).length,
      }
    })
  } catch (error) {
    return createErrorResponse(error, 'Failed to fetch ratings')
  }
}

// POST /api/ratings - Submit a rating
export async function POST(request: NextRequest) {
  try {
    await applyRateLimit(request, 20)
    
    const user = await requireAuth(request)
    const body = await request.json()
    
    const { course_id, rating, review } = body
    
    if (!course_id || !rating || rating < 1 || rating > 5) {
      return createErrorResponse(
        new Error('Valid course_id and rating (1-5) are required'),
        'Validation error',
        400
      )
    }
    
    // Check if user already rated
    const existing = await db.ratings.getByUserAndCourse(user.id, course_id)
    
    if (existing) {
      // Update existing rating
      const updated = await db.ratings.update(existing.id, {
        rating,
        review: review ? sanitizeInput(review) : null,
      })
      return createSuccessResponse(updated)
    }
    
    // Create new rating
    const newRating = await db.ratings.create({
      user_id: user.id,
      course_id,
      rating,
      review: review ? sanitizeInput(review) : null,
    })
    
    return createSuccessResponse(newRating)
  } catch (error) {
    return createErrorResponse(error, 'Failed to submit rating')
  }
}
