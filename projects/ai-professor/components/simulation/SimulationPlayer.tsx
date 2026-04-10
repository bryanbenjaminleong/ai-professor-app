'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Simulation, Scenario, SimulationProgress } from '@/lib/simulation/types';
import { ScenarioCard } from './ScenarioCard';
import { ChoiceSelector } from './ChoiceSelector';
import { AdversaryPanel } from './AdversaryPanel';
import { ProgressTracker } from './ProgressTracker';
import { BranchIndicator } from './BranchIndicator';
import { CapstoneSubmit } from './CapstoneSubmit';

interface SimulationPlayerProps {
  simulationId: string;
  userId: string;
}

export function SimulationPlayer({ simulationId, userId }: SimulationPlayerProps) {
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [progress, setProgress] = useState<SimulationProgress | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showConsequences, setShowConsequences] = useState(false);
  const [consequenceData, setConsequenceData] = useState<{
    consequences: string;
    feedback: string;
    outcome_type: string;
    points: number;
  } | null>(null);
  const [showAdversary, setShowAdversary] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/simulations/${simulationId}`);
        const data = await res.json();
        setSimulation(data.data?.simulation || data.simulation);
        setScenarios(data.data?.scenarios || data.scenarios);

        const progRes = await fetch(`/api/simulations/${simulationId}/progress`, {
          headers: { 'x-user-email': userId },
        });
        const progData = await progRes.json();
        const prog = progData.data?.progress || progData.progress;

        if (prog) {
          setProgress(prog);
          const current = (data.data?.scenarios || data.scenarios).find(
            (s: Scenario) => s.id === prog.current_scenario_id
          );
          setCurrentScenario(current || (data.data?.scenarios || data.scenarios)[0]);
        } else {
          const startRes = await fetch(`/api/simulations/${simulationId}/progress`, {
            method: 'POST',
            headers: { 'x-user-email': userId, 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstScenarioId: (data.data?.scenarios || data.scenarios)[0]?.id }),
          });
          const startData = await startRes.json();
          const started = startData.data?.progress || startData.progress;
          setProgress(started);
          setCurrentScenario((data.data?.scenarios || data.scenarios)[0]);
        }
      } catch (err) {
        console.error('Failed to load simulation:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [simulationId, userId]);

  const handleChoice = useCallback(
    async (choiceId: string) => {
      if (!currentScenario || !progress) return;

      setSelectedChoice(choiceId);
      setShowConsequences(false);

      try {
        const res = await fetch(`/api/simulations/${simulationId}/choice`, {
          method: 'POST',
          headers: { 'x-user-email': userId, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            scenarioId: currentScenario.id,
            choiceId,
          }),
        });
        const data = await res.json();
        const result = data.data || data;

        setConsequenceData(result.choice);
        setShowConsequences(true);
        setProgress(result.progress);

        if (currentScenario.adversary_prompt) {
          setShowAdversary(true);
        }

        if (result.choice?.consequences && result.progress?.status !== 'completed') {
          const nextScenario = scenarios.find(
            (s) => s.id === result.progress.current_scenario_id
          );
          if (nextScenario) {
            setTimeout(() => {
              setCurrentScenario(nextScenario);
              setSelectedChoice(null);
              setShowConsequences(false);
              setShowAdversary(false);
              setConsequenceData(null);
            }, 4000);
          }
        }
      } catch (err) {
        console.error('Failed to process choice:', err);
      }
    },
    [currentScenario, progress, simulationId, userId, scenarios]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading simulation...</p>
        </div>
      </div>
    );
  }

  if (!simulation || !currentScenario) return null;

  const isCompleted = progress?.status === 'completed';
  const scenarioIndex = scenarios.findIndex((s) => s.id === currentScenario.id);
  const isCapstone = simulation.scenario_type === 'capstone';

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-amber-400">{simulation.title}</h1>
            <span className="text-sm text-gray-500">
              Scenario {scenarioIndex + 1} of {scenarios.length}
            </span>
          </div>
          <ProgressTracker progress={progress} totalScenarios={scenarios.length} currentIndex={scenarioIndex} />
        </div>

        <AnimatePresence mode="wait">
          {isCompleted && !isCapstone ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <h2 className="text-3xl font-bold mb-4">Simulation Complete</h2>
              <p className="text-gray-400 mb-8">Your Board Performance Review is being generated.</p>
              <a
                href={`/simulations/${simulationId}/results`}
                className="inline-block bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-8 py-3 rounded-lg transition"
              >
                View Results
              </a>
            </motion.div>
          ) : isCompleted && isCapstone ? (
            <motion.div key="capstone" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <CapstoneSubmit
                simulationId={simulationId}
                userId={userId}
                submissionType="executive_brief"
              />
            </motion.div>
          ) : (
            <motion.div
              key={currentScenario.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentScenario.parent_scenario_id && currentScenario.branch_condition && (
                <BranchIndicator branchCondition={currentScenario.branch_condition} />
              )}

              <ScenarioCard scenario={currentScenario} />

              {!showConsequences && (
                <ChoiceSelector
                  choices={currentScenario.choices || []}
                  onSelect={handleChoice}
                  disabled={!!selectedChoice}
                />
              )}

              {showConsequences && consequenceData && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <div
                    className={`rounded-lg border p-4 mb-4 ${
                      consequenceData.outcome_type === 'positive'
                        ? 'border-green-500/30 bg-green-500/10'
                        : consequenceData.outcome_type === 'negative'
                        ? 'border-red-500/30 bg-red-500/10'
                        : 'border-gray-600 bg-gray-800/50'
                    }`}
                  >
                    <p className="text-sm text-gray-300">{consequenceData.consequences}</p>
                  </div>
                  {consequenceData.feedback && (
                    <p className="text-sm text-gray-500 italic">{consequenceData.feedback}</p>
                  )}
                  <p className="text-xs text-gray-600 mt-2">+{consequenceData.points} points</p>
                </motion.div>
              )}

              {showAdversary && currentScenario.adversary_prompt && (
                <AdversaryPanel
                  personality={currentScenario.adversary_personality || 'Board Member'}
                  prompt={currentScenario.adversary_prompt}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
