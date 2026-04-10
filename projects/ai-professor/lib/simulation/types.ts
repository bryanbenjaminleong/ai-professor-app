export interface Simulation {
  id: string;
  course_id: string | null;
  title: string;
  description: string | null;
  scenario_type: 'crisis' | 'strategic' | 'capstone';
  difficulty: string;
  estimated_minutes: number;
  created_at: string;
}

export interface Scenario {
  id: string;
  simulation_id: string;
  title: string;
  scenario_text: string;
  sequence_order: number;
  is_branching: boolean;
  parent_scenario_id: string | null;
  branch_condition: string | null;
  adversary_prompt: string | null;
  adversary_personality: string | null;
  choices?: ScenarioChoice[];
}

export interface ScenarioChoice {
  id: string;
  scenario_id: string;
  choice_text: string;
  consequences: string | null;
  outcome_type: 'positive' | 'negative' | 'neutral' | 'branching';
  next_scenario_id: string | null;
  points: number;
  feedback: string | null;
  rubric_scores: RubricScores | null;
}

export interface SimulationProgress {
  id: string;
  user_id: string;
  simulation_id: string;
  current_scenario_id: string | null;
  status: 'in_progress' | 'completed' | 'abandoned';
  total_score: number;
  rubric_scores: RubricScores;
  choices_made: ChoiceRecord[];
  started_at: string;
  completed_at: string | null;
}

export interface ChoiceRecord {
  scenario_id: string;
  choice_id: string;
  timestamp: string;
}

export interface CapstoneSubmission {
  id: string;
  user_id: string;
  simulation_id: string;
  submission_type: 'executive_brief' | 'board_presentation' | 'decision_memo';
  content: string;
  ai_feedback: string | null;
  rubric_scores: RubricScores | null;
  overall_score: number | null;
  board_performance_review: string | null;
  submitted_at: string;
  reviewed_at: string | null;
}

export interface RubricScores {
  strategic_thinking?: number;
  stakeholder_awareness?: number;
  decision_quality?: number;
  communication_clarity?: number;
  asean_context?: number;
  ethical_judgment?: number;
}

export const RUBRIC_WEIGHTS: Record<keyof RubricScores, { weight: number; label: string }> = {
  strategic_thinking: { weight: 0.25, label: 'Strategic Thinking' },
  stakeholder_awareness: { weight: 0.20, label: 'Stakeholder Awareness' },
  decision_quality: { weight: 0.20, label: 'Decision Quality' },
  communication_clarity: { weight: 0.15, label: 'Communication Clarity' },
  asean_context: { weight: 0.10, label: 'ASEAN Context Application' },
  ethical_judgment: { weight: 0.10, label: 'Ethical Judgment' },
};
