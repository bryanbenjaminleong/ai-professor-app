import { NextRequest } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/lib/auth';

interface RubricScores {
  strategic_thinking?: number;
  stakeholder_awareness?: number;
  decision_quality?: number;
  communication_clarity?: number;
  asean_context?: number;
  ethical_judgment?: number;
}

interface ChoiceSummary {
  scenarioTitle: string;
  choiceText: string;
  outcomeType: string;
  points: number;
  rubricScores: RubricScores;
}

const RUBRIC_LABELS: Record<string, string> = {
  strategic_thinking: 'Strategic Thinking',
  stakeholder_awareness: 'Stakeholder Awareness',
  decision_quality: 'Decision Quality',
  communication_clarity: 'Communication Clarity',
  asean_context: 'ASEAN Context Application',
  ethical_judgment: 'Ethical Judgment',
};

const RUBRIC_WEIGHTS: Record<string, number> = {
  strategic_thinking: 0.25,
  stakeholder_awareness: 0.20,
  decision_quality: 0.20,
  communication_clarity: 0.15,
  asean_context: 0.10,
  ethical_judgment: 0.10,
};

function aggregateScores(choices: ChoiceSummary[]): RubricScores {
  const totals: Record<string, { sum: number; count: number }> = {};
  for (const key of Object.keys(RUBRIC_LABELS)) {
    totals[key] = { sum: 0, count: 0 };
  }

  for (const choice of choices) {
    for (const [key, val] of Object.entries(choice.rubricScores || {})) {
      if (val !== undefined && totals[key]) {
        totals[key].sum += val;
        totals[key].count += 1;
      }
    }
  }

  const result: Record<string, number> = {};
  for (const [key, { sum, count }] of Object.entries(totals)) {
    result[key] = count > 0 ? Math.round((sum / count) * 100) / 100 : 0;
  }
  return result as unknown as RubricScores;
}

function calculateWeighted(avgScores: RubricScores): number {
  let total = 0;
  for (const [key, weight] of Object.entries(RUBRIC_WEIGHTS)) {
    const val = (avgScores as Record<string, number>)[key] || 0;
    total += val * weight;
  }
  return Math.round(total * 100) / 100;
}

function getGrade(score: number): { grade: string; tier: string } {
  if (score >= 4.5) return { grade: 'Distinguished', tier: 'distinguished' };
  if (score >= 3.5) return { grade: 'Commendable', tier: 'commendable' };
  if (score >= 2.5) return { grade: 'Competent', tier: 'competent' };
  if (score >= 1.5) return { grade: 'Developing', tier: 'developing' };
  return { grade: 'Needs Improvement', tier: 'needs-improvement' };
}

function templateReview(
  simulationTitle: string,
  grade: { grade: string; tier: string },
  avgScores: RubricScores,
  choices: ChoiceSummary[]
): string {
  const scores = avgScores as Record<string, number>;
  const sorted = Object.entries(RUBRIC_LABELS)
    .map(([key, label]) => ({ key, label, score: scores[key] || 0 }))
    .sort((a, b) => b.score - a.score);

  const strengths = sorted.filter((s) => s.score >= 4);
  const weaknesses = sorted.filter((s) => s.score <= 2);

  const positiveCount = choices.filter((c) => c.outcomeType === 'positive').length;
  const negativeCount = choices.filter((c) => c.outcomeType === 'negative').length;

  let review = `BOARD PERFORMANCE REVIEW\nSimulation: ${simulationTitle}\nOverall Rating: ${grade.grade}\n\n`;

  review += `SUMMARY\n`;
  review += `The executive completed ${choices.length} scenarios in the ${simulationTitle} simulation. `;
  review += `Of ${choices.length} decisions, ${positiveCount} demonstrated strong executive judgment`;
  if (negativeCount > 0) review += `, while ${negativeCount} revealed areas requiring development`;
  review += `. The overall weighted score was ${calculateWeighted(avgScores).toFixed(2)} out of 5.0, placing the executive in the "${grade.grade}" tier.\n\n`;

  review += `STRENGTHS\n`;
  if (strengths.length > 0) {
    for (const s of strengths.slice(0, 3)) {
      review += `- ${s.label} (${s.score.toFixed(1)}/5.0): `;
      review += getStrengthComment(s.key, s.score);
      review += '\n';
    }
  } else {
    review += `- The executive showed engagement with all scenarios and completed the simulation in its entirety.\n`;
  }
  review += '\n';

  review += `DEVELOPMENT AREAS\n`;
  if (weaknesses.length > 0) {
    for (const w of weaknesses.slice(0, 3)) {
      review += `- ${w.label} (${w.score.toFixed(1)}/5.0): `;
      review += getWeaknessComment(w.key, w.score);
      review += '\n';
    }
  } else {
    review += `- Consider refining ${sorted[sorted.length - 1]?.label || 'general strategy'} to achieve distinguished-level performance.\n`;
  }
  review += '\n';

  const redFlags = choices.filter((c) => c.outcomeType === 'negative');
  if (redFlags.length > 0) {
    review += `RED FLAGS\n`;
    for (const rf of redFlags) {
      review += `- In "${rf.scenarioTitle}", the executive chose a course of action rated as poor. This decision posed significant risk to stakeholder trust and organizational reputation.\n`;
    }
    review += '\n';
  }

  review += `RECOMMENDATION\n`;
  if (grade.tier === 'distinguished') {
    review += `This executive demonstrates the strategic acumen and composure expected of a seasoned C-level leader. Recommended for advanced capstone simulations and peer mentoring roles.`;
  } else if (grade.tier === 'commendable') {
    review += `Strong performance with minor gaps. This executive would benefit from targeted development in the areas noted above. Recommended for cross-functional simulation exercises.`;
  } else if (grade.tier === 'competent') {
    review += `Adequate performance but not yet at the level expected for the C-suite. Recommended to revisit the Tier 1 modules relevant to the development areas above before reattempting.`;
  } else {
    review += `Significant gaps in executive decision-making capability. Mandatory remediation recommended — complete the relevant Tier 1 knowledge modules before reattempting this simulation.`;
  }

  return review;
}

function getStrengthComment(key: string, score: number): string {
  const comments: Record<string, string> = {
    strategic_thinking: 'Demonstrated the ability to think several moves ahead, considering both short-term impacts and long-term strategic positioning.',
    stakeholder_awareness: 'Showed strong awareness of diverse stakeholder interests, from regulators to employees to the public.',
    decision_quality: 'Decisions were well-grounded in evidence and demonstrated appropriate risk assessment.',
    communication_clarity: 'Communicated decisions and rationale clearly and persuasively.',
    asean_context: 'Effectively navigated the regulatory and cultural complexities specific to the ASEAN business environment.',
    ethical_judgment: 'Consistently prioritized ethical considerations and demonstrated values-based leadership.',
  };
  return comments[key] || 'Strong performance in this area.';
}

function getWeaknessComment(key: string, score: number): string {
  const comments: Record<string, string> = {
    strategic_thinking: 'Tended toward reactive rather than proactive decision-making. Should work on anticipating second- and third-order effects.',
    stakeholder_awareness: 'Insufficient consideration of key stakeholder perspectives, particularly regulators and affected communities.',
    decision_quality: 'Decisions lacked analytical rigor. Should seek more data before committing to high-stakes choices.',
    communication_clarity: 'Responses lacked the clarity and conviction expected at the executive level. Work on framing and delivery.',
    asean_context: 'Failed to adequately account for ASEAN-specific regulatory, cultural, and cross-border considerations.',
    ethical_judgment: 'Ethical considerations were deprioritized in favor of operational expediency. This is a significant concern at the board level.',
  };
  return comments[key] || 'Needs improvement in this area.';
}

const AI_PROMPT = `You are a senior board evaluator writing a Board Performance Review for a C-level executive who just completed a crisis simulation.

Based on the simulation data provided, write a 500-800 word narrative review in the style of a real board evaluation. Be direct, professional, and specific.

Structure:
1. EXECUTIVE SUMMARY (2-3 sentences — overall impression)
2. DECISION ANALYSIS (evaluate each key decision with specificity)
3. STRENGTHS (3 specific callouts with evidence from their choices)
4. DEVELOPMENT AREAS (2-3 areas with concrete suggestions)
5. RED FLAGS (if any — be candid about concerning patterns)
6. RECOMMENDATION (1-2 sentences — what the board should do next)

Tone: Like a real board evaluation — professional, candid, specific. Not sugar-coated. Not cruel. Use the third person ("the executive demonstrated...").

You MUST respond with valid JSON only: {"review": "<the full review text with \\n for line breaks>"}`;

export async function POST(req: NextRequest) {
  try {
    const { simulationTitle, choices, adversaryScores } = await req.json() as {
      simulationTitle: string;
      choices: ChoiceSummary[];
      adversaryScores?: number[];
    };

    if (!choices || !choices.length) {
      return createErrorResponse(new Error('No choices provided.'));
    }

    const avgScores = aggregateScores(choices);
    const weightedScore = calculateWeighted(avgScores);
    const grade = getGrade(weightedScore);

    const scores = avgScores as Record<string, number>;
    const rubricBreakdown = Object.entries(RUBRIC_LABELS).map(([key, label]) => ({
      key,
      label,
      score: scores[key] || 0,
      weight: RUBRIC_WEIGHTS[key],
      weightedScore: Math.round((scores[key] || 0) * RUBRIC_WEIGHTS[key] * 100) / 100,
    }));

    const totalPoints = choices.reduce((sum, c) => sum + c.points, 0);
    const adversaryTotal = (adversaryScores || []).reduce((sum, s) => sum + s, 0);

    const templateReviewText = templateReview(simulationTitle, grade, avgScores, choices);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'dummy-key-for-build') {
      return createSuccessResponse({
        review: templateReviewText,
        rubricBreakdown,
        weightedScore,
        grade,
        totalPoints,
        adversaryTotal,
        isAIGenerated: false,
      });
    }

    try {
      const choicesSummary = choices.map((c, i) =>
        `Scenario ${i + 1} ("${c.scenarioTitle}"): Chose "${c.choiceText}" — rated ${c.outcomeType} (+${c.points} pts). Rubric: ${JSON.stringify(c.rubricScores)}`
      ).join('\n');

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: AI_PROMPT },
            {
              role: 'user',
              content: `Simulation: "${simulationTitle}"\nOverall Weighted Score: ${weightedScore}/5.0 (${grade.grade})\nAverage Rubric Scores: ${JSON.stringify(avgScores)}\n\nDecisions:\n${choicesSummary}\n${adversaryScores?.length ? `Adversary Response Scores: ${adversaryScores.join(', ')} (avg: ${(adversaryTotal / adversaryScores.length).toFixed(1)}/10)` : ''}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 1200,
          response_format: { type: 'json_object' },
        }),
      });

      if (!res.ok) {
        return createSuccessResponse({
          review: templateReviewText,
          rubricBreakdown,
          weightedScore,
          grade,
          totalPoints,
          adversaryTotal,
          isAIGenerated: false,
        });
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        return createSuccessResponse({
          review: templateReviewText,
          rubricBreakdown,
          weightedScore,
          grade,
          totalPoints,
          adversaryTotal,
          isAIGenerated: false,
        });
      }

      const parsed = JSON.parse(content);
      const aiReview = parsed.review || templateReviewText;

      return createSuccessResponse({
        review: aiReview,
        rubricBreakdown,
        weightedScore,
        grade,
        totalPoints,
        adversaryTotal,
        isAIGenerated: true,
      });
    } catch {
      return createSuccessResponse({
        review: templateReviewText,
        rubricBreakdown,
        weightedScore,
        grade,
        totalPoints,
        adversaryTotal,
        isAIGenerated: false,
      });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Review generation failed';
    return createErrorResponse(new Error(message));
  }
}
