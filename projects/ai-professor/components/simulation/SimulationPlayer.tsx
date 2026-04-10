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
        const sim = data.data?.simulation || data.simulation;
        const scens = data.data?.scenarios || data.scenarios || [];
        setSimulation(sim);
        setScenarios(scens);

        const progRes = await fetch(`/api/simulations/${simulationId}/progress`, {
          headers: { 'x-user-email': userId },
        });
        const progData = await progRes.json();
        const prog = progData.data?.progress || progData.progress;

        if (prog) {
          setProgress(prog);
          const current = scens.find(
            (s: Scenario) => s.id === prog.current_scenario_id
          );
          setCurrentScenario(current || scens[0]);
        } else {
          const startRes = await fetch(`/api/simulations/${simulationId}/progress`, {
            method: 'POST',
            headers: { 'x-user-email': userId, 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstScenarioId: scens[0]?.id }),
          });
          const startData = await startRes.json();
          const started = startData.data?.progress || startData.progress;
          setProgress(started);
          setCurrentScenario(scens[0]);
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
      if (!currentScenario || selectedChoice) return;

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
      } catch (err) {
        console.error('Failed to process choice:', err);
      }
    },
    [currentScenario, selectedChoice, simulationId, userId]
  );

  const handleNext = useCallback(() => {
    if (!progress || !scenarios.length) return;

    const nextScenario = scenarios.find(
      (s) => s.id === progress.current_scenario_id
    );
    if (nextScenario) {
      setCurrentScenario(nextScenario);
    }
    setSelectedChoice(null);
    setShowConsequences(false);
    setShowAdversary(false);
    setConsequenceData(null);
  }, [progress, scenarios]);

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

  const getOutcomeLabel = (type: string) => {
    switch (type) {
      case 'positive': return { label: 'Strong Decision', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30' };
      case 'neutral': return { label: 'Acceptable — Could Be Stronger', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' };
      case 'negative': return { label: 'Poor Decision', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' };
      default: return { label: 'Neutral', color: 'text-gray-400', bg: 'bg-gray-800/50 border-gray-600' };
    }
  };

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

              {showConsequences && consequenceData && (() => {
                const outcome = getOutcomeLabel(consequenceData.outcome_type);
                const hasNext = progress?.status !== 'completed' && progress?.current_scenario_id && progress.current_scenario_id !== currentScenario.id;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <div className={`rounded-lg border p-5 mb-4 ${outcome.bg}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-sm font-bold uppercase tracking-wide ${outcome.color}`}>
                          {outcome.label}
                        </span>
                        <span className="text-xs text-gray-500 ml-auto">
                          +{consequenceData.points} points
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{consequenceData.consequences}</p>
                    </div>

                    {consequenceData.feedback && (
                      <div className="rounded-lg bg-gray-800/50 border border-gray-700 p-4 mb-4">
                        <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-2">Why?</p>
                        <p className="text-sm text-gray-400 leading-relaxed">{consequenceData.feedback}</p>
                      </div>
                    )}

                    {showAdversary && currentScenario.adversary_prompt && (
                      <div className="mt-4">
                        <AdversaryPanel
                          personality={currentScenario.adversary_personality || 'Board Member'}
                          prompt={currentScenario.adversary_prompt}
                        />
                      </div>
                    )}

                    <div className="mt-6 flex justify-center">
                      {progress?.status === 'completed' ? (
                        <a
                          href={`/simulations/${simulationId}/results`}
                          className="inline-block bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-8 py-3 rounded-lg transition"
                        >
                          View Results
                        </a>
                      ) : hasNext ? (
                        <button
                          onClick={handleNext}
                          className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-8 py-3 rounded-lg transition flex items-center gap-2"
                        >
                          Next Scenario
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      ) : (
                        <a
                          href={`/simulations/${simulationId}/results`}
                          className="inline-block bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-8 py-3 rounded-lg transition"
                        >
                          View Results
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
