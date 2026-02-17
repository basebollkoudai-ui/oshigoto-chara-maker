'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Circle } from 'lucide-react'
import type { Question } from '@/types/quiz'

interface QuestionCardProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  onAnswer: (scores: any, selectedAnswer: string) => void
  onPrevious: () => void
  canGoBack: boolean
}

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onPrevious,
  canGoBack,
}: QuestionCardProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl md:rounded-4xl shadow-pop-lg p-4 sm:p-6 md:p-10 border-2 border-opacity-20 border-primary-200">
      {/* Back Button */}
      {canGoBack && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrevious}
          className="flex items-center gap-1.5 sm:gap-2 text-gray-500 hover:text-accent-pink transition-all mb-4 sm:mb-6 group bg-gray-50 hover:bg-pastel-pink hover:bg-opacity-30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs sm:text-sm font-rounded font-bold">前の質問に戻る</span>
        </motion.button>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Question Number Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-4 sm:mb-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 gradient-pastel-pink px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-pop border-2 border-accent-pink border-opacity-20">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Circle className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-accent-pink text-accent-pink" />
            </motion.div>
            <span className="text-gray-800 font-rounded font-bold text-sm sm:text-base">
              Question {questionNumber}/{totalQuestions}
            </span>
          </div>
        </motion.div>

        {/* Question Text */}
        <motion.h2
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-rounded font-extrabold text-gray-800 mb-6 sm:mb-8 md:mb-10 leading-relaxed text-center px-2"
        >
          {question.question}
        </motion.h2>

        {/* Options */}
        <div className="space-y-3 sm:space-y-4">
          {question.options.map((option, index) => {
            const gradients = [
              'gradient-pastel-pink',
              'gradient-pastel-blue',
              'gradient-pastel-purple',
              'gradient-pastel-pink',
            ]
            const accentColors = [
              'accent-pink',
              'accent-blue',
              'primary-500',
              'accent-orange',
            ]

            return (
              <motion.button
                key={index}
                variants={itemVariants}
                onClick={() => onAnswer(option.scores, option.text)}
                className={`w-full text-left p-4 sm:p-5 md:p-6 lg:p-7 ${gradients[index % 4]} border-2 border-${accentColors[index % 4]} border-opacity-20 rounded-2xl sm:rounded-3xl group shadow-pop`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white border-3 border-${accentColors[index % 4]} flex items-center justify-center shadow-sm`}
                  >
                    <span className={`text-${accentColors[index % 4]} font-rounded font-extrabold text-base sm:text-lg`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <p className="text-gray-800 leading-relaxed flex-1 font-medium text-sm sm:text-base">
                    {option.text}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

    </div>
  )
}

export default QuestionCard
