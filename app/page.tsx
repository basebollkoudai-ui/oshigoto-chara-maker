'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, Heart, List } from 'lucide-react'
import Quiz from '@/components/Quiz'
import CompatibilityCheck from '@/components/CompatibilityCheck'
import Image from 'next/image'
import Link from 'next/link'

type Mode = 'home' | 'quiz' | 'compatibility'

export default function Home() {
  const [mode, setMode] = useState<Mode>('home')

  if (mode === 'quiz') {
    return <Quiz />
  }

  if (mode === 'compatibility') {
    return <CompatibilityCheck onBack={() => setMode('home')} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue relative overflow-hidden">
      {/* 背景の装飾 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 md:left-10 w-24 h-24 md:w-32 md:h-32 bg-pastel-yellow rounded-full opacity-50 blur-3xl animate-float"></div>
        <div className="absolute top-40 right-5 md:right-20 w-32 h-32 md:w-40 md:h-40 bg-pastel-mint rounded-full opacity-50 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-28 h-28 md:w-36 md:h-36 bg-pastel-peach rounded-full opacity-50 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-5 md:right-10 w-20 h-20 md:w-28 md:h-28 bg-pastel-blue rounded-full opacity-50 blur-3xl animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-5 md:left-20 w-20 h-20 md:w-24 md:h-24 bg-accent-pink rounded-full opacity-30 blur-2xl animate-pulse-soft"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 md:w-32 md:h-32 bg-primary-300 rounded-full opacity-30 blur-2xl animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8 md:py-12">{/* MV Section - Character Showcase */}
        <div className="text-center mb-12">
          <div className="mb-8 px-4 flex justify-center">
            <Image
              src="/mv.png"
              alt="お仕事キャラメーカー - 全16キャラクター"
              width={1472}
              height={704}
              className="rounded-3xl shadow-pop-lg w-full max-w-4xl h-auto object-contain"
              priority
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rounded font-extrabold mb-4 leading-tight px-2">
            <span className="bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue bg-clip-text text-transparent drop-shadow-lg">
              お仕事キャラメーカー
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-rounded font-bold text-gray-800 mb-2 drop-shadow-sm px-2">
            あなたに合った仕事を見つけよう
          </p>

          <Link
            href="/characters"
            className="inline-block bg-white/70 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-pop border-2 border-white/80 mx-2 hover:bg-white/90 transition-all hover:shadow-pop-lg"
          >
            <p className="text-gray-700 font-medium text-sm sm:text-base flex items-center gap-2">
              <List className="w-4 h-4 sm:w-5 sm:h-5" />
              16種類のお仕事キャラクターから診断
            </p>
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl md:rounded-4xl shadow-pop-lg p-6 sm:p-8 md:p-12 border-2 border-white/50">

            {/* Introduction */}
            <div className="mb-8">
              <div className="gradient-pastel-purple rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 space-y-3 md:space-y-4 border-2 border-primary-200 border-opacity-30 shadow-pop">
                <p className="text-gray-800 font-rounded font-bold text-lg sm:text-xl">
                  あなたに合った仕事を見つけよう 💭
                </p>
                <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">
                  簡単な質問に答えるだけで、あなたの働き方の特徴から、全16種類のお仕事キャラクターの中からぴったりのタイプを診断します。
                </p>
                <div className="space-y-2 md:space-y-3 text-gray-700 text-sm sm:text-base">
                  <p className="flex items-center font-medium">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-accent-pink rounded-full mr-2 sm:mr-3 shadow-sm flex-shrink-0"></span>
                    質問は全20問
                  </p>
                  <p className="flex items-center font-medium">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-accent-blue rounded-full mr-2 sm:mr-3 shadow-sm flex-shrink-0"></span>
                    所要時間: 約3分
                  </p>
                  <p className="flex items-center font-medium">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-accent-yellow rounded-full mr-2 sm:mr-3 shadow-sm flex-shrink-0"></span>
                    直感で答えてみてください
                  </p>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm italic mt-3 md:mt-4 bg-white bg-opacity-60 rounded-xl md:rounded-2xl p-2.5 sm:p-3">
                  素直な気持ちで答えていただくと、より正確な診断結果が得られます 💫
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => setMode('quiz')}
                className="w-full bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue text-white font-rounded font-extrabold py-4 sm:py-5 md:py-6 px-6 sm:px-8 rounded-full text-lg sm:text-xl md:text-2xl shadow-pop-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 border-2 border-white border-opacity-20"
              >
                キャラクターを生成する
                <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              <button
                onClick={() => setMode('compatibility')}
                className="w-full bg-white text-primary-600 font-rounded font-extrabold py-4 sm:py-5 md:py-6 px-6 sm:px-8 rounded-full text-lg sm:text-xl md:text-2xl shadow-pop-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 border-2 border-primary-200"
              >
                相性診断をする
                <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-gray-500 text-xs sm:text-sm mt-4 sm:mt-6">
              ※ この診断結果はエンターテイメント目的です
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
