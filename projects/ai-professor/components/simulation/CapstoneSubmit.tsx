'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

interface CapstoneSubmitProps {
  simulationId: string;
  userId: string;
  submissionType: 'executive_brief' | 'board_presentation' | 'decision_memo';
  onSubmitComplete?: (submission: unknown) => void;
}

export function CapstoneSubmit({ simulationId, userId, submissionType, onSubmitComplete }: CapstoneSubmitProps) {
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const typeLabels: Record<string, string> = {
    executive_brief: 'Executive Brief',
    board_presentation: 'Board Presentation',
    decision_memo: 'Decision Memo',
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/simulations/${simulationId}/capstone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-email': userId },
        body: JSON.stringify({ submissionType, content }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        onSubmitComplete?.(data.data?.submission);
      }
    } catch (err) {
      console.error('Capstone submission failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-950/30 border border-green-800/50 rounded-xl p-6 text-center"
      >
        <p className="text-green-400 font-semibold mb-2">Capstone Submitted</p>
        <p className="text-sm text-gray-400">
          Your {typeLabels[submissionType]} has been submitted for AI review. Your Board Performance Review will be available shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-amber-400 mb-2">
        {typeLabels[submissionType]}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Submit your {typeLabels[submissionType].toLowerCase()} for AI-powered review and scoring.
      </p>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`Write your ${typeLabels[submissionType].toLowerCase()} here...`}
        className="w-full h-48 bg-gray-800 border border-gray-700 rounded-lg p-4 text-gray-300 text-sm resize-none focus:outline-none focus:border-amber-500/50 transition"
      />
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-600">{content.length} characters</span>
        <Button
          onClick={handleSubmit}
          disabled={submitting || !content.trim()}
          isLoading={submitting}
        >
          Submit for Review
        </Button>
      </div>
    </div>
  );
}
