'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Eye,
  Lightbulb,
  RotateCcw,
  Loader2,
  Brain,
  MessageCircle,
  Download,
  Image as ImageIcon,
} from 'lucide-react'
import type { Scores, CharactersData, AnswerHistory } from '@/types/quiz'
import charactersData from '@/data/characters.json'
import advicePatterns from '@/data/advice-patterns.json'
import characterImages from '@/data/character-images.json'
import SkillRadarChart from './SkillRadarChart'
import { Briefcase } from 'lucide-react'
import Image from 'next/image'

interface ResultProps {
  scores: Scores
  answerHistory: AnswerHistory[]
}

const Result = ({ scores, answerHistory }: ResultProps) => {
  const [aiAdvice, setAiAdvice] = useState<string>('')
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false)
  const [adviceError, setAdviceError] = useState<string>('')

  // Determine character type based on scores
  const determineType = (): string => {
    let type = ''
    type += scores.actionStyle > 0 ? 'I' : 'S'
    type += scores.socialStyle > 0 ? 'G' : 'T'
    type += scores.motivation > 0 ? 'Y' : 'A'
    type += scores.thinking > 0 ? 'S' : 'C'
    return type
  }

  const typeCode = determineType()
  const data = charactersData as CharactersData
  const character = data.characterTypes.find((c) => c.code === typeCode)
  const imageMap = characterImages.imageMapping as Record<string, string>
  const characterImagePath = imageMap[typeCode] || 'character-01.png'

  // Load predefined advice and save result on mount
  useEffect(() => {
    const loadAdviceAndSave = async () => {
      if (!character) return

      setIsLoadingAdvice(true)
      setAdviceError('')

      try {
        // Simulate typing effect for better UX
        const advice = (advicePatterns as Record<string, string>)[typeCode] ||
          'あなたは独自のスタイルを持っています。自分らしく働き続けてください。'

        // Simulate streaming effect character by character
        let currentText = ''
        for (let i = 0; i < advice.length; i++) {
          currentText += advice[i]
          setAiAdvice(currentText)
          // Add small delay to simulate streaming
          await new Promise(resolve => setTimeout(resolve, 20))
        }

        setIsLoadingAdvice(false)

        // Save result to database after advice is loaded
        await saveResultToDatabase(advice)
      } catch (error) {
        console.error('Error loading advice:', error)
        setAdviceError('アドバイスの読み込みに失敗しました。')
        setIsLoadingAdvice(false)
      }
    }

    const saveResultToDatabase = async (advice: string) => {
      if (!character) return

      try {
        const response = await fetch('/api/save-result', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            characterCode: typeCode,
            characterName: character.name,
            scores,
            answerHistory,
            aiAdvice: advice,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          console.log('✅ Result saved:', data.resultId)
        }
      } catch (error) {
        console.error('Error saving result:', error)
        // Don't show error to user, just log it
      }
    }

    loadAdviceAndSave()
  }, [character, typeCode, answerHistory, scores])

  if (!character) {
    return <div>エラー: キャラクターが見つかりません</div>
  }

  const handleRestart = () => {
    window.location.reload()
  }

  const handleTwitterShare = () => {
    const diagnosticUrl = window.location.origin
    const imageUrl = `${diagnosticUrl}/api/og-image?code=${encodeURIComponent(
      character.code
    )}&name=${encodeURIComponent(character.name)}&subtitle=${encodeURIComponent(
      character.subtitle
    )}&icon=${encodeURIComponent(character.icon)}`
    const text = `私のお仕事キャラメーカー診断結果は「${character.name}」でした！\n${character.subtitle}\n\n#お仕事キャラメーカー\n\nあなたも診断してみよう👇\n${diagnosticUrl}\n\n${imageUrl}`
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const handleDownloadImage = async () => {
    try {
      const imageUrl = `/api/og-image?code=${encodeURIComponent(
        character.code
      )}&name=${encodeURIComponent(character.name)}&subtitle=${encodeURIComponent(
        character.subtitle
      )}&icon=${encodeURIComponent(character.icon)}`

      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `work-monster-${character.code}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading image:', error)
      alert('画像のダウンロードに失敗しました')
    }
  }

  const handleShareWithImage = async () => {
    const diagnosticUrl = window.location.origin
    const text = `私のお仕事キャラメーカー診断結果は「${character.name}」でした！\n${character.subtitle}\n\n#お仕事キャラメーカー`

    if (navigator.share) {
      try {
        // First share: Text message
        await navigator.share({
          text: text,
        })

        // Wait a moment before second share
        await new Promise(resolve => setTimeout(resolve, 500))

        // Second share: URL with OGP image
        await navigator.share({
          title: 'お仕事キャラメーカー',
          text: 'あなたも診断してみよう👇',
          url: diagnosticUrl,
        })
      } catch (error) {
        console.log('Share cancelled or failed:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${text}\n\nあなたも診断してみよう👇\n${diagnosticUrl}`)
      alert('結果をクリップボードにコピーしました！')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue py-6 sm:py-8 px-3 sm:px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
            className="inline-block"
          >
            <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-accent-pink mx-auto mb-3 sm:mb-4" />
          </motion.div>
          <h1 className="text-gray-800 text-2xl sm:text-3xl md:text-4xl font-rounded font-bold mb-2">
            診断結果
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">あなたのお仕事キャラクターが明らかになりました</p>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-pop-lg overflow-hidden mb-4 sm:mb-6"
        >
          {/* Character Header */}
          <div className="bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue p-6 sm:p-8 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
              className="mb-3 sm:mb-4"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex items-center justify-center p-2 shadow-pop-lg">
                <Image
                  src={`/characters/${characterImagePath}`}
                  alt={character.name}
                  width={160}
                  height={160}
                  className="rounded-xl sm:rounded-2xl"
                  priority
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="inline-block bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
                <span className="text-white font-mono font-bold text-sm sm:text-base">
                  {character.code}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-rounded font-bold text-white mb-2 sm:mb-3 px-2">
                {character.name}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 px-2">
                {character.subtitle}
              </p>
            </motion.div>
          </div>

          {/* Character Details */}
          <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            {/* Personality */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="gradient-pastel-purple rounded-xl sm:rounded-2xl p-4 sm:p-6"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-rounded font-bold text-gray-800">性格</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {character.personality}
              </p>
            </motion.div>

            {/* Strengths */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="gradient-pastel-mint rounded-xl sm:rounded-2xl p-4 sm:p-6"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-rounded font-bold text-gray-800">長所</h3>
              </div>
              <ul className="space-y-2">
                {character.strengths.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    className="flex items-start gap-2 sm:gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Weaknesses */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="gradient-pastel-peach rounded-xl sm:rounded-2xl p-4 sm:p-6"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-orange rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-rounded font-bold text-gray-800">短所</h3>
              </div>
              <ul className="space-y-2">
                {character.weaknesses.map((weakness, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    className="flex items-start gap-2 sm:gap-3"
                  >
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">{weakness}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Hidden Face */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">裏の顔</h3>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                {character.hiddenFace}
              </p>
            </motion.div>

            {/* Suitable Jobs */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="gradient-pastel-blue rounded-xl sm:rounded-2xl p-4 sm:p-6"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-blue rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-rounded font-bold text-gray-800">あなたに向いている職種</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {character.suitableJobs.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                    className="bg-white rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-sm border-2 border-accent-blue border-opacity-20"
                  >
                    <p className="text-sm sm:text-base text-gray-800 font-medium text-center">{job}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills Chart */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.9 }}
              className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">スキル分析</h3>
              </div>
              <SkillRadarChart skills={character.skills} />
            </motion.div>

            {/* Advice */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 2.1 }}
              className="gradient-pastel-yellow rounded-xl sm:rounded-2xl p-4 sm:p-6"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-yellow rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-rounded font-bold text-gray-800">アドバイス</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {character.advice}
              </p>
            </motion.div>

            {/* AI Generated Advice */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 2.3 }}
              className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    超パーソナライズされた裏のアドバイス
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    あなたの回答パターンから分析されたアドバイス
                  </p>
                </div>
              </div>

              {isLoadingAdvice && (
                <div className="flex items-center gap-3 text-purple-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-medium">分析中...</span>
                </div>
              )}

              {adviceError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-sm">{adviceError}</p>
                  <p className="text-red-600 text-xs mt-2">
                    .env.local ファイルに ANTHROPIC_API_KEY を設定してください
                  </p>
                </div>
              )}

              {aiAdvice && !adviceError && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl p-5 shadow-sm"
                >
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {aiAdvice}
                  </p>
                  {!isLoadingAdvice && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 italic">
                        ※ このアドバイスはあなたの回答パターンに基づいて生成されています
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="space-y-3 sm:space-y-4 mb-6 sm:mb-8"
        >
          {/* Primary Share Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShareWithImage}
              className="flex-1 bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue text-white font-rounded font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-pop-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              画像付きでシェア
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTwitterShare}
              className="flex-1 bg-blue-500 text-white font-rounded font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-pop-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              X でシェア
            </motion.button>
          </div>

          {/* Secondary Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadImage}
              className="flex-1 bg-white text-primary-600 font-rounded font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-pop hover:shadow-pop-lg transition-all duration-300 flex items-center justify-center gap-2 border-2 border-primary-200 text-sm sm:text-base"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              結果画像をダウンロード
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestart}
              className="flex-1 bg-white text-gray-600 font-rounded font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-pop hover:shadow-pop-lg transition-all duration-300 flex items-center justify-center gap-2 border-2 border-gray-200 text-sm sm:text-base"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              もう一度診断
            </motion.button>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <p className="text-gray-600 text-xs sm:text-sm">
            ※ この診断結果はエンターテイメント目的です
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Result
