'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BranchIndicatorProps {
  branchCondition: string;
  previousChoiceText?: string;
}

export function BranchIndicator({ branchCondition, previousChoiceText }: BranchIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mb-6 rounded-lg border border-amber-700/30 bg-amber-950/20 p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <svg
          className="w-4 h-4 text-amber-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <span className="text-sm font-semibold text-amber-400">Branching Point</span>
      </div>
      {previousChoiceText && (
        <p className="text-xs text-gray-400 mb-1">
          Your choice: &ldquo;{previousChoiceText}&rdquo;
        </p>
      )}
      <p className="text-sm text-amber-300/70">
        {branchCondition}
      </p>
    </motion.div>
  );
}
