'use client';

import React from 'react';
import type { SimulationProgress } from '@/lib/simulation/types';
import { calculateWeightedScore, getScoreGrade } from '@/lib/simulation/engine';
import { RUBRIC_WEIGHTS } from '@/lib/simulation/types';

interface SimulationResultsProps {
  simulationTitle: string;
  progress: SimulationProgress;
}

export function SimulationResults({ simulationTitle, progress }: SimulationResultsProps) {
  const weighted = calculateWeightedScore(progress.rubric_scores || {});
  const grade = getScoreGrade(weighted);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-amber-400 mb-2">{simulationTitle}</h1>
        <p className="text-gray-500 mb-8">Board Performance Review</p>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center mb-8">
          <div className="text-6xl font-bold text-amber-400 mb-2">{weighted.toFixed(1)}</div>
          <div className="text-lg text-gray-400 mb-1">out of 5.0</div>
          <div className="inline-block bg-amber-500/10 text-amber-400 px-4 py-1 rounded-full text-sm font-semibold">
            {grade}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Detailed Breakdown</h2>
          {Object.entries(RUBRIC_WEIGHTS).map(([key, config]) => {
            const val = progress.rubric_scores?.[key as keyof typeof progress.rubric_scores];
            const pct = val ? (val / 5) * 100 : 0;
            return (
              <div key={key} className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400">{config.label}</span>
                  <span className="text-gray-300">{val?.toFixed(1) ?? '—'} / 5</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full">
                  <div
                    className={`h-full rounded-full transition-all ${
                      pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Total Points</h2>
          <p className="text-3xl font-bold text-white">{progress.total_score}</p>
          <p className="text-sm text-gray-500 mt-1">
            Completed {Array.isArray(progress.choices_made) ? progress.choices_made.length : 0} scenarios
          </p>
        </div>
      </div>
    </div>
  );
}
