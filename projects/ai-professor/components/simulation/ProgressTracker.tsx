'use client';

import React from 'react';
import type { SimulationProgress } from '@/lib/simulation/types';
import { calculateWeightedScore, getScoreGrade } from '@/lib/simulation/engine';
import { RUBRIC_WEIGHTS } from '@/lib/simulation/types';

interface ProgressTrackerProps {
  progress: SimulationProgress | null;
  totalScenarios: number;
  currentIndex: number;
}

export function ProgressTracker({ progress, totalScenarios, currentIndex }: ProgressTrackerProps) {
  const pct = totalScenarios > 0 ? Math.round(((currentIndex + 1) / totalScenarios) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Progress</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {progress && progress.status === 'completed' && (
        <div className="mt-3 p-3 bg-gray-900 rounded-lg border border-gray-800">
          <div className="text-sm font-semibold text-amber-400 mb-2">Score Breakdown</div>
          {Object.entries(RUBRIC_WEIGHTS).map(([key, config]) => {
            const val = progress.rubric_scores?.[key as keyof typeof progress.rubric_scores];
            return (
              <div key={key} className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>{config.label}</span>
                <span>{val !== undefined ? `${val.toFixed(1)}/5` : '—'}</span>
              </div>
            );
          })}
          <div className="mt-2 pt-2 border-t border-gray-800 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Overall</span>
            <span className="text-sm font-bold text-amber-400">
              {calculateWeightedScore(progress.rubric_scores || {}).toFixed(2)}/5 — {getScoreGrade(calculateWeightedScore(progress.rubric_scores || {}))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
