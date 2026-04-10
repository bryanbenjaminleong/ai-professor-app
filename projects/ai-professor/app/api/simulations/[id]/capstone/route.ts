import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getApiUser, createSuccessResponse, createErrorResponse } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getApiUser(req);
  if (!user) return createErrorResponse(new Error('Unauthorized'));

  try {
    const { submissionType, content } = await req.json();

    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from('capstone_submissions')
      .insert({
        user_id: user.id,
        simulation_id: params.id,
        submission_type: submissionType,
        content,
      } as any)
      .select()
      .single();

    if (error) throw error;

    return createSuccessResponse({ submission: data }, 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to submit capstone';
    return createErrorResponse(new Error(message));
  }
}
