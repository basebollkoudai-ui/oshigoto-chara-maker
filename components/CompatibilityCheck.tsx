'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Search, ArrowLeft, Trash2 } from 'lucide-react'
import charactersData from '@/data/characters.json'
import characterImages from '@/data/character-images.json'
import type { CharactersData } from '@/types/quiz'
import Image from 'next/image'
import { getCompatibility } from '@/utils/compatibility'

interface CompatibilityCheckProps {
  onBack: () => void
}

interface SavedCharacter {
  code: string
  name: string
  subtitle: string
  icon: string
  shareCode: string
  timestamp: number
}

const CompatibilityCheck = ({ onBack }: CompatibilityCheckProps) => {
  const [savedCharacters, setSavedCharacters] = useState<SavedCharacter[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<SavedCharacter | null>(null)
  const [partnerCode, setPartnerCode] = useState('')
  const [compatibilityResult, setCompatibilityResult] = useState<any>(null)

  useEffect(() => {
    // Load saved characters from localStorage
    const saved = localStorage.getItem('savedCharacters')
    if (saved) {
      setSavedCharacters(JSON.parse(saved))
    }
  }, [])

  const handleDeleteCharacter = (shareCode: string) => {
    const updated = savedCharacters.filter(c => c.shareCode !== shareCode)
    setSavedCharacters(updated)
    localStorage.setItem('savedCharacters', JSON.stringify(updated))
    if (selectedCharacter?.shareCode === shareCode) {
      setSelectedCharacter(null)
      setCompatibilityResult(null)
    }
  }

  const handleCheckCompatibility = () => {
    if (!selectedCharacter || !partnerCode.trim()) {
      alert('自分のキャラクターを選択して、相手の共有コードを入力してください')
      return
    }

    const data = charactersData as CharactersData
    const partnerCharCode = partnerCode.split('-')[0]
    const partnerChar = data.characterTypes.find((c) => c.code === partnerCharCode)

    if (!partnerChar) {
      alert('無効な共有コードです')
      return
    }

    const result = getCompatibility(selectedCharacter.code, partnerCharCode)
    setCompatibilityResult({
      ...result,
      partnerName: partnerChar.name,
      partnerIcon: partnerChar.icon,
    })
  }

  const imageMap = characterImages.imageMapping as Record<string, string>

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-accent-pink mx-auto mb-3 sm:mb-4" />
          <h1 className="text-gray-800 text-2xl sm:text-3xl md:text-4xl font-rounded font-bold mb-2">
            相性診断
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            過去に生成したキャラクターと相手の相性をチェック
          </p>
        </div>

        {/* Saved Characters */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-pop-lg p-6 sm:p-8 mb-6">
          <h2 className="text-lg sm:text-xl font-rounded font-bold text-gray-800 mb-4">
            あなたのキャラクター
          </h2>

          {savedCharacters.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                まだキャラクターを生成していません
              </p>
              <button
                onClick={onBack}
                className="bg-accent-pink text-white font-rounded font-bold py-3 px-6 rounded-xl shadow-pop hover:shadow-pop-lg transition-all"
              >
                キャラクターを生成する
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {savedCharacters.map((char) => (
                <div
                  key={char.shareCode}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedCharacter?.shareCode === char.shareCode
                      ? 'border-accent-pink bg-gradient-pastel-pink'
                      : 'border-gray-200 hover:border-accent-pink'
                  }`}
                  onClick={() => setSelectedCharacter(char)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <Image
                        src={`/characters/${imageMap[char.code]}`}
                        alt={char.name}
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-rounded font-bold text-gray-800">
                        {char.name}
                      </h3>
                      <p className="text-sm text-gray-600">{char.subtitle}</p>
                      <p className="text-xs text-gray-500 font-mono mt-1">
                        {char.shareCode}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteCharacter(char.shareCode)
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Compatibility Input */}
        {selectedCharacter && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-pop-lg p-6 sm:p-8 mb-6">
            <h2 className="text-lg sm:text-xl font-rounded font-bold text-gray-800 mb-4">
              相手の共有コードを入力
            </h2>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={partnerCode}
                onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
                placeholder="例: IGYS-A1B2"
                className="flex-1 px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-accent-blue focus:outline-none font-mono text-base"
              />
              <button
                onClick={handleCheckCompatibility}
                className="bg-accent-blue text-white font-rounded font-bold px-6 rounded-xl shadow-pop hover:shadow-pop-lg transition-all flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                診断
              </button>
            </div>

            {/* Result */}
            {compatibilityResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="gradient-pastel-purple rounded-xl p-6 border-2 border-primary-200 border-opacity-30"
              >
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="text-4xl">{selectedCharacter.icon}</span>
                    <span className="text-2xl">×</span>
                    <span className="text-4xl">{compatibilityResult.partnerIcon}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-rounded font-bold text-gray-800 mb-2">
                    {compatibilityResult.message}
                  </h3>
                  <div className="inline-block bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full">
                    <p className="text-3xl sm:text-4xl font-bold text-accent-blue">
                      {compatibilityResult.percentage}%
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {compatibilityResult.details.map((detail: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 bg-white/60 rounded-lg p-3">
                      <span className="text-accent-blue flex-shrink-0">✓</span>
                      <p className="text-sm sm:text-base text-gray-700">{detail}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full bg-white text-gray-600 font-rounded font-bold py-4 px-6 rounded-2xl shadow-pop hover:shadow-pop-lg transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          トップに戻る
        </button>
      </div>
    </div>
  )
}

export default CompatibilityCheck
