import { NextRequest } from 'next/server';
import { getUserProgress, startSimulation } from '@/lib/simulation/engine';
import { getApiUser, createSuccessResponse, createErrorResponse } from '@/lib/auth';

function getUserId(req: NextRequest): string | null {
  return req.headers.get('x-user-email');
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getApiUser(req);
  const userId = user?.id || getUserId(req);
  if (!userId) return createErrorResponse(new Error('Unauthorized'));

  const progress = await getUserProgress(userId, params.id);
  return createSuccessResponse({ progress });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getApiUser(req);
  const userId = user?.id || getUserId(req);
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
