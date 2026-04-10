'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AdversaryPanelProps {
  personality: string;
  prompt: string;
}

export function AdversaryPanel({ personality, prompt }: AdversaryPanelProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const adversaryText = generateAdversaryText(personality, prompt);

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (i < adversaryText.length) {
        setDisplayedText(adversaryText.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [adversaryText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 rounded-lg border border-red-900/50 bg-red-950/20 p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-sm font-semibold text-red-400">{personality} — AI Adversary</span>
      </div>
      <p className="text-sm text-red-300/80 italic">
        &ldquo;{displayedText}&rdquo;
        {isTyping && <span className="animate-pulse">|</span>}
      </p>
    </motion.div>
  );
}

function generateAdversaryText(personality: string, _prompt: string): string {
  const responses: Record<string, string[]> = {
    'hostile board member': [
      "That's a convenient answer, but it doesn't address the core issue. Your shareholders are watching.",
      "I've seen this approach fail before. What makes you think this time is different?",
      "Are you making this decision based on data, or are you just buying time?",
    ],
    regulator: [
      "I hope you understand the regulatory implications of what you're proposing.",
      "MAS will need full disclosure within 24 hours. Can you guarantee that?",
      "This approach may not meet our compliance standards. Walk me through your reasoning.",
    ],
    default: [
      "Interesting choice. But let me push back — what's your contingency if this fails?",
      "You're assuming best-case scenario. What happens when things go wrong?",
      "The board isn't going to like this. How do you justify the risk?",
    ],
  };

  const pool = responses[personality.toLowerCase()] || responses['default'];
  return pool[Math.floor(Math.random() * pool.length)];
}
