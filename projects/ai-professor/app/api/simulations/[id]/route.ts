import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/lib/auth';

function noCache(response: NextResponse): NextResponse {
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('CDN-Cache-Control', 'no-store');
  response.headers.set('Vercel-CDN-Cache-Control', 'no-store');
  return response;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const headers: Record<string, string> = {
      'apikey': supabaseKey!,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'count=exact',
      'Cache-Control': 'no-cache',
    };
    const cacheBust = `&_t=${Date.now()}`;

    const [simRes, scenariosRes] = await Promise.all([
      fetch(`${supabaseUrl}/rest/v1/simulations?id=eq.${params.id}&select=*${cacheBust}`, { headers, cache: 'no-store' }),
      fetch(`${supabaseUrl}/rest/v1/scenarios?simulation_id=eq.${params.id}&select=*&order=sequence_order.asc${cacheBust}`, { headers, cache: 'no-store' }),
    ]);

    const simData = await simRes.json();
    if (!simData || simData.length === 0) throw new Error('Simulation not found');
    const sim = simData[0];

    const scenarios = await scenariosRes.json();
    const contentRange = scenariosRes.headers.get('content-range') || '';

    const scenarioIds: string[] = (scenarios || []).map((s: any) => s.id);

    const choicesRes = await fetch(
      `${supabaseUrl}/rest/v1/scenario_choices?scenario_id=in.(${scenarioIds.join(',')})&select=*&_t=${Date.now()}`,
      { headers, cache: 'no-store' }
    );
    const choices = await choicesRes.json();

    const choicesByScenario: Record<string, any[]> = {};
    for (const ch of (choices || []) as any[]) {
      if (!choicesByScenario[ch.scenario_id]) choicesByScenario[ch.scenario_id] = [];
      choicesByScenario[ch.scenario_id].push(ch);
    }

    const scenariosWithChoices = (scenarios || []).map((s: any) => ({
      ...s,
      choices: choicesByScenario[s.id] || [],
    }));

    return noCache(createSuccessResponse({
      simulation: sim,
      scenarios: scenariosWithChoices,
    }) as unknown as NextResponse);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to load simulation';
    return noCache(createErrorResponse(err instanceof Error ? err : new Error(message)) as unknown as NextResponse);
  }
}
