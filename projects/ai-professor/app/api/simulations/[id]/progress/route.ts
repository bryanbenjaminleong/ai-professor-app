import { NextRequest } from 'next/server';
import { getUserProgress, startSimulation } from '@/lib/simulation/engine';
import { getApiUser, createSuccessResponse, createErrorResponse } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getApiUser(req);
  if (!user) return createErrorResponse(new Error('Unauthorized'));

  const progress = await getUserProgress(user.id, params.id);
  return createSuccessResponse({ progress });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getApiUser(req);
  if (!user) return createErrorResponse(new Error('Unauthorized'));

  try {
    const body = await req.json();
    const progress = await startSimulation(user.id, params.id, body.firstScenarioId);
    return createSuccessResponse({ progress }, 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to start simulation';
    return createErrorResponse(new Error(message));
  }
}
