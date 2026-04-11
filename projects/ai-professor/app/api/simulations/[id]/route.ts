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
      .select('*, choices:scenario_choices!scenario_choices_scenario_id_fkey(*)')
      .eq('simulation_id', params.id)
      .order('sequence_order');

    if (scenError) throw scenError;

    return createSuccessResponse({
      simulation: sim,
      scenarios: scenarios || [],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to load simulation';
    return createErrorResponse(err instanceof Error ? err : new Error(message));
  }
}
