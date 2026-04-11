import { NextRequest } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const simulationId = searchParams.get('simulationId');
    if (!simulationId) return createErrorResponse(new Error('simulationId required'));

    const admin = getSupabaseAdmin();
    const { data: completions, error } = (await admin
      .from('simulation_completions')
      .select('choices_made, rubric_scores, total_score, adversary_total, weighted_score, grade')
      .eq('simulation_id', simulationId)
      .order('completed_at', { ascending: false })
      .limit(200)) as any;

    if (error) throw error;

    if (!completions || completions.length === 0) {
      return createSuccessResponse({ hasPeers: false });
    }

    const total = completions.length;
    const avgScore = completions.reduce((s: number, c: any) => s + Number(c.weighted_score || 0), 0) / total;
    const avgPoints = completions.reduce((s: number, c: any) => s + (c.total_score || 0), 0) / total;

    const gradeDistribution: Record<string, number> = {};
    for (const c of completions) {
      const g = c.grade || 'Competent';
      gradeDistribution[g] = (gradeDistribution[g] || 0) + 1;
    }

    const choiceDistribution: Record<string, { total: number; count: number }> = {};
    for (const c of completions) {
      const choices = Array.isArray(c.choices_made) ? c.choices_made : [];
      for (const ch of choices) {
        if (!choiceDistribution[ch.scenarioId]) {
          choiceDistribution[ch.scenarioId] = { total: 0, count: 0 };
        }
        choiceDistribution[ch.scenarioId].total += 1;
        if (ch.outcomeType === 'positive') {
          choiceDistribution[ch.scenarioId].count += 1;
        }
      }
    }

    const peerChoices: Record<string, { percentOptimal: number; totalResponses: number }> = {};
    for (const [scenarioId, data] of Object.entries(choiceDistribution)) {
      peerChoices[scenarioId] = {
        percentOptimal: Math.round((data.count / data.total) * 100),
        totalResponses: data.total,
      };
    }

    const rubricAvgs: Record<string, number> = {};
    const rubricKeys = ['strategic_thinking', 'stakeholder_awareness', 'decision_quality', 'communication_clarity', 'asean_context', 'ethical_judgment'];
    for (const key of rubricKeys) {
      let sum = 0, count = 0;
      for (const c of completions) {
        const scores = c.rubric_scores || {};
        if (scores[key] !== undefined && scores[key] !== null) {
          sum += Number(scores[key]);
          count++;
        }
      }
      rubricAvgs[key] = count > 0 ? Math.round((sum / count) * 100) / 100 : 0;
    }

    return createSuccessResponse({
      hasPeers: true,
      totalParticipants: total,
      avgWeightedScore: Math.round(avgScore * 100) / 100,
      avgPoints: Math.round(avgPoints),
      gradeDistribution,
      peerChoices,
      rubricAvgs,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed';
    return createErrorResponse(new Error(message));
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { simulationId, userId, choicesMade, rubricScores, totalScore, adversaryTotal, weightedScore, grade } = body;

    if (!simulationId || !userId) return createErrorResponse(new Error('Missing required fields'));

    const admin = getSupabaseAdmin();
    const { error } = await (admin.from('simulation_completions') as any).insert({
      simulation_id: simulationId,
      user_id: userId,
      choices_made: choicesMade || [],
      rubric_scores: rubricScores || {},
      total_score: totalScore || 0,
      adversary_total: adversaryTotal || 0,
      weighted_score: weightedScore || 0,
      grade: grade || 'Competent',
    });

    if (error) throw error;

    return createSuccessResponse({ recorded: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed';
    return createErrorResponse(new Error(message));
  }
}
