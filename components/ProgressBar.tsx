'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  current: number
  total: number
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-800 text-xs sm:text-sm font-rounded font-bold bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
          質問 {current} / {total}
        </span>
        <span className="text-gray-800 text-xs sm:text-sm font-rounded font-bold bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-2.5 sm:h-3 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm shadow-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
