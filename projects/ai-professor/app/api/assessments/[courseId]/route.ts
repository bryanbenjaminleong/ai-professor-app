import { NextRequest, NextResponse } from 'next/server'
import { getAssessment, AssessmentEngine } from '@/lib/assessment-engine'
import { requireAuth } from '@/lib/auth'

// GET /api/assessments/[courseId] - Get assessment for a course
export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const assessment = await getAssessment(params.courseId)
    
    if (!assessment) {
      return NextResponse.json(
        { success: false, error: 'Assessment not found' },
        { status: 404 }
      )
    }

    // Get user if authenticated
    let user = null
    try {
      user = await requireAuth(request)
    } catch {
      // Not authenticated, return assessment without attempt info
    }

    if (user) {
      const engine = new AssessmentEngine(assessment, user.id)
      const { canTake, reason, retakeAvailableAt } = await engine.canTakeAssessment()
      const attempts = await engine.getPreviousAttempts()

      return NextResponse.json({
        success: true,
        data: {
          ...assessment,
          can_take: canTake,
          reason,
          retake_available_at: retakeAvailableAt,
          previous_attempts: attempts.length,
          best_score: attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : null,
        }
      })
    }

    return NextResponse.json({ success: true, data: assessment })
  } catch (error) {
    console.error('Get assessment error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch assessment' },
      { status: 500 }
    )
  }
}

// POST /api/assessments/[courseId] - Submit assessment answers
export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await requireAuth(request)
    const body = await request.json()
    const { answers } = body

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Answers are required' },
        { status: 400 }
      )
    }

    const assessment = await getAssessment(params.courseId)
    
    if (!assessment) {
      return NextResponse.json(
        { success: false, error: 'Assessment not found' },
        { status: 404 }
      )
    }

    const engine = new AssessmentEngine(assessment, user.id)
    const result = await engine.submitAssessment(answers)

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error: any) {
    console.error('Submit assessment error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit assessment' },
      { status: 500 }
    )
  }
}
