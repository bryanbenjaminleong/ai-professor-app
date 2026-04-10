'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { ScenarioChoice } from '@/lib/simulation/types';

interface ChoiceSelectorProps {
  choices: ScenarioChoice[];
  onSelect: (choiceId: string) => void;
  disabled: boolean;
}

export function ChoiceSelector({ choices, onSelect, disabled }: ChoiceSelectorProps) {
  return (
    <div className="space-y-3 mt-6">
      <p className="text-sm font-medium text-gray-400 mb-3">What do you do?</p>
      {choices.map((choice, idx) => (
        <motion.button
          key={choice.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          onClick={() => onSelect(choice.id)}
          disabled={disabled}
          className="w-full text-left p-4 rounded-lg border border-gray-700 bg-gray-900 hover:bg-gray-800 hover:border-amber-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-800 group-hover:bg-amber-500/20 text-gray-400 group-hover:text-amber-400 flex items-center justify-center text-sm font-bold transition">
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="text-gray-300 group-hover:text-white transition">{choice.choice_text}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
