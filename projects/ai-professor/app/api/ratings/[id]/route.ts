// Single Rating API

import { NextRequest } from 'next/server'
import { db } from '@/lib/supabase'
import { 
  requireAuth, 
  applyRateLimit, 
  createSuccessResponse, 
  createErrorResponse,
} from '@/lib/auth'

// GET /api/ratings/[id] - Get single rating
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await applyRateLimit(request, 200)
    
    const rating = await db.ratings.getById(params.id)
    
    if (!rating) {
      return createErrorResponse(
        new Error('Rating not found'),
        'Not found',
        404
      )
    }
    
    return createSuccessResponse(rating)
  } catch (error) {
    return createErrorResponse(error, 'Failed to fetch rating')
  }
}

// DELETE /api/ratings/[id] - Delete rating
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await applyRateLimit(request, 20)
    
    const user = await requireAuth(request)
    const rating = await db.ratings.getById(params.id)
    
    if (!rating) {
      return createErrorResponse(
        new Error('Rating not found'),
        'Not found',
        404
      )
    }
    
    // Only allow user to delete their own rating
    if (rating.user_id !== user.id) {
      return createErrorResponse(
        new Error('You can only delete your own ratings'),
        'Forbidden',
        403
      )
    }
    
    await db.ratings.delete(params.id)
    
    return createSuccessResponse({ message: 'Rating deleted successfully' })
  } catch (error) {
    return createErrorResponse(error, 'Failed to delete rating')
  }
}
