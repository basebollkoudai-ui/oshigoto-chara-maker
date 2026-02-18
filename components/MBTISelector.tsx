'use client'

import { motion } from 'framer-motion'
import { Brain } from 'lucide-react'

const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
]

interface MBTISelectorProps {
  onSelect: (mbti: string) => void
  onSkip: () => void
}

const MBTISelector = ({ onSelect, onSkip }: MBTISelectorProps) => {
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
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-md rounded-3xl shadow-pop-lg p-6 sm:p-8 md:p-10"
        >
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-accent-pink via-primary-500 to-accent-blue rounded-full mb-4 shadow-lg">
              <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-rounded font-bold text-gray-800 mb-3">
              あなたのMBTIタイプは？
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              より精度の高い診断のため、MBTIタイプを選択してください
              <br className="hidden sm:block" />
              分からない場合はスキップできます
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6">
            {MBTI_TYPES.map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(type)}
                className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-primary-400 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 font-rounded font-bold text-gray-700 hover:text-primary-600 transition-all shadow-sm hover:shadow-md text-sm sm:text-base md:text-lg"
              >
                {type}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSkip}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-rounded font-bold py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl transition-all text-sm sm:text-base"
          >
            スキップして診断を始める
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default MBTISelector
