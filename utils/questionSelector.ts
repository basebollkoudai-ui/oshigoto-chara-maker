import type {
  Question,
  QuestionSlot,
  Scores,
  BranchingQuizData,
  AnswerHistory,
} from '@/types/quiz'

interface SelectionContext {
  mbtiType: string | null
  currentScores: Scores
  answeredQuestions: Question[]
  questionNumber: number
  answerHistory: AnswerHistory[]
}

/**
 * Get initial questions (first 3 are always base questions)
 */
export function getInitialQuestions(quizData: BranchingQuizData): Question[] {
  return quizData.questionSlots.slice(0, 3).map((slot) => slot.baseQuestion)
}

/**
 * Select next question based on current scores.
 * Simple rule: pick variant-b if socialStyle > 0 or motivation > 0,
 * pick variant-c if actionStyle < 0 or thinking > 0,
 * otherwise use baseQuestion.
 * This ensures branching always happens based on accumulated scores.
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

  // No variants available or too early
  if (!slot.variants || slot.variants.length === 0 || context.questionNumber <= 3) {
    return slot.baseQuestion
  }

  const { currentScores } = context

  // Determine dominant axis directions from accumulated scores
  const isHighAction = currentScores.actionStyle >= 1
  const isLowAction = currentScores.actionStyle <= -1
  const isHighSocial = currentScores.socialStyle >= 1
  const isLowSocial = currentScores.socialStyle <= -1
  const isHighMotivation = currentScores.motivation >= 1
  const isLowMotivation = currentScores.motivation <= -1
  const isHighThinking = currentScores.thinking >= 1

  // Score each variant based on how well conditions match
  const scoredVariants = slot.variants.map((variant, index) => {
    let matchScore = 0
    const preferredWhen = variant.conditions?.preferredWhen
    if (!preferredWhen) return { variant, matchScore: 0, index }

    // Check score patterns
    if (preferredWhen.scorePatterns) {
      for (const pattern of preferredWhen.scorePatterns) {
        const axisScore = currentScores[pattern.axis as keyof Scores]
        if (pattern.direction === 'positive' && axisScore >= pattern.threshold) {
          matchScore += 20
        } else if (pattern.direction === 'negative' && axisScore <= -pattern.threshold) {
          matchScore += 20
        }
      }
    }

    // Bonus for social-type variants when user is social
    if (variant.tags?.includes('social') || variant.tags?.includes('people')) {
      if (isHighSocial) matchScore += 10
      if (isLowSocial) matchScore -= 5
    }

    // Bonus for individual-type variants when user is solo
    if (variant.tags?.includes('individual') || variant.tags?.includes('focus')) {
      if (isLowSocial) matchScore += 10
      if (isHighSocial) matchScore -= 5
    }

    // Bonus for motivation variants
    if (variant.tags?.includes('vision') || variant.tags?.includes('strategic')) {
      if (isHighMotivation) matchScore += 10
    }

    // Bonus for balance/values variants for low motivation users
    if (variant.tags?.includes('balance') || variant.tags?.includes('harmony')) {
      if (isLowMotivation) matchScore += 10
    }

    return { variant, matchScore, index }
  })

  // Pick the highest scoring variant
  const best = scoredVariants.reduce((a, b) => (b.matchScore > a.matchScore ? b : a))

  // Use variant if it has any positive match, otherwise use base
  if (best.matchScore > 0) {
    console.log(
      `[Q${context.questionNumber}] Using variant "${best.variant.id}" (score=${best.matchScore}) | scores:`,
      currentScores
    )
    return best.variant
  }

  // Fallback: alternate between base and variants based on question number parity
  // This ensures variety even when scores are neutral
  const variantCount = slot.variants.length
  if (variantCount > 0) {
    // Use slot index to pick different variants for variety
    const pick = slotIndex % (variantCount + 1)
    if (pick > 0) {
      const pickedVariant = slot.variants[pick - 1]
      console.log(
        `[Q${context.questionNumber}] Fallback variant "${pickedVariant.id}" | scores:`,
        currentScores
      )
      return pickedVariant
    }
  }

  return slot.baseQuestion
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
