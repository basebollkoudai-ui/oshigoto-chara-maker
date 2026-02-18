'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QuestionCard from './QuestionCard'
import ProgressBar from './ProgressBar'
import Result from './Result'
import MBTISelector from './MBTISelector'
import branchingQuestionsData from '@/data/questions-branching.json'
import { getInitialQuestions, selectNextQuestion } from '@/utils/questionSelector'
import type { Question, Scores, BranchingQuizData, AnswerHistory } from '@/types/quiz'

const Quiz = () => {
  const [mbtiType, setMbtiType] = useState<string | null>(null)
  const [showMBTI, setShowMBTI] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState<Scores>({
    actionStyle: 0,
    socialStyle: 0,
    motivation: 0,
    thinking: 0,
  })
  const [answerHistory, setAnswerHistory] = useState<AnswerHistory[]>([])
  const [showResult, setShowResult] = useState(false)
  const [direction, setDirection] = useState(1)
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  const quizData = branchingQuestionsData as BranchingQuizData
  const totalQuestions = 20

  // Initialize first 3 questions when MBTI selection is complete
  useEffect(() => {
    if (!showMBTI && !isInitialized) {
      const initialQuestions = getInitialQuestions(quizData)
      setSelectedQuestions(initialQuestions)
      setIsInitialized(true)
    }
  }, [showMBTI, isInitialized, quizData])

  const handleAnswer = (optionScores: any, selectedAnswer: string) => {
    // Update scores
    const newScores = { ...scores }
    Object.keys(optionScores).forEach((key) => {
      if (key in newScores) {
        newScores[key as keyof Scores] += optionScores[key]
      }
    })
    setScores(newScores)

    // Record answer history
    const currentQ = selectedQuestions[currentQuestion]
    const newAnswer: AnswerHistory = {
      questionId: typeof currentQ.id === 'number' ? currentQ.id : parseInt(currentQ.id) || currentQuestion + 1,
      question: currentQ.question,
      selectedAnswer: selectedAnswer,
      scores: optionScores,
    }
    const updatedHistory = [...answerHistory, newAnswer]
    setAnswerHistory(updatedHistory)

    // Move to next question or show result
    if (currentQuestion < totalQuestions - 1) {
      // Select next question based on current context
      const nextQuestion = selectNextQuestion(
        {
          mbtiType,
          currentScores: newScores,
          answeredQuestions: selectedQuestions.slice(0, currentQuestion + 1),
          questionNumber: currentQuestion + 2, // +2 because we're selecting for the next slot (1-indexed)
          answerHistory: updatedHistory,
        },
        quizData
      )

      setSelectedQuestions([...selectedQuestions, nextQuestion])
      setDirection(1)
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 300)
    } else {
      setTimeout(() => {
        setShowResult(true)
      }, 300)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection(-1)
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleMBTISelect = (mbti: string) => {
    setMbtiType(mbti)
    setShowMBTI(false)
  }

  const handleMBTISkip = () => {
    setMbtiType(null)
    setShowMBTI(false)
  }

  if (showMBTI) {
    return <MBTISelector onSelect={handleMBTISelect} onSkip={handleMBTISkip} />
  }

  if (showResult) {
    return <Result scores={scores} answerHistory={answerHistory} mbtiType={mbtiType} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8 relative overflow-hidden">
      {/* 背景の装飾 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-5 md:left-10 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-pastel-yellow rounded-full opacity-50 blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-5 md:right-10 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-pastel-mint rounded-full opacity-50 blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 bg-pastel-peach rounded-full opacity-50 blur-3xl"
          animate={{ y: [0, 25, 0], x: [0, 15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-1/4 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-accent-pink rounded-full opacity-30 blur-2xl"
          animate={{ y: [0, -35, 0], x: [0, 25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Progress Bar */}
        <ProgressBar
          current={currentQuestion + 1}
          total={totalQuestions}
        />

        {/* Question Card */}
        <AnimatePresence mode="wait">
          {selectedQuestions[currentQuestion] ? (
            <motion.div
              key={currentQuestion}
              initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <QuestionCard
                question={selectedQuestions[currentQuestion]}
                questionNumber={currentQuestion + 1}
                totalQuestions={totalQuestions}
                onAnswer={handleAnswer}
                onPrevious={handlePrevious}
                canGoBack={currentQuestion > 0}
              />
            </motion.div>
          ) : (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white font-rounded text-lg py-20"
            >
              読み込み中...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Quiz
