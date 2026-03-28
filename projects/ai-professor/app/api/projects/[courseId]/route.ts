import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { requireAuth } from '@/lib/auth'

const supabase = getSupabaseAdmin()

// GET /api/projects/[courseId] - Get projects for a course
export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('course_id', params.courseId)
      .order('order_index', { ascending: true })

    if (error) throw error

    // Get user's submissions if authenticated
    let user = null
    try {
      user = await requireAuth(request)
    } catch {
      // Not authenticated
    }

    if (user && projects) {
      const { data: submissions } = await supabase
        .from('project_submissions')
        .select('*')
        .eq('user_id', user.id)
        .in('project_id', projects.map(p => p.id))

      const submissionsMap = new Map(submissions?.map(s => [s.project_id, s]) || [])

      const projectsWithSubmissions = projects.map(p => ({
        ...p,
        submission: submissionsMap.get(p.id) || null,
      }))

      return NextResponse.json({
        success: true,
        data: projectsWithSubmissions,
      })
    }

    return NextResponse.json({ success: true, data: projects })
  } catch (error) {
    console.error('Get projects error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects/[courseId]/submit - Submit a project
export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string; projectId?: string } }
) {
  try {
    const user = await requireAuth(request)
    const body = await request.json()
    const { project_id, submission_url, submission_text, files } = body

    if (!project_id) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      )
    }

    // Check if already submitted and passed
    const { data: existing } = await supabase
      .from('project_submissions')
      .select('*')
      .eq('user_id', user.id)
      .eq('project_id', project_id)
      .eq('passed', true)
      .single()

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Project already passed' },
        { status: 400 }
      )
    }

    // Create submission
    const { data: submission, error } = await supabase
      .from('project_submissions')
      .insert({
        user_id: user.id,
        project_id,
        submission_url,
        submission_text,
        files: files || [],
        status: 'submitted',
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      data: submission,
      message: 'Project submitted successfully. It will be reviewed within 48 hours.',
    })
  } catch (error) {
    console.error('Submit project error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit project' },
      { status: 500 }
    )
  }
}
