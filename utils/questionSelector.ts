import type {
  Question,
  QuestionSlot,
  QuestionVariant,
  Scores,
  BranchingQuizData,
  ScorePattern,
  AnswerHistory,
} from '@/types/quiz'

interface SelectionContext {
  mbtiType: string | null
  currentScores: Scores
  answeredQuestions: Question[]
  questionNumber: number
  answerHistory: AnswerHistory[]
}

interface AxisTracker {
  current: number
  target: number
  remaining: number
  needed: number
  priority: number
}

/**
 * Extract MBTI letters for matching
 */
function getMBTILetters(mbti: string | null): string[] {
  if (!mbti || mbti.length !== 4) return []
  return mbti.split('')
}

/**
 * Check if score pattern matches current scores
 */
function matchesScorePattern(
  pattern: ScorePattern,
  scores: Scores
): boolean {
  const scoreValue = scores[pattern.axis]
  if (pattern.direction === 'positive') {
    return scoreValue >= pattern.threshold
  } else {
    return scoreValue <= -pattern.threshold
  }
}

/**
 * Calculate how well a variant matches current context
 */
function calculateVariantScore(
  variant: QuestionVariant,
  context: SelectionContext,
  quizData: BranchingQuizData
): number {
  if (!variant.conditions?.preferredWhen) {
    return 0
  }

  let score = 0
  const { preferredWhen } = variant.conditions
  const { mbtiInfluence } = quizData.branchingRules

  // Check if we're past the required question number (hard gate)
  if (preferredWhen.afterQuestion && context.questionNumber <= preferredWhen.afterQuestion) {
    return 0 // Don't use this variant yet
  }

  // Check MBTI match
  if (preferredWhen.mbtiTypes && preferredWhen.mbtiTypes.length > 0) {
    if (context.mbtiType) {
      const mbtiMatch = preferredWhen.mbtiTypes.includes(context.mbtiType)
      if (mbtiMatch) {
        score += 50 // High weight for MBTI match
      }
      // Partial letter match bonus
      const mbtiLetters = getMBTILetters(context.mbtiType)
      preferredWhen.mbtiTypes.forEach((mbti) => {
        const targetLetters = getMBTILetters(mbti)
        const matchCount = mbtiLetters.filter((l) => targetLetters.includes(l)).length
        score += matchCount * 5
      })
    }
    // No MBTI selected: give partial score to allow variant to surface via score patterns
    if (!context.mbtiType) {
      score += 10
    }
  } else {
    // No MBTI constraint: score not blocked by missing MBTI
    score += 10
  }

  // Check MBTI letter-based tag preferences
  if (context.mbtiType && variant.tags) {
    const mbtiLetters = getMBTILetters(context.mbtiType)
    mbtiLetters.forEach((letter) => {
      const influence = mbtiInfluence[letter]
      if (influence) {
        const tagMatches = variant.tags!.filter((tag) =>
          influence.preferTags.includes(tag)
        ).length
        score += tagMatches * influence.weight * 10
      }
    })
  }

  // Check score patterns
  if (preferredWhen.scorePatterns) {
    const matchingPatterns = preferredWhen.scorePatterns.filter((pattern) =>
      matchesScorePattern(pattern, context.currentScores)
    )
    score += matchingPatterns.length * 20
  }

  return score
}

/**
 * Select best question variant for current slot
 */
function selectQuestionFromSlot(
  slot: QuestionSlot,
  context: SelectionContext,
  quizData: BranchingQuizData
): Question {
  // If no variants or very early in quiz, use base question
  if (!slot.variants || slot.variants.length === 0 || context.questionNumber <= 3) {
    return slot.baseQuestion
  }

  // Calculate scores for each variant
  const variantScores = slot.variants.map((variant) => ({
    variant,
    score: calculateVariantScore(variant, context, quizData),
  }))

  // Find highest scoring variant
  const bestVariant = variantScores.reduce(
    (best, current) => (current.score > best.score ? current : best),
    { variant: slot.baseQuestion as Question, score: 0 }
  )

  // Lower threshold: use variant if it has any meaningful signal (score > 5)
  return bestVariant.score > 5 ? bestVariant.variant : slot.baseQuestion
}

/**
 * Update axis tracking after each question
 * Counts how many questions cover each axis
 */
function updateAxisPriorities(
  answeredQuestions: number,
  selectedQuestions: Question[],
  axisBalance: BranchingQuizData['axisBalance']
): Record<keyof Scores, AxisTracker> {
  const remainingQuestions = 20 - answeredQuestions
  const axes: (keyof Scores)[] = ['actionStyle', 'socialStyle', 'motivation', 'thinking']

  const trackers: Record<string, AxisTracker> = {}

  axes.forEach((axis) => {
    // Count how many questions cover this axis (one count per question, not per option)
    let current = 0
    selectedQuestions.forEach((q) => {
      const hasAxis = q.options.some(
        (opt) => opt.scores[axis] !== undefined && opt.scores[axis] !== 0
      )
      if (hasAxis) current++
    })

    const target = axisBalance[axis].target
    const needed = Math.max(0, target - current)
    const priority = remainingQuestions > 0 ? needed / remainingQuestions : 0

    trackers[axis] = {
      current,
      target,
      remaining: remainingQuestions,
      needed,
      priority,
    }
  })

  return trackers
}

/**
 * Check if a question covers high-priority axes
 */
function questionCoversNeededAxes(
  question: Question,
  axisPriorities: Record<keyof Scores, AxisTracker>
): number {
  let coverageScore = 0
  const axes: (keyof Scores)[] = ['actionStyle', 'socialStyle', 'motivation', 'thinking']

  axes.forEach((axis) => {
    const hasAxis = question.options.some(
      (opt) => opt.scores[axis] !== undefined && opt.scores[axis] !== 0
    )
    if (hasAxis) {
      const priority = axisPriorities[axis]?.priority || 0
      coverageScore += priority * 10
    }
  })

  return coverageScore
}

/**
 * Get initial questions (first 3 are always base questions)
 */
export function getInitialQuestions(quizData: BranchingQuizData): Question[] {
  return quizData.questionSlots.slice(0, 3).map((slot) => slot.baseQuestion)
}

/**
 * Select next question based on current context
 */
export function selectNextQuestion(
  context: SelectionContext,
  quizData: BranchingQuizData
): Question {
  const slotIndex = context.questionNumber - 1 // 0-indexed

  if (slotIndex < 0 || slotIndex >= quizData.questionSlots.length) {
    throw new Error(`Invalid question number: ${context.questionNumber}`)
  }

  const slot = quizData.questionSlots[slotIndex]

  // Get base selection from slot
  const selectedQuestion = selectQuestionFromSlot(slot, context, quizData)

  // Check axis balance for mid-to-late questions
  if (context.questionNumber >= 10) {
    const axisPriorities = updateAxisPriorities(
      context.answeredQuestions.length,
      context.answeredQuestions,
      quizData.axisBalance
    )

    // If selected question doesn't cover needed axes well, try variants
    const currentCoverage = questionCoversNeededAxes(selectedQuestion, axisPriorities)

    if (slot.variants && slot.variants.length > 0) {
      // Check if any variant has better axis coverage
      const variantsWithCoverage = [slot.baseQuestion, ...slot.variants].map((q) => ({
        question: q,
        coverage: questionCoversNeededAxes(q, axisPriorities),
      }))

      const bestCoverage = variantsWithCoverage.reduce((best, current) =>
        current.coverage > best.coverage ? current : best
      )

      // If we need axis balance more than personalization, use best coverage
      const highestPriority = Math.max(...Object.values(axisPriorities).map((t) => t.priority))
      if (highestPriority > 1.5 && bestCoverage.coverage > currentCoverage) {
        return bestCoverage.question
      }
    }
  }

  return selectedQuestion
}

/**
 * Validate that a quiz path maintains axis balance
 */
export function validateAxisBalance(
  questions: Question[],
  axisBalance: BranchingQuizData['axisBalance']
): { valid: boolean; details: Record<keyof Scores, { count: number; target: number; ok: boolean }> } {
  const axes: (keyof Scores)[] = ['actionStyle', 'socialStyle', 'motivation', 'thinking']
  const counts: Record<string, number> = {
    actionStyle: 0,
    socialStyle: 0,
    motivation: 0,
    thinking: 0,
  }

  questions.forEach((q) => {
    axes.forEach((axis) => {
      const hasAxis = q.options.some(
        (opt) => opt.scores[axis] !== undefined && opt.scores[axis] !== 0
      )
      if (hasAxis) counts[axis]++
    })
  })

  const details: any = {}
  let allValid = true

  axes.forEach((axis) => {
    const count = counts[axis]
    const { min, max, target } = axisBalance[axis]
    const ok = count >= min && count <= max
    details[axis] = { count, target, ok }
    if (!ok) allValid = false
  })

  return { valid: allValid, details }
}
