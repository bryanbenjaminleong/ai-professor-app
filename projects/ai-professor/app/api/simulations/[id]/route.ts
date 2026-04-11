import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { createSuccessResponse, createErrorResponse } from '@/lib/auth';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = getSupabaseAdmin();

    const { data: sim, error: simError } = await admin
      .from('simulations')
      .select('*')
      .eq('id', params.id)
      .single();

    if (simError) throw simError;

    const { data: scenarios, error: scenError } = await admin
      .from('scenarios')
      .select('*')
      .eq('simulation_id', params.id)
      .order('sequence_order');

    if (scenError) throw scenError;

    const scenarioIds = (scenarios || []).map((s: any) => s.id);

    const { data: choices, error: choiceError } = await admin
      .from('scenario_choices')
      .select('*')
      .in('scenario_id', scenarioIds);

    if (choiceError) throw choiceError;

    const choicesByScenario: Record<string, any[]> = {};
    for (const ch of (choices || []) as any[]) {
      if (!choicesByScenario[ch.scenario_id]) choicesByScenario[ch.scenario_id] = [];
      choicesByScenario[ch.scenario_id].push(ch);
    }

    const scenariosWithChoices = (scenarios || []).map((s: any) => ({
      ...s,
      choices: choicesByScenario[s.id] || [],
    }));

    return createSuccessResponse({
      simulation: sim,
      scenarios: scenariosWithChoices,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to load simulation';
    return createErrorResponse(err instanceof Error ? err : new Error(message));
  }
}
