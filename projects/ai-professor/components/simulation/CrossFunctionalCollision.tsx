'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CrossFunctionalCollisionProps {
  conflictingRole: string;
  theirDecision: string;
  theirRationale: string;
  impact: string;
}

export function CrossFunctionalCollision({ conflictingRole, theirDecision, theirRationale, impact }: CrossFunctionalCollisionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 rounded-lg border border-purple-500/30 bg-purple-950/20 p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
        <span className="text-sm font-semibold text-purple-400">Cross-Functional Collision</span>
        <span className="text-xs text-gray-600 ml-auto">Conflicting Decision</span>
      </div>
      <div className="bg-gray-900/50 rounded-lg p-4 mb-3">
        <p className="text-xs text-gray-500 mb-1">The {conflictingRole} has made a conflicting decision:</p>
        <p className="text-sm text-purple-300 font-medium mb-2">&ldquo;{theirDecision}&rdquo;</p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-purple-400 hover:text-purple-300 transition"
        >
          {expanded ? 'Hide rationale' : 'View their rationale'}
        </button>
        {expanded && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2">
            <p className="text-sm text-gray-400 italic">{theirRationale}</p>
          </motion.div>
        )}
      </div>
      <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
        <p className="text-xs text-red-400 font-semibold mb-1">Impact on your position:</p>
        <p className="text-sm text-gray-300">{impact}</p>
      </div>
    </motion.div>
  );
}
