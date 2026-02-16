'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, RotateCcw, Copy } from 'lucide-react'
import charactersData from '@/data/characters.json'
import characterImages from '@/data/character-images.json'
import type { CharactersData } from '@/types/quiz'
import Image from 'next/image'

interface CharacterGeneratorProps {
  onBack: () => void
}

const CharacterGenerator = ({ onBack }: CharacterGeneratorProps) => {
  const [generatedCharacter, setGeneratedCharacter] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateRandomCharacter = () => {
    setIsGenerating(true)
    const data = charactersData as CharactersData
    const characters = data.characterTypes

    // ランダムなキャラクターを選択
    const randomIndex = Math.floor(Math.random() * characters.length)
    const character = characters[randomIndex]

    // アニメーション効果のために少し待つ
    setTimeout(() => {
      setGeneratedCharacter(character)
      setIsGenerating(false)
    }, 800)
  }

  const imageMap = characterImages.imageMapping as Record<string, string>
  const characterImagePath = generatedCharacter
    ? imageMap[generatedCharacter.code] || 'character-01.png'
    : ''

  const handleCopyResult = () => {
    if (generatedCharacter) {
      const text = `私のお仕事キャラは「${generatedCharacter.name}」でした！\n${generatedCharacter.subtitle}\n\n#お仕事キャラメーカー\n\nhttps://oshigoto-chara-maker.vercel.app`
      navigator.clipboard.writeText(text)
      alert('結果をコピーしました！')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-accent-pink mx-auto mb-3 sm:mb-4" />
          <h1 className="text-gray-800 text-2xl sm:text-3xl md:text-4xl font-rounded font-bold mb-2">
            キャラクター生成
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">ランダムであなたのキャラクターを生成します</p>
        </div>

        {/* Generator Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-pop-lg p-6 sm:p-8 md:p-12 mb-6">
          {!generatedCharacter ? (
            <div className="text-center space-y-6">
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-gradient-pastel-purple rounded-3xl flex items-center justify-center">
                <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 text-primary-500" />
              </div>
              <p className="text-gray-600 text-base sm:text-lg">
                ボタンを押してキャラクターを生成してみましょう！
              </p>
              <button
                onClick={generateRandomCharacter}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue text-white font-rounded font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-2xl text-lg sm:text-xl shadow-pop-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    生成中...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    キャラクターを生成
                  </span>
                )}
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Character Header */}
              <div className="bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue p-6 sm:p-8 rounded-2xl text-center">
                <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center p-2 mb-4">
                  <Image
                    src={`/characters/${characterImagePath}`}
                    alt={generatedCharacter.name}
                    width={160}
                    height={160}
                    className="rounded-xl"
                  />
                </div>
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-3">
                  <span className="text-white font-mono font-bold">{generatedCharacter.code}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-rounded font-bold text-white mb-2">
                  {generatedCharacter.name}
                </h2>
                <p className="text-lg sm:text-xl text-white/90">{generatedCharacter.subtitle}</p>
              </div>

              {/* Character Details */}
              <div className="gradient-pastel-purple rounded-xl p-6">
                <h3 className="text-lg font-rounded font-bold text-gray-800 mb-3">性格</h3>
                <p className="text-gray-700 leading-relaxed">{generatedCharacter.personality}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={generateRandomCharacter}
                  disabled={isGenerating}
                  className="flex-1 bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue text-white font-rounded font-bold py-4 px-6 rounded-xl shadow-pop-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  もう一度生成
                </button>
                <button
                  onClick={handleCopyResult}
                  className="flex-1 bg-white text-primary-600 font-rounded font-bold py-4 px-6 rounded-xl shadow-pop hover:shadow-pop-lg transition-all duration-300 flex items-center justify-center gap-2 border-2 border-primary-200"
                >
                  <Copy className="w-5 h-5" />
                  結果をコピー
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full bg-white text-gray-600 font-rounded font-bold py-4 px-6 rounded-2xl shadow-pop hover:shadow-pop-lg transition-all duration-300"
        >
          トップに戻る
        </button>
      </div>
    </div>
  )
}

export default CharacterGenerator
