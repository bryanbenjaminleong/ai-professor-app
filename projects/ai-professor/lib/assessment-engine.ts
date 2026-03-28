// Assessment Engine - Quiz, Scoring, Pass/Fail Logic

import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Types
export interface Assessment {
  id: string
  course_id: string
  title: string
  description: string
  passing_score: number // percentage (e.g., 70)
  max_attempts: number
  cooldown_hours: number // hours before retake allowed
  questions: Question[]
}

export interface Question {
  id: string
  type: 'multiple_choice' | 'true_false' | 'practical'
  question: string
  options?: string[] // for multiple choice
  correct_answer: string | number
  explanation: string
  points: number
}

export interface AssessmentAttempt {
  id: string
  user_id: string
  assessment_id: string
  answers: Record<string, string | number> // question_id -> answer
  score: number
  passed: boolean
  attempt_number: number
  submitted_at: string
}

export interface AssessmentResult {
  attempt_id: string
  score: number
  total_points: number
  percentage: number
  passed: boolean
  correct_answers: number
  total_questions: number
  can_retake: boolean
  retake_available_at: string | null
  feedback: QuestionFeedback[]
}

export interface QuestionFeedback {
  question_id: string
  question: string
  user_answer: string | number
  correct_answer: string | number
  is_correct: boolean
  explanation: string
}

// Assessment Engine Class
export class AssessmentEngine {
  private assessment: Assessment
  private userId: string

  constructor(assessment: Assessment, userId: string) {
    this.assessment = assessment
    this.userId = userId
  }

  // Get user's previous attempts
  async getPreviousAttempts(): Promise<AssessmentAttempt[]> {
    const { data, error } = await supabase
      .from('assessment_attempts')
      .select('*')
      .eq('assessment_id', this.assessment.id)
      .eq('user_id', this.userId)
      .order('submitted_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Check if user can take assessment
  async canTakeAssessment(): Promise<{ 
    canTake: boolean
    reason?: string
    retakeAvailableAt?: string 
  }> {
    const attempts = await this.getPreviousAttempts()

    // No attempts yet
    if (attempts.length === 0) {
      return { canTake: true }
    }

    // Check if already passed
    const passedAttempt = attempts.find(a => a.passed)
    if (passedAttempt) {
      return { 
        canTake: false, 
        reason: 'Already passed this assessment' 
      }
    }

    // Check max attempts
    if (attempts.length >= this.assessment.max_attempts) {
      return { 
        canTake: false, 
        reason: `Maximum attempts (${this.assessment.max_attempts}) reached` 
      }
    }

    // Check cooldown period
    const lastAttempt = attempts[0]
    const lastAttemptTime = new Date(lastAttempt.submitted_at).getTime()
    const cooldownMs = this.assessment.cooldown_hours * 60 * 60 * 1000
    const retakeAvailableAt = new Date(lastAttemptTime + cooldownMs)

    if (new Date() < retakeAvailableAt) {
      return { 
        canTake: false, 
        reason: `Retake available after cooldown period`,
        retakeAvailableAt: retakeAvailableAt.toISOString()
      }
    }

    return { canTake: true }
  }

  // Submit assessment answers
  async submitAssessment(answers: Record<string, string | number>): Promise<AssessmentResult> {
    // Verify can take
    const { canTake, reason } = await this.canTakeAssessment()
    if (!canTake) {
      throw new Error(reason)
    }

    // Get previous attempts for attempt number
    const attempts = await this.getPreviousAttempts()
    const attemptNumber = attempts.length + 1

    // Calculate score
    const feedback: QuestionFeedback[] = []
    let correctCount = 0
    let totalPoints = 0
    let earnedPoints = 0

    for (const question of this.assessment.questions) {
      const userAnswer = answers[question.id]
      const isCorrect = userAnswer === question.correct_answer

      if (isCorrect) correctCount++
      totalPoints += question.points
      if (isCorrect) earnedPoints += question.points

      feedback.push({
        question_id: question.id,
        question: question.question,
        user_answer: userAnswer,
        correct_answer: question.correct_answer,
        is_correct: isCorrect,
        explanation: question.explanation,
      })
    }

    const percentage = Math.round((earnedPoints / totalPoints) * 100)
    const passed = percentage >= this.assessment.passing_score

    // Save attempt
    const { data: attempt, error } = await supabase
      .from('assessment_attempts')
      .insert({
        user_id: this.userId,
        assessment_id: this.assessment.id,
        answers,
        score: percentage,
        passed,
        attempt_number: attemptNumber,
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    // Check if can retake
    const { can_retake, retake_available_at } = await this.getRetakeInfo(passed, attemptNumber)

    return {
      attempt_id: attempt.id,
      score: earnedPoints,
      total_points: totalPoints,
      percentage,
      passed,
      correct_answers: correctCount,
      total_questions: this.assessment.questions.length,
      can_retake,
      retake_available_at,
      feedback,
    }
  }

  // Get retake information
  private async getRetakeInfo(passed: boolean, attemptNumber: number): Promise<{
    can_retake: boolean
    retake_available_at: string | null
  }> {
    if (passed) {
      return { can_retake: false, retake_available_at: null }
    }

    if (attemptNumber >= this.assessment.max_attempts) {
      return { can_retake: false, retake_available_at: null }
    }

    const retakeAvailableAt = new Date(
      Date.now() + this.assessment.cooldown_hours * 60 * 60 * 1000
    )

    return { 
      can_retake: true, 
      retake_available_at: retakeAvailableAt.toISOString() 
    }
  }
}

// Helper functions

export async function getAssessment(courseId: string): Promise<Assessment | null> {
  const { data, error } = await supabase
    .from('assessments')
    .select('*, questions:assessment_questions(*)')
    .eq('course_id', courseId)
    .single()

  if (error) return null
  return data
}

export async function getUserAssessmentResults(
  userId: string, 
  courseId: string
): Promise<AssessmentAttempt | null> {
  const assessment = await getAssessment(courseId)
  if (!assessment) return null

  const { data, error } = await supabase
    .from('assessment_attempts')
    .select('*')
    .eq('assessment_id', assessment.id)
    .eq('user_id', userId)
    .eq('passed', true)
    .single()

  if (error) return null
  return data
}

export function formatAssessmentResult(result: AssessmentResult): string {
  const status = result.passed ? '✅ PASSED' : '❌ NOT PASSED'
  const score = `${result.percentage}% (${result.correct_answers}/${result.total_questions} correct)`
  
  let message = `${status}\nScore: ${score}\n`
  
  if (!result.passed && result.can_retake) {
    const retakeDate = result.retake_available_at 
      ? new Date(result.retake_available_at).toLocaleString()
      : 'now'
    message += `Retake available: ${retakeDate}\n`
  }
  
  if (!result.passed && !result.can_retake) {
    message += 'No more attempts available.\n'
  }
  
  return message
}
