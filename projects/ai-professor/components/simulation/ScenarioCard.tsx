'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Scenario } from '@/lib/simulation/types';

interface ScenarioCardProps {
  scenario: Scenario;
}

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 mb-6"
    >
      <h2 className="text-lg font-semibold text-amber-400 mb-4">{scenario.title}</h2>
      <div
        className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: scenario.scenario_text }}
      />
    </motion.div>
  );
}
