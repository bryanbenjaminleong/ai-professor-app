import { NextRequest } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/lib/auth';

const SYSTEM_PROMPT = `You are an executive simulation evaluator. A C-level executive is responding to a challenge from a board member or regulator during a crisis simulation.

Evaluate their response on a scale of 1-10 and provide brief, sharp feedback.

Rules:
- Be concise. Max 2 sentences of feedback.
- Score based on: strategic clarity, stakeholder awareness, decisiveness, and professional tone
- A good response shows leadership, takes accountability, and proposes concrete action
- A poor response is vague, defensive, or shifts blame

You MUST respond with valid JSON only, no markdown:
{"score": <number 1-10>, "feedback": "<your feedback>"}`;

const KEYWORD_SCORES: { keywords: string[]; points: number; feedback: string }[] = [
  {
    keywords: ['transparent', 'accountability', 'take responsibility', 'accept', 'acknowledge', 'own', 'proactive', 'immediate action', 'concrete'],
    points: 8,
    feedback: 'Strong response — you showed accountability and proposed clear action.',
  },
  {
    keywords: ['investigate', 'review', 'assess', 'plan', 'strategic', 'comprehensive', 'framework', 'protocol'],
    points: 7,
    feedback: 'Good strategic thinking. Your response could be more decisive.',
  },
  {
    keywords: ['team', 'collaborate', 'together', 'stakeholder', 'board', 'communicate', 'inform'],
    points: 6,
    feedback: 'Decent stakeholder awareness, but the response lacks specificity.',
  },
  {
    keywords: ['regret', 'sorry', 'apologize', 'mistake', 'learn', 'improve'],
    points: 5,
    feedback: 'Accountability is noted, but executives are expected to lead with solutions, not apologies.',
  },
  {
    keywords: ['not my fault', 'blame', 'they', 'department', 'vendor', 'third party', 'out of my control'],
    points: 2,
    feedback: 'Deflecting blame is a weak response. The board holds you accountable regardless of root cause.',
  },
  {
    keywords: ['confident', 'certain', 'guarantee', 'commit', 'promise', 'will ensure'],
    points: 6,
    feedback: 'Confidence is noted, but the board wants specifics, not guarantees.',
  },
];

function keywordFallback(response: string): { score: number; feedback: string } {
  const lower = response.toLowerCase();
  let bestScore = 4;
  let bestFeedback = 'Your response lacks specificity. Try addressing the challenge directly with concrete actions.';

  for (const entry of KEYWORD_SCORES) {
    const matchCount = entry.keywords.filter((k) => lower.includes(k)).length;
    if (matchCount > 0 && entry.points > bestScore) {
      bestScore = entry.points;
      bestFeedback = entry.feedback;
    }
  }

  if (response.length < 20) {
    bestScore = Math.min(bestScore, 2);
    bestFeedback = 'Your response is too brief. The board expects a substantive answer.';
  }

  return { score: bestScore, feedback: bestFeedback };
}

export async function POST(req: NextRequest) {
  try {
    const { adversaryPersonality, adversaryPrompt, userResponse } = await req.json();

    if (!userResponse || !userResponse.trim()) {
      return createErrorResponse(new Error('Please provide a response.'));
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'dummy-key-for-build') {
      return createSuccessResponse(keywordFallback(userResponse));
    }

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            {
              role: 'user',
              content: `Context: A ${adversaryPersonality || 'board member'} challenged the executive with: "${adversaryPrompt}"

The executive responded: "${userResponse}"

Evaluate this response.`,
            },
          ],
          temperature: 0.3,
          max_tokens: 150,
          response_format: { type: 'json_object' },
        }),
      });

      if (!res.ok) {
        return createSuccessResponse(keywordFallback(userResponse));
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        return createSuccessResponse(keywordFallback(userResponse));
      }

      const parsed = JSON.parse(content);
      const score = Math.max(1, Math.min(10, Math.round(parsed.score || 5)));
      const feedback = parsed.feedback || keywordFallback(userResponse).feedback;

      return createSuccessResponse({ score, feedback });
    } catch {
      return createSuccessResponse(keywordFallback(userResponse));
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Evaluation failed';
    return createErrorResponse(new Error(message));
  }
}
