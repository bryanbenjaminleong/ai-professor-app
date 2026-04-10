import { getSupabaseAdmin } from '@/lib/supabase';
import type {
  Simulation,
  Scenario,
  ScenarioChoice,
  SimulationProgress,
  RubricScores,
  ChoiceRecord,
} from './types';
import { RUBRIC_WEIGHTS } from './types';

export async function loadSimulation(simulationId: string): Promise<{
  simulation: Simulation;
  scenarios: Scenario[];
}> {
  const admin = getSupabaseAdmin();

  const { data: sim, error: simError } = await admin
    .from('simulations')
    .select('*')
    .eq('id', simulationId)
    .single();

  if (simError) throw simError;

  const { data: scenarios, error: scenError } = await admin
    .from('scenarios')
    .select('*, choices:scenario_choices(*)')
    .eq('simulation_id', simulationId)
    .order('sequence_order');

  if (scenError) throw scenError;

  return { simulation: sim, scenarios: scenarios as Scenario[] };
}

export async function getUserProgress(
  userId: string,
  simulationId: string
): Promise<SimulationProgress | null> {
  const admin = getSupabaseAdmin();

  const { data } = await admin
    .from('simulation_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('simulation_id', simulationId)
    .single();

  return data as SimulationProgress | null;
}

export async function startSimulation(
  userId: string,
  simulationId: string,
  firstScenarioId: string
): Promise<SimulationProgress> {
  const admin = getSupabaseAdmin();

  const { data, error } = await (admin
    .from('simulation_progress') as any)
    .insert({
      user_id: userId,
      simulation_id: simulationId,
      current_scenario_id: firstScenarioId,
      status: 'in_progress',
      total_score: 0,
      rubric_scores: {},
      choices_made: [],
    })
    .select()
    .single();

  if (error) throw error;
  return data as SimulationProgress;
}

export async function processChoice(
  userId: string,
  simulationId: string,
  scenarioId: string,
  choiceId: string,
  choice: ScenarioChoice
): Promise<SimulationProgress> {
  const admin = getSupabaseAdmin();

  const progress = await getUserProgress(userId, simulationId);
  if (!progress) throw new Error('No progress found');

  const choicesMade: ChoiceRecord[] = Array.isArray(progress.choices_made)
    ? (progress.choices_made as ChoiceRecord[])
    : [];
  choicesMade.push({
    scenario_id: scenarioId,
    choice_id: choiceId,
    timestamp: new Date().toISOString(),
  });

  const newScores = aggregateRubricScores(
    progress.rubric_scores as RubricScores,
    choice.rubric_scores as RubricScores | null
  );

  const update: Record<string, unknown> = {
    current_scenario_id: choice.next_scenario_id || progress.current_scenario_id,
    total_score: (progress.total_score || 0) + (choice.points || 0),
    rubric_scores: newScores,
    choices_made: choicesMade,
  };

  if (!choice.next_scenario_id) {
    update.status = 'completed';
    update.completed_at = new Date().toISOString();
  }

  const { data, error } = await admin
    .from('simulation_progress')
    .update(update as never)
    .eq('id', progress.id)
    .select()
    .single();

  if (error) throw error;
  return data as SimulationProgress;
}

export function aggregateRubricScores(
  existing: RubricScores,
  newScores: RubricScores | null
): RubricScores {
  if (!newScores) return existing;

  const result = { ...existing };
  for (const key of Object.keys(newScores) as (keyof RubricScores)[]) {
    const val = newScores[key];
    if (val !== undefined) {
      (result as Record<string, number | undefined>)[key] =
        ((existing[key] || 0) + val) / 2;
    }
  }
  return result;
}

export function calculateWeightedScore(scores: RubricScores): number {
  let total = 0;
  for (const [key, config] of Object.entries(RUBRIC_WEIGHTS)) {
    const val = scores[key as keyof RubricScores];
    if (val !== undefined) {
      total += val * config.weight;
    }
  }
  return Math.round(total * 100) / 100;
}

export function getScoreGrade(score: number): string {
  if (score >= 4.5) return 'Distinguished';
  if (score >= 4.0) return 'Commendable';
  if (score >= 3.0) return 'Competent';
  if (score >= 2.0) return 'Developing';
  return 'Needs Improvement';
}
