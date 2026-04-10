-- Tier 2: Executive Education Simulation Engine
-- Creates: simulations, scenarios, scenario_choices, simulation_progress, capstone_submissions

-- Simulation modules (linked to existing courses/paths)
CREATE TABLE simulations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id),
  title TEXT NOT NULL,
  description TEXT,
  scenario_type TEXT NOT NULL DEFAULT 'crisis',
  difficulty TEXT DEFAULT 'executive',
  estimated_minutes INT DEFAULT 45,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scenarios within a simulation
CREATE TABLE scenarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  simulation_id UUID REFERENCES simulations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  scenario_text TEXT NOT NULL,
  sequence_order INT NOT NULL DEFAULT 0,
  is_branching BOOLEAN DEFAULT false,
  parent_scenario_id UUID REFERENCES scenarios(id),
  branch_condition TEXT,
  adversary_prompt TEXT,
  adversary_personality TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Choices for each scenario
CREATE TABLE scenario_choices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  choice_text TEXT NOT NULL,
  consequences TEXT,
  outcome_type TEXT DEFAULT 'neutral',
  next_scenario_id UUID REFERENCES scenarios(id),
  points INT DEFAULT 0,
  feedback TEXT,
  rubric_scores JSONB
);

-- User simulation progress
CREATE TABLE simulation_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  simulation_id UUID REFERENCES simulations(id),
  current_scenario_id UUID REFERENCES scenarios(id),
  status TEXT DEFAULT 'in_progress',
  total_score INT DEFAULT 0,
  rubric_scores JSONB DEFAULT '{}',
  choices_made JSONB DEFAULT '[]',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Capstone submissions (for auto-marking)
CREATE TABLE capstone_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  simulation_id UUID REFERENCES simulations(id),
  submission_type TEXT NOT NULL,
  content TEXT NOT NULL,
  ai_feedback TEXT,
  rubric_scores JSONB,
  overall_score INT,
  board_performance_review TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenario_choices ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE capstone_submissions ENABLE ROW LEVEL SECURITY;

-- Public read for content
CREATE POLICY "Public read simulations" ON simulations FOR SELECT USING (true);
CREATE POLICY "Public read scenarios" ON scenarios FOR SELECT USING (true);
CREATE POLICY "Public read choices" ON scenario_choices FOR SELECT USING (true);

-- Users can only see their own progress
CREATE POLICY "Users see own progress" ON simulation_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users see own submissions" ON capstone_submissions FOR ALL USING (auth.uid() = user_id);
