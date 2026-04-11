import { NextRequest } from 'next/server';
import { getUserProgress, startSimulation } from '@/lib/simulation/engine';
import { getApiUser, createSuccessResponse, createErrorResponse } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase';

async function resolveUserId(req: NextRequest): Promise<string | null> {
  const user = await getApiUser(req);
  if (user?.id) return user.id;

  const email = req.headers.get('x-user-email');
  if (!email) return null;

  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(email)) {
    return email;
  }

  const admin = getSupabaseAdmin();
  const { data } = await admin.from('users').select('id').eq('email', email).single();
  return (data as any)?.id || null;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = await resolveUserId(req);
  if (!userId) return createErrorResponse(new Error('Unauthorized'));

  const progress = await getUserProgress(userId, params.id);
  return createSuccessResponse({ progress });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = await resolveUserId(req);
  if (!userId) return createErrorResponse(new Error('Unauthorized'));

  try {
    const body = await req.json();
    const progress = await startSimulation(userId, params.id, body.firstScenarioId);
    return createSuccessResponse({ progress }, 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to start simulation';
    return createErrorResponse(new Error(message));
  }
}
