'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import charactersData from '@/data/characters.json'
import characterImages from '@/data/character-images.json'
import type { CharactersData } from '@/types/quiz'

export default function CharactersPage() {
  const [expandedCharacter, setExpandedCharacter] = useState<string | null>(null)
  const data = charactersData as CharactersData
  const imageMap = characterImages.imageMapping as Record<string, string>

  const toggleCharacter = (code: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setExpandedCharacter(prevCode => prevCode === code ? null : code)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-gray-800 text-3xl sm:text-4xl md:text-5xl font-rounded font-bold mb-3">
            全12種類のお仕事キャラクター
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-6">
            あなたはどのキャラクターになるかな？
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-primary-600 font-rounded font-bold py-3 px-6 rounded-full shadow-pop hover:shadow-pop-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            トップに戻る
          </Link>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {data.characterTypes.map((character) => (
            <div
              key={character.code}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-pop-lg overflow-hidden"
            >
              {/* Character Header */}
              <button
                onClick={(e) => toggleCharacter(character.code, e)}
                className="w-full bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue p-4 sm:p-6 text-left hover:opacity-95 transition-opacity cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center p-2 flex-shrink-0">
                    <Image
                      src={`/characters/${imageMap[character.code]}`}
                      alt={character.name}
                      width={96}
                      height={96}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
                      <span className="text-white font-mono font-bold text-sm">
                        {character.code}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-rounded font-bold text-white mb-1">
                      {character.name}
                    </h2>
                    <p className="text-sm sm:text-base text-white/90">
                      {character.subtitle}
                    </p>
                  </div>
                  <div className="text-white p-2 flex-shrink-0">
                    {expandedCharacter === character.code ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </div>
                </div>
              </button>

              {/* Character Details (Expandable) */}
              {expandedCharacter === character.code && (
                <div className="p-4 sm:p-6 space-y-4">
                  {/* Personality */}
                  <div className="gradient-pastel-purple rounded-xl p-4">
                    <h3 className="font-rounded font-bold text-gray-800 mb-2 text-sm sm:text-base">
                      性格
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {character.personality}
                    </p>
                  </div>

                  {/* Strengths */}
                  <div className="gradient-pastel-mint rounded-xl p-4">
                    <h3 className="font-rounded font-bold text-gray-800 mb-2 text-sm sm:text-base">
                      強み
                    </h3>
                    <ul className="space-y-1">
                      {character.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm sm:text-base">
                          <span className="text-green-600 flex-shrink-0">✓</span>
                          <span className="text-gray-700">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="gradient-pastel-peach rounded-xl p-4">
                    <h3 className="font-rounded font-bold text-gray-800 mb-2 text-sm sm:text-base">
                      苦手なこと
                    </h3>
                    <ul className="space-y-1">
                      {character.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm sm:text-base">
                          <span className="text-orange-600 flex-shrink-0">!</span>
                          <span className="text-gray-700">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suitable Jobs */}
                  <div className="gradient-pastel-blue rounded-xl p-4">
                    <h3 className="font-rounded font-bold text-gray-800 mb-2 text-sm sm:text-base">
                      向いている仕事
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {character.suitableJobs.map((job, index) => (
                        <span
                          key={index}
                          className="bg-white/70 px-3 py-1 rounded-full text-xs sm:text-sm text-gray-700 font-medium"
                        >
                          {job}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue text-white font-rounded font-bold py-4 px-8 rounded-full shadow-pop-lg hover:shadow-2xl transition-all text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            診断を始める
          </Link>
        </div>
      </div>
    </div>
  )
}
