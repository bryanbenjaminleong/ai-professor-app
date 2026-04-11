'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Simulation, Scenario, ScenarioChoice } from '@/lib/simulation/types';
import { ScenarioCard } from './ScenarioCard';
import { ChoiceSelector } from './ChoiceSelector';
import { AdversaryPanel } from './AdversaryPanel';
import { ProgressTracker } from './ProgressTracker';
import { BranchIndicator } from './BranchIndicator';

interface SimulationPlayerProps {
  simulationId: string;
  userId: string;
}

interface LocalChoice {
  scenarioId: string;
  choiceId: string;
  points: number;
}

export function SimulationPlayer({ simulationId, userId }: SimulationPlayerProps) {
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
  const [loadError, setLoadError] = useState<string | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [choicesMade, setChoicesMade] = useState<LocalChoice[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/simulations/${simulationId}`);
        const data = await res.json();

        if (!res.ok || (!data.data && !data.simulation)) {
          setLoadError('Failed to load simulation data.');
          return;
        }

        const sim = data.data?.simulation || data.simulation;
        const scens = data.data?.scenarios || data.scenarios || [];

        if (!scens.length) {
          setLoadError('This simulation has no scenarios yet.');
          return;
        }

        setSimulation(sim);
        setScenarios(scens);
      } catch (err) {
        setLoadError('Failed to load simulation. Please try again.');
        console.error('Failed to load simulation:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [simulationId]);

  const handleChoice = useCallback(
    (choiceId: string) => {
      const scenario = scenarios[currentIndex];
      if (!scenario || selectedChoice) return;

      const choice = scenario.choices?.find((c: ScenarioChoice) => c.id === choiceId);
      if (!choice) return;

      setSelectedChoice(choiceId);

      setConsequenceData({
        consequences: choice.consequences || 'Your decision has been noted.',
        feedback: choice.feedback || '',
        outcome_type: choice.outcome_type || 'neutral',
        points: choice.points || 0,
      });

      setTotalScore((prev) => prev + (choice.points || 0));
      setChoicesMade((prev) => [...prev, {
        scenarioId: scenario.id,
        choiceId,
        points: choice.points || 0,
      }]);

      setShowConsequences(true);

      if (scenario.adversary_prompt) {
        setShowAdversary(true);
      }
    },
    [scenarios, currentIndex, selectedChoice]
  );

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < scenarios.length) {
      setCurrentIndex(nextIndex);
    } else {
      setIsFinished(true);
    }
    setSelectedChoice(null);
    setShowConsequences(false);
    setShowAdversary(false);
    setConsequenceData(null);
  }, [currentIndex, scenarios.length]);

  const getOutcomeLabel = (type: string) => {
    switch (type) {
      case 'positive': return { label: 'Strong Decision', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30' };
      case 'neutral': return { label: 'Acceptable — Could Be Stronger', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' };
      case 'negative': return { label: 'Poor Decision', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' };
      default: return { label: 'Neutral', color: 'text-gray-400', bg: 'bg-gray-800/50 border-gray-600' };
    }
  };

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

  if (loadError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-400 mb-4">{loadError}</p>
          <a href="/simulations" className="text-amber-400 hover:underline">Back to Simulations</a>
        </div>
      </div>
    );
  }

  if (!simulation || !scenarios.length) return null;

  const currentScenario = scenarios[currentIndex];
  const isCapstone = simulation.scenario_type === 'capstone';

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-bold uppercase tracking-wide">Simulation Complete</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">{simulation.title}</h2>
            <p className="text-gray-400 mb-8">You completed all {scenarios.length} scenarios.</p>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md mx-auto mb-8">
              <p className="text-gray-500 text-sm mb-1">Total Score</p>
              <p className="text-5xl font-bold text-amber-400 mb-4">{totalScore}</p>
              <div className="space-y-2 text-left">
                {choicesMade.map((c, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-400">Scenario {i + 1}</span>
                    <span className={c.points >= 10 ? 'text-green-400' : c.points >= 5 ? 'text-yellow-400' : 'text-red-400'}>
                      +{c.points}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <a
                href="/simulations"
                className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-8 py-3 rounded-lg transition"
              >
                Back to Simulations
              </a>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setSelectedChoice(null);
                  setShowConsequences(false);
                  setShowAdversary(false);
                  setConsequenceData(null);
                  setTotalScore(0);
                  setChoicesMade([]);
                  setIsFinished(false);
                }}
                className="border border-gray-700 hover:border-amber-500/50 text-gray-300 font-semibold px-8 py-3 rounded-lg transition"
              >
                Play Again
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-amber-400">{simulation.title}</h1>
            <span className="text-sm text-gray-500">
              Scenario {currentIndex + 1} of {scenarios.length}
            </span>
          </div>
          <ProgressTracker
            progress={null}
            totalScenarios={scenarios.length}
            currentIndex={currentIndex}
          />
          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-600">Score: {totalScore}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
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
              const isLastScenario = currentIndex === scenarios.length - 1;
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
                    <button
                      onClick={handleNext}
                      className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-8 py-3 rounded-lg transition flex items-center gap-2"
                    >
                      {isLastScenario ? 'View Results' : 'Next Scenario'}
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
