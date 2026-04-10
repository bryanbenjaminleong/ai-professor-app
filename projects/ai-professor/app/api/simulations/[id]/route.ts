import { NextRequest } from 'next/server';
import { loadSimulation } from '@/lib/simulation/engine';
import { createSuccessResponse, createErrorResponse } from '@/lib/auth';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await loadSimulation(params.id);
    return createSuccessResponse(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to load simulation';
    return createErrorResponse(err instanceof Error ? err : new Error(message));
  }
}
