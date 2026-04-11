'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AdversaryPanelProps {
  personality: string;
  prompt: string;
  onTypingComplete?: () => void;
}

export function AdversaryPanel({ personality, prompt, onTypingComplete }: AdversaryPanelProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const callbackRef = useRef(onTypingComplete);
  callbackRef.current = onTypingComplete;

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    setIsTyping(true);

    if (!prompt) {
      setIsTyping(false);
      return;
    }

    const interval = setInterval(() => {
      if (i < prompt.length) {
        i++;
        setDisplayedText(prompt.slice(0, i));
      } else {
        setIsTyping(false);
        clearInterval(interval);
        callbackRef.current?.();
      }
    }, 20);

    return () => clearInterval(interval);
  }, [prompt]);

  if (!prompt) return null;

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
