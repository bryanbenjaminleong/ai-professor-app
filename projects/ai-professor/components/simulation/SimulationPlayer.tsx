'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Simulation, ScenarioChoice, RubricScores } from '@/lib/simulation/types';
import { ScenarioCard } from './ScenarioCard';
import { ChoiceSelector } from './ChoiceSelector';
import { AdversaryPanel } from './AdversaryPanel';
import { ProgressTracker } from './ProgressTracker';
import { BranchIndicator } from './BranchIndicator';
import { CrossFunctionalCollision } from './CrossFunctionalCollision';

interface SimulationPlayerProps {
  simulationId: string;
  userId: string;
}

interface ChoiceRecord {
  scenarioId: string;
  scenarioTitle: string;
  choiceId: string;
  choiceText: string;
  points: number;
  outcomeType: string;
  rubricScores: RubricScores;
  adversaryScore?: number;
}

interface PeerData {
  hasPeers: boolean;
  totalParticipants?: number;
  avgWeightedScore?: number;
  gradeDistribution?: Record<string, number>;
  peerChoices?: Record<string, { percentOptimal: number; totalResponses: number }>;
  rubricAvgs?: Record<string, number>;
}

type Phase = 'choosing' | 'consequences' | 'adversary_challenge' | 'adversary_respond' | 'adversary_feedback' | 'loading_review' | 'review';

interface ReviewData {
  review: string;
  rubricBreakdown: { key: string; label: string; score: number; weight: number; weightedScore: number }[];
  weightedScore: number;
  grade: { grade: string; tier: string };
  totalPoints: number;
  adversaryTotal: number;
  isAIGenerated: boolean;
}

const RUBRIC_LABELS: Record<string, string> = {
  strategic_thinking: 'Strategic Thinking',
  stakeholder_awareness: 'Stakeholder Awareness',
  decision_quality: 'Decision Quality',
  communication_clarity: 'Communication Clarity',
  asean_context: 'ASEAN Context',
  ethical_judgment: 'Ethical Judgment',
};

export function SimulationPlayer({ simulationId }: SimulationPlayerProps) {
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('choosing');
  const [consequenceData, setConsequenceData] = useState<{ consequences: string; feedback: string; outcome_type: string; points: number } | null>(null);
  const [adversaryResponse, setAdversaryResponse] = useState('');
  const [adversaryResult, setAdversaryResult] = useState<{ score: number; feedback: string } | null>(null);
  const [evaluating, setEvaluating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [choicesMade, setChoicesMade] = useState<ChoiceRecord[]>([]);
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [peerData, setPeerData] = useState<PeerData | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/simulations/${simulationId}`);
        const data = await res.json();
        if (!res.ok || (!data.data && !data.simulation)) { setLoadError('Failed to load simulation.'); return; }
        const sim = data.data?.simulation || data.simulation;
        const scens = data.data?.scenarios || data.scenarios || [];
        if (!scens.length) { setLoadError('No scenarios found.'); return; }
        setSimulation(sim);
        setScenarios(scens);
      } catch { setLoadError('Failed to load simulation.'); } finally { setLoading(false); }
    }
    load();
  }, [simulationId]);

  const handleChoice = useCallback((choiceId: string) => {
    const scenario = scenarios[currentIndex];
    if (!scenario) return;
    const choice = scenario.choices?.find((c: ScenarioChoice) => c.id === choiceId);
    if (!choice) return;

    setConsequenceData({
      consequences: choice.consequences || 'Your decision has been noted.',
      feedback: choice.feedback || '',
      outcome_type: choice.outcome_type || 'neutral',
      points: choice.points || 0,
    });
    setChoicesMade((prev) => [...prev, {
      scenarioId: scenario.id, scenarioTitle: scenario.title,
      choiceId, choiceText: choice.choice_text || choice.choiceText || '',
      points: choice.points || 0, outcomeType: choice.outcome_type || 'neutral',
      rubricScores: choice.rubric_scores || {},
    }]);

    if (scenario.adversary_prompt) {
      setPhase('adversary_challenge');
    } else {
      setPhase('consequences');
    }
  }, [scenarios, currentIndex]);

  const handleAdversaryDone = useCallback(() => { setPhase('adversary_respond'); }, []);

  const handleSubmitResponse = useCallback(async () => {
    if (!adversaryResponse.trim()) return;
    const scenario = scenarios[currentIndex];
    setEvaluating(true);
    try {
      const res = await fetch('/api/simulations/adversary-evaluate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adversaryPersonality: scenario.adversary_personality, adversaryPrompt: scenario.adversary_prompt, userResponse: adversaryResponse }),
      });
      const data = await res.json();
      const result = data.data || { score: 5, feedback: 'Response recorded.' };
      const advScore = result.score || 5;
      setAdversaryResult({ score: advScore, feedback: result.feedback || '' });
      setChoicesMade((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], adversaryScore: advScore };
        return updated;
      });
    } catch { setAdversaryResult({ score: 5, feedback: 'Response noted.' }); }
    finally { setEvaluating(false); setPhase('adversary_feedback'); }
  }, [adversaryResponse, scenarios, currentIndex]);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < scenarios.length) {
      setCurrentIndex(nextIndex);
      setPhase('choosing');
      setConsequenceData(null);
      setAdversaryResponse('');
      setAdversaryResult(null);
    } else {
      generateReview();
    }
  }, [currentIndex, scenarios.length, choicesMade]);

  const generateReview = useCallback(async () => {
    setPhase('loading_review');
    try {
      const [reviewRes, peerRes] = await Promise.all([
        fetch('/api/simulations/board-review', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            simulationTitle: simulation?.title || 'Executive Simulation',
            choices: choicesMade,
            adversaryScores: choicesMade.filter((c) => c.adversaryScore).map((c) => c.adversaryScore!),
          }),
        }),
        fetch(`/api/simulations/peer-compare?simulationId=${simulationId}`),
      ]);
      const reviewJson = await reviewRes.json();
      setReviewData(reviewJson.data || null);
      const peerJson = await peerRes.json();
      setPeerData(peerJson.data || null);

      if (reviewJson.data) {
        const totalPoints = choicesMade.reduce((s, c) => s + c.points, 0);
        const adversaryTotal = choicesMade.reduce((s, c) => s + (c.adversaryScore || 0), 0);
        const avgRubric: Record<string, number> = {};
        const keys = ['strategic_thinking', 'stakeholder_awareness', 'decision_quality', 'communication_clarity', 'asean_context', 'ethical_judgment'];
        for (const key of keys) {
          let sum = 0, count = 0;
          for (const c of choicesMade) {
            const val = (c.rubricScores as Record<string, number>)[key];
            if (val) { sum += val; count++; }
          }
          avgRubric[key] = count > 0 ? sum / count : 0;
        }
        fetch('/api/simulations/peer-compare', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            simulationId, userId: choicesMade[0]?.scenarioId || 'anon',
            choicesMade: choicesMade.map((c) => ({ scenarioId: c.scenarioId, choiceId: c.choiceId, outcomeType: c.outcomeType })),
            rubricScores: avgRubric, totalScore: totalPoints, adversaryTotal,
            weightedScore: reviewJson.data.weightedScore, grade: reviewJson.data.grade?.grade || 'Competent',
          }),
        }).catch(() => {});
      }
    } catch { setReviewData(null); }
    setPhase('review');
  }, [simulation, choicesMade, simulationId]);

  const resetAll = useCallback(() => {
    setCurrentIndex(0); setPhase('choosing'); setConsequenceData(null);
    setAdversaryResponse(''); setAdversaryResult(null);
    setChoicesMade([]); setReviewData(null);
  }, []);

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

  if (phase === 'loading_review') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Generating your Board Performance Review...</p>
          <p className="text-xs text-gray-600 mt-2">The board is evaluating your decisions.</p>
        </div>
      </div>
    );
  }

  if (phase === 'review') {
    const totalPoints = choicesMade.reduce((s, c) => s + c.points, 0);
    const adversaryTotal = choicesMade.reduce((s, c) => s + (c.adversaryScore || 0), 0);
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-4 py-2 rounded-full mb-4">
                <span className="text-sm font-bold uppercase tracking-wide">Board Performance Review</span>
              </div>
              <h2 className="text-2xl font-bold">{simulation.title}</h2>
            </div>

            {reviewData ? (
              <>
                <div className="grid grid-cols-3 gap-4 mb-8">                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
                    <p className="text-xs text-gray-500 mb-1">Overall Score</p>
                    <p className="text-3xl font-bold text-amber-400">{reviewData.weightedScore.toFixed(1)}<span className="text-lg text-gray-600">/5.0</span></p>
                  </div>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
                    <p className="text-xs text-gray-500 mb-1">Rating</p>
                    <p className={`text-xl font-bold ${
                      reviewData.grade.tier === 'distinguished' ? 'text-green-400' :
                      reviewData.grade.tier === 'commendable' ? 'text-blue-400' :
                      reviewData.grade.tier === 'competent' ? 'text-yellow-400' :
                      reviewData.grade.tier === 'developing' ? 'text-orange-400' : 'text-red-400'
                    }`}>{reviewData.grade.grade}</p>
                  </div>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
                    <p className="text-xs text-gray-500 mb-1">Total Points</p>
                    <p className="text-3xl font-bold text-white">{totalPoints + adversaryTotal}</p>
                    <p className="text-xs text-gray-600">Decision: {totalPoints} | Response: {adversaryTotal}</p>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-4">Rubric Breakdown</h3>
                  <div className="space-y-4">
                    {reviewData.rubricBreakdown.map((r) => (
                      <div key={r.key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">{r.label}</span>
                          <span className={`font-semibold ${r.score >= 4 ? 'text-green-400' : r.score >= 2.5 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {r.score.toFixed(1)}/5.0
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-1000 ${r.score >= 4 ? 'bg-green-500' : r.score >= 2.5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${(r.score / 5) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Weight: {Math.round(r.weight * 100)}% — Weighted: {r.weightedScore.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-4">Board Performance Review</h3>
                  {reviewData.isAIGenerated && (
                    <p className="text-xs text-gray-600 mb-3 italic">AI-generated evaluation</p>
                  )}
                  <div className="prose prose-invert prose-sm max-w-none">
                    {reviewData.review.split('\n').map((line, i) => {
                      if (!line.trim()) return <div key={i} className="h-3" />;
                      if (line.toUpperCase() === line.trim() && line.trim().length > 2 && line.trim().length < 40) {
                        return <h4 key={i} className="text-amber-400 font-bold mt-4 mb-1 text-sm uppercase tracking-wide">{line.trim()}</h4>;
                      }
                      if (line.startsWith('- ')) {
                        return <p key={i} className="text-gray-400 text-sm ml-3 leading-relaxed">{line}</p>;
                      }
                      return <p key={i} className="text-gray-300 text-sm leading-relaxed">{line}</p>;
                    })}
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-4">Decision Log</h3>
                  <div className="space-y-3">
                    {choicesMade.map((c, i) => (
                      <div key={i} className="flex items-start gap-3 border-b border-gray-800 pb-3 last:border-0">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-300">{c.scenarioTitle}</p>
                          <p className="text-xs text-gray-500 truncate">{c.choiceText}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            c.outcomeType === 'positive' ? 'bg-green-500/10 text-green-400' :
                            c.outcomeType === 'neutral' ? 'bg-yellow-500/10 text-yellow-400' :
                            'bg-red-500/10 text-red-400'
                          }`}>+{c.points}</span>
                          {c.adversaryScore !== undefined && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">+{c.adversaryScore}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {peerData?.hasPeers && (
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
                    <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-4">Peer Comparison</h3>
                    <p className="text-xs text-gray-500 mb-4">Based on {peerData.totalParticipants} executives who completed this simulation.</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-500 mb-1">Your Score</p>
                        <p className="text-2xl font-bold text-amber-400">{reviewData?.weightedScore.toFixed(1)}/5.0</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-500 mb-1">Cohort Average</p>
                        <p className="text-2xl font-bold text-gray-400">{peerData.avgWeightedScore?.toFixed(1)}/5.0</p>
                      </div>
                    </div>
                    {peerData.gradeDistribution && (
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">Grade Distribution</p>
                        {Object.entries(peerData.gradeDistribution).sort((a, b) => b[1] - a[1]).map(([grade, count]) => {
                          const pct = peerData.totalParticipants ? Math.round((count / peerData.totalParticipants) * 100) : 0;
                          return (
                            <div key={grade} className="flex items-center gap-3">
                              <span className="text-xs text-gray-400 w-36">{grade}</span>
                              <div className="flex-1 bg-gray-800 rounded-full h-3">
                                <div className={`h-3 rounded-full ${grade === 'Distinguished' ? 'bg-green-500' : grade === 'Commendable' ? 'bg-blue-500' : grade === 'Competent' ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
                              </div>
                              <span className="text-xs text-gray-500 w-16 text-right">{count} ({pct}%)</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {peerData.peerChoices && Object.keys(peerData.peerChoices).length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-800">
                        <p className="text-xs text-gray-500 mb-3">How others decided:</p>
                        {choicesMade.map((c, i) => {
                          const peer = peerData.peerChoices?.[c.scenarioId];
                          if (!peer) return null;
                          const wasOptimal = c.outcomeType === 'positive';
                          return (
                            <div key={i} className="flex items-center justify-between text-sm py-1">
                              <span className="text-gray-400">{c.scenarioTitle}</span>
                              <span className="text-gray-500">
                                {peer.percentOptimal}% chose the strong option
                                {!wasOptimal && <span className="text-yellow-400 ml-1">(you didn't)</span>}
                                {wasOptimal && <span className="text-green-400 ml-1">(you did too)</span>}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-center gap-4">
                  <a href="/simulations" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-8 py-3 rounded-lg transition">
                    Back to Simulations
                  </a>
                  <button onClick={resetAll} className="border border-gray-700 hover:border-amber-500/50 text-gray-300 font-semibold px-8 py-3 rounded-lg transition">
                    Play Again
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8 text-center">
                <p className="text-gray-400 mb-2">Total Score: {totalPoints + adversaryTotal}</p>
                <p className="text-gray-600 text-sm">Board review could not be generated.</p>
                <div className="flex justify-center gap-4 mt-6">
                  <a href="/simulations" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-8 py-3 rounded-lg transition">Back to Simulations</a>
                  <button onClick={resetAll} className="border border-gray-700 text-gray-300 font-semibold px-8 py-3 rounded-lg transition">Play Again</button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  const currentScenario = scenarios[currentIndex];
  const totalScore = choicesMade.reduce((s, c) => s + c.points + (c.adversaryScore || 0), 0);
  const getOutcomeLabel = (type: string) => {
    switch (type) {
      case 'positive': return { label: 'Strong Decision', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30' };
      case 'neutral': return { label: 'Acceptable', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' };
      case 'negative': return { label: 'Poor Decision', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' };
      default: return { label: 'Neutral', color: 'text-gray-400', bg: 'bg-gray-800/50 border-gray-600' };
    }
  };

  const showNext = phase === 'consequences' || phase === 'adversary_feedback';
  const isLast = currentIndex === scenarios.length - 1;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-amber-400">{simulation.title}</h1>
            <span className="text-sm text-gray-500">Scenario {currentIndex + 1} of {scenarios.length}</span>
          </div>
          <ProgressTracker progress={null} totalScenarios={scenarios.length} currentIndex={currentIndex} />
          <div className="flex justify-end mt-1"><span className="text-xs text-gray-600">Score: {totalScore}</span></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentScenario.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {currentScenario.parent_scenario_id && currentScenario.branch_condition && (
              <BranchIndicator branchCondition={currentScenario.branch_condition} />
            )}
            <ScenarioCard scenario={currentScenario} />

            {currentScenario.sequence_order === 6 && currentScenario.title.includes('Countermove') && (
              <CrossFunctionalCollision
                conflictingRole="CFO"
                theirDecision="Freeze the cybersecurity budget. Redirect $8M to marketing and sales recovery. Phase security investment over 18 months."
                theirRationale="Revenue is down 22%. Customer acquisition has stalled. We cannot afford to burn $12M on security while the core business is bleeding. A phased approach keeps us compliant while protecting revenue."
                impact="Your CISO threatens to resign, citing the board commitment you made. MAS compliance timeline is now at risk. The board meeting is in 48 hours."
              />
            )}

            {phase === 'choosing' && (
              <ChoiceSelector choices={currentScenario.choices || []} onSelect={handleChoice} disabled={false} />
            )}

            {consequenceData && phase !== 'choosing' && (() => {
              const outcome = getOutcomeLabel(consequenceData.outcome_type);
              return (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <div className={`rounded-lg border p-5 mb-4 ${outcome.bg}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-sm font-bold uppercase tracking-wide ${outcome.color}`}>{outcome.label}</span>
                      <span className="text-xs text-gray-500 ml-auto">+{consequenceData.points} points</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{consequenceData.consequences}</p>
                  </div>
                  {consequenceData.feedback && (
                    <div className="rounded-lg bg-gray-800/50 border border-gray-700 p-4 mb-4">
                      <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-2">Why?</p>
                      <p className="text-sm text-gray-400 leading-relaxed">{consequenceData.feedback}</p>
                    </div>
                  )}
                </motion.div>
              );
            })()}

            {(phase === 'adversary_challenge' || phase === 'adversary_respond' || phase === 'adversary_feedback') && currentScenario.adversary_prompt && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AdversaryPanel personality={currentScenario.adversary_personality || 'Board Member'} prompt={currentScenario.adversary_prompt} onTypingComplete={handleAdversaryDone} />
              </motion.div>
            )}

            {phase === 'adversary_respond' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-5">
                  <p className="text-sm font-semibold text-amber-400 mb-1">Your turn to respond</p>
                  <p className="text-xs text-gray-500 mb-4">Address the challenge. How do you defend your decision?</p>
                  <textarea
                    value={adversaryResponse} onChange={(e) => setAdversaryResponse(e.target.value.slice(0, 500))}
                    placeholder="Type your response..." rows={4}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-gray-300 text-sm placeholder-gray-600 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30 resize-none"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-600">{adversaryResponse.length}/500</span>
                    <button onClick={handleSubmitResponse} disabled={!adversaryResponse.trim() || evaluating}
                      className="bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded-lg transition flex items-center gap-2">
                      {evaluating ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Evaluating...</>) : 'Submit Response'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'adversary_feedback' && adversaryResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <div className={`rounded-lg border p-4 ${adversaryResult.score >= 7 ? 'border-green-500/30 bg-green-500/10' : adversaryResult.score >= 4 ? 'border-yellow-500/30 bg-yellow-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-sm font-bold ${adversaryResult.score >= 7 ? 'text-green-400' : adversaryResult.score >= 4 ? 'text-yellow-400' : 'text-red-400'}`}>
                      Response Score: {adversaryResult.score}/10
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{adversaryResult.feedback}</p>
                </div>
              </motion.div>
            )}

            {showNext && (
              <div className="mt-6 flex justify-center">
                <button onClick={handleNext} className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-8 py-3 rounded-lg transition flex items-center gap-2">
                  {isLast ? 'View Board Review' : 'Next Scenario'}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
