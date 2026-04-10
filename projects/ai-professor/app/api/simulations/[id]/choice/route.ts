import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { processChoice } from '@/lib/simulation/engine';
import { getApiUser, createSuccessResponse, createErrorResponse } from '@/lib/auth';
import type { ScenarioChoice } from '@/lib/simulation/types';

function getUserId(req: NextRequest): string | null {
  return req.headers.get('x-user-email');
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getApiUser(req);
  const userId = user?.id || getUserId(req);
  if (!userId) return createErrorResponse(new Error('Unauthorized'));

  try {
    const { scenarioId, choiceId } = await req.json();

    const admin = getSupabaseAdmin();
    const { data: choice, error } = (await admin
      .from('scenario_choices')
      .select('*')
      .eq('id', choiceId)
      .eq('scenario_id', scenarioId)
      .single()) as any;

    if (error || !choice) {
      return createErrorResponse(new Error('Choice not found'));
    }

    const progress = await processChoice(
      userId,
      params.id,
      scenarioId,
      choiceId,
      choice as ScenarioChoice
    );

    return createSuccessResponse({
      progress,
      choice: {
        consequences: (choice as any).consequences,
        feedback: (choice as any).feedback,
        outcome_type: (choice as any).outcome_type,
        points: (choice as any).points,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to process choice';
    return createErrorResponse(new Error(message));
  }
}
