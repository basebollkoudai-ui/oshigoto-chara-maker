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

        {/* 浮き上がる泡 */}
        <div className="absolute bottom-0 left-[10%] w-12 h-12 bg-white/20 rounded-full blur-sm animate-bubble" style={{ animationDuration: '8s', animationDelay: '0s' }}></div>
        <div className="absolute bottom-0 left-[25%] w-8 h-8 bg-pastel-pink/30 rounded-full blur-sm animate-bubble" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-[45%] w-16 h-16 bg-pastel-blue/25 rounded-full blur-sm animate-bubble" style={{ animationDuration: '12s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-[60%] w-10 h-10 bg-pastel-purple/30 rounded-full blur-sm animate-bubble" style={{ animationDuration: '9s', animationDelay: '3s' }}></div>
        <div className="absolute bottom-0 left-[75%] w-14 h-14 bg-pastel-mint/25 rounded-full blur-sm animate-bubble" style={{ animationDuration: '11s', animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-0 left-[90%] w-9 h-9 bg-pastel-yellow/30 rounded-full blur-sm animate-bubble" style={{ animationDuration: '10s', animationDelay: '4s' }}></div>
        <div className="absolute bottom-0 right-[15%] w-11 h-11 bg-white/15 rounded-full blur-sm animate-bubble" style={{ animationDuration: '13s', animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-0 right-[35%] w-13 h-13 bg-pastel-peach/25 rounded-full blur-sm animate-bubble" style={{ animationDuration: '9.5s', animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8 md:py-12">{/* MV Section - Character Showcase */}
        <div className="text-center mb-12">
          <div className="mb-10 px-2 sm:px-4 flex justify-center">
            <div className="relative w-full max-w-4xl">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
                <Image
                  src="/mv.png"
                  alt="お仕事キャラメーカー - 全16キャラクター"
                  width={1226}
                  height={586}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="mb-8 px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-rounded font-extrabold text-gray-800 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
              <span className="bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue bg-clip-text text-transparent">
                20の質問で
                <br className="sm:hidden" />
                あなたのキャラクターを
                <br className="sm:hidden" />
                診断
              </span>
            </h1>
          </div>

          <Link
            href="/characters"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-white via-white to-white/95 backdrop-blur-md px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-[0_8px_24px_-6px_rgba(0,0,0,0.2)] border-2 border-white hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300 group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-accent-pink via-primary-500 to-accent-blue flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform duration-300">
              <List className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-gray-800 font-rounded font-bold text-sm sm:text-base md:text-lg">
              16種類のワークモンスターを見る
            </span>
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
