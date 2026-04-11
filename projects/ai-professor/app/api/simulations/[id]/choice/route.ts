import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { processChoice } from '@/lib/simulation/engine';
import { getApiUser, createSuccessResponse, createErrorResponse } from '@/lib/auth';
import type { ScenarioChoice } from '@/lib/simulation/types';

async function resolveUserId(req: NextRequest): Promise<string | null> {
  const user = await getApiUser(req);
  if (user?.id) return user.id;

  const headerVal = req.headers.get('x-user-email');
  if (!headerVal) return null;

  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(headerVal)) {
    return headerVal;
  }

  const admin = getSupabaseAdmin();
  const { data } = await admin.from('users').select('id').eq('email', headerVal).single();
  return (data as any)?.id || null;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = await resolveUserId(req);
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
