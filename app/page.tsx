'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, Heart, List, Menu, X, Home } from 'lucide-react'
import Quiz from '@/components/Quiz'
import CompatibilityCheck from '@/components/CompatibilityCheck'
import Image from 'next/image'
import Link from 'next/link'

type Mode = 'home' | 'quiz' | 'compatibility'

export default function Home() {
  const [mode, setMode] = useState<Mode>('home')
  const [menuOpen, setMenuOpen] = useState(false)

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

        {/* 浮き上がる泡 - ピンク系 */}
        <div className="absolute bottom-0 left-[3%] w-10 h-10 rounded-full border-2 border-pink-300/60 animate-bubble" style={{ animationDuration: '4.5s', animationDelay: '0s' }}></div>
        <div className="absolute bottom-0 left-[8%] w-16 h-16 rounded-full border-2 border-pink-300/60 animate-bubble" style={{ animationDuration: '5s', animationDelay: '0.3s' }}></div>
        <div className="absolute bottom-0 left-[15%] w-11 h-11 rounded-full border-2 border-pink-400/55 animate-bubble" style={{ animationDuration: '4.8s', animationDelay: '1.2s' }}></div>
        <div className="absolute bottom-0 left-[22%] w-14 h-14 rounded-full border-2 border-pink-300/50 animate-bubble" style={{ animationDuration: '5.2s', animationDelay: '2.1s' }}></div>
        <div className="absolute bottom-0 left-[28%] w-20 h-20 rounded-full border-2 border-pink-400/50 animate-bubble" style={{ animationDuration: '5.5s', animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-0 left-[35%] w-9 h-9 rounded-full border-2 border-pink-300/65 animate-bubble" style={{ animationDuration: '4.3s', animationDelay: '3.1s' }}></div>
        <div className="absolute bottom-0 left-[42%] w-13 h-13 rounded-full border-2 border-pink-400/55 animate-bubble" style={{ animationDuration: '5.1s', animationDelay: '0.9s' }}></div>
        <div className="absolute bottom-0 left-[48%] w-18 h-18 rounded-full border-2 border-pink-300/55 animate-bubble" style={{ animationDuration: '5s', animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-0 left-[55%] w-12 h-12 rounded-full border-2 border-pink-400/60 animate-bubble" style={{ animationDuration: '4.7s', animationDelay: '2.8s' }}></div>
        <div className="absolute bottom-0 left-[62%] w-16 h-16 rounded-full border-2 border-pink-300/50 animate-bubble" style={{ animationDuration: '5.3s', animationDelay: '0.6s' }}></div>
        <div className="absolute bottom-0 left-[68%] w-13 h-13 rounded-full border-2 border-pink-400/60 animate-bubble" style={{ animationDuration: '5.5s', animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-0 left-[75%] w-10 h-10 rounded-full border-2 border-pink-300/55 animate-bubble" style={{ animationDuration: '4.6s', animationDelay: '1.7s' }}></div>
        <div className="absolute bottom-0 left-[82%] w-15 h-15 rounded-full border-2 border-pink-400/50 animate-bubble" style={{ animationDuration: '5.1s', animationDelay: '3.4s' }}></div>
        <div className="absolute bottom-0 left-[88%] w-17 h-17 rounded-full border-2 border-pink-300/50 animate-bubble" style={{ animationDuration: '5s', animationDelay: '0.2s' }}></div>
        <div className="absolute bottom-0 left-[95%] w-11 h-11 rounded-full border-2 border-pink-400/60 animate-bubble" style={{ animationDuration: '4.4s', animationDelay: '2.3s' }}></div>

        {/* 浮き上がる泡 - ブルー系 */}
        <div className="absolute bottom-0 left-[5%] w-12 h-12 rounded-full border-2 border-blue-300/65 animate-bubble" style={{ animationDuration: '5.8s', animationDelay: '1.6s' }}></div>
        <div className="absolute bottom-0 left-[12%] w-9 h-9 rounded-full border-2 border-blue-400/70 animate-bubble" style={{ animationDuration: '5.2s', animationDelay: '0.4s' }}></div>
        <div className="absolute bottom-0 left-[18%] w-12 h-12 rounded-full border-2 border-blue-300/70 animate-bubble" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-[25%] w-16 h-16 rounded-full border-2 border-blue-400/60 animate-bubble" style={{ animationDuration: '6.3s', animationDelay: '2.7s' }}></div>
        <div className="absolute bottom-0 left-[32%] w-10 h-10 rounded-full border-2 border-blue-300/65 animate-bubble" style={{ animationDuration: '5.5s', animationDelay: '0.1s' }}></div>
        <div className="absolute bottom-0 left-[38%] w-14 h-14 rounded-full border-2 border-blue-400/65 animate-bubble" style={{ animationDuration: '6.5s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-[45%] w-11 h-11 rounded-full border-2 border-blue-300/70 animate-bubble" style={{ animationDuration: '5.7s', animationDelay: '3.5s' }}></div>
        <div className="absolute bottom-0 left-[52%] w-15 h-15 rounded-full border-2 border-blue-400/60 animate-bubble" style={{ animationDuration: '6.1s', animationDelay: '1.4s' }}></div>
        <div className="absolute bottom-0 left-[58%] w-16 h-16 rounded-full border-2 border-blue-300/70 animate-bubble" style={{ animationDuration: '6s', animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-0 left-[65%] w-9 h-9 rounded-full border-2 border-blue-400/65 animate-bubble" style={{ animationDuration: '5.4s', animationDelay: '2.2s' }}></div>
        <div className="absolute bottom-0 left-[72%] w-13 h-13 rounded-full border-2 border-blue-300/60 animate-bubble" style={{ animationDuration: '6.2s', animationDelay: '0.7s' }}></div>
        <div className="absolute bottom-0 left-[78%] w-15 h-15 rounded-full border-2 border-blue-400/65 animate-bubble" style={{ animationDuration: '6.5s', animationDelay: '1.2s' }}></div>
        <div className="absolute bottom-0 left-[85%] w-10 h-10 rounded-full border-2 border-blue-300/70 animate-bubble" style={{ animationDuration: '5.9s', animationDelay: '3.0s' }}></div>
        <div className="absolute bottom-0 left-[92%] w-14 h-14 rounded-full border-2 border-blue-400/60 animate-bubble" style={{ animationDuration: '6.4s', animationDelay: '1.9s' }}></div>

        {/* 浮き上がる泡 - パープル系 */}
        <div className="absolute bottom-0 left-[1%] w-14 h-14 rounded-full border-2 border-purple-300/55 animate-bubble" style={{ animationDuration: '5.3s', animationDelay: '2.6s' }}></div>
        <div className="absolute bottom-0 left-[7%] w-10 h-10 rounded-full border-2 border-purple-400/50 animate-bubble" style={{ animationDuration: '5.8s', animationDelay: '0.9s' }}></div>
        <div className="absolute bottom-0 left-[13%] w-14 h-14 rounded-full border-2 border-purple-300/50 animate-bubble" style={{ animationDuration: '5.5s', animationDelay: '0.3s' }}></div>
        <div className="absolute bottom-0 left-[20%] w-9 h-9 rounded-full border-2 border-purple-400/55 animate-bubble" style={{ animationDuration: '5.0s', animationDelay: '3.3s' }}></div>
        <div className="absolute bottom-0 left-[23%] w-18 h-18 rounded-full border-2 border-purple-400/45 animate-bubble" style={{ animationDuration: '6s', animationDelay: '1.8s' }}></div>
        <div className="absolute bottom-0 left-[30%] w-11 h-11 rounded-full border-2 border-purple-300/50 animate-bubble" style={{ animationDuration: '5.6s', animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-0 left-[33%] w-12 h-12 rounded-full border-2 border-purple-300/55 animate-bubble" style={{ animationDuration: '5s', animationDelay: '0.7s' }}></div>
        <div className="absolute bottom-0 left-[40%] w-16 h-16 rounded-full border-2 border-purple-400/45 animate-bubble" style={{ animationDuration: '6.2s', animationDelay: '2.4s' }}></div>
        <div className="absolute bottom-0 left-[43%] w-16 h-16 rounded-full border-2 border-purple-400/50 animate-bubble" style={{ animationDuration: '6.5s', animationDelay: '2.2s' }}></div>
        <div className="absolute bottom-0 left-[50%] w-10 h-10 rounded-full border-2 border-purple-300/55 animate-bubble" style={{ animationDuration: '5.2s', animationDelay: '1.0s' }}></div>
        <div className="absolute bottom-0 left-[53%] w-13 h-13 rounded-full border-2 border-purple-300/48 animate-bubble" style={{ animationDuration: '5.5s', animationDelay: '1.3s' }}></div>
        <div className="absolute bottom-0 left-[60%] w-15 h-15 rounded-full border-2 border-purple-400/52 animate-bubble" style={{ animationDuration: '5.9s', animationDelay: '3.6s' }}></div>
        <div className="absolute bottom-0 left-[63%] w-19 h-19 rounded-full border-2 border-purple-400/52 animate-bubble" style={{ animationDuration: '6s', animationDelay: '0.4s' }}></div>
        <div className="absolute bottom-0 left-[70%] w-11 h-11 rounded-full border-2 border-purple-300/50 animate-bubble" style={{ animationDuration: '5.4s', animationDelay: '2.0s' }}></div>
        <div className="absolute bottom-0 left-[73%] w-15 h-15 rounded-full border-2 border-purple-300/47 animate-bubble" style={{ animationDuration: '5s', animationDelay: '2.8s' }}></div>
        <div className="absolute bottom-0 left-[80%] w-12 h-12 rounded-full border-2 border-purple-400/48 animate-bubble" style={{ animationDuration: '6.1s', animationDelay: '0.6s' }}></div>
        <div className="absolute bottom-0 left-[83%] w-14 h-14 rounded-full border-2 border-purple-400/50 animate-bubble" style={{ animationDuration: '6.5s', animationDelay: '1.6s' }}></div>
        <div className="absolute bottom-0 left-[90%] w-9 h-9 rounded-full border-2 border-purple-300/53 animate-bubble" style={{ animationDuration: '5.1s', animationDelay: '3.9s' }}></div>
        <div className="absolute bottom-0 left-[93%] w-16 h-16 rounded-full border-2 border-purple-300/45 animate-bubble" style={{ animationDuration: '5.5s', animationDelay: '0.2s' }}></div>
        <div className="absolute bottom-0 left-[97%] w-12 h-12 rounded-full border-2 border-purple-400/50 animate-bubble" style={{ animationDuration: '5.7s', animationDelay: '2.9s' }}></div>
      </div>

      {/* ヘッダー */}
      <header className="relative z-20 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* ロゴ（中央） */}
            <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-accent-pink via-primary-500 to-accent-blue flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-rounded font-extrabold bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue bg-clip-text text-transparent">
                ワークモンスター診断
              </h1>
            </div>
            {/* ハンバーガーボタン */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-accent-pink via-primary-500 to-accent-blue shadow-md text-white flex-shrink-0"
              aria-label="メニュー"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ドロワーメニュー */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md shadow-pop-lg border-t border-gray-100 z-30"
            >
              <nav className="max-w-6xl mx-auto px-4 py-3">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => { setMode('home'); setMenuOpen(false) }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 transition-colors text-left"
                    >
                      <Home className="w-5 h-5 text-primary-500" />
                      <span className="font-rounded font-bold text-gray-700">HOME</span>
                    </button>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 transition-colors"
                    >
                      <span className="w-5 h-5 flex items-center justify-center text-primary-500 font-bold text-sm">📋</span>
                      <span className="font-rounded font-bold text-gray-700">利用規約</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 transition-colors"
                    >
                      <span className="w-5 h-5 flex items-center justify-center text-primary-500 font-bold text-sm">🔒</span>
                      <span className="font-rounded font-bold text-gray-700">プライバシーポリシー</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* MV Section - Character Showcase */}
        <div className="text-center mb-12">
          <div className="mb-8 px-2">
            <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-6 sm:px-8 py-3 sm:py-4 shadow-lg mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-rounded font-extrabold bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue bg-clip-text text-transparent leading-tight">
                20の質問で
                <br className="sm:hidden" />
                あなたのキャラクターを
                <br className="sm:hidden" />
                診断
              </h2>
            </div>
          </div>

          <div className="mb-8 px-2 sm:px-4 flex justify-center">
            <div className="relative w-full max-w-3xl">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)]">
                <Image
                  src="/mv.png"
                  alt="ワークモンスター診断 - 全16ワークモンスター"
                  width={1226}
                  height={586}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
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
                  簡単な質問に答えるだけで、あなたの働き方の特徴から、全16種類のワークモンスターの中からぴったりのタイプを診断します。
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
                className="w-full bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue text-white font-rounded font-extrabold py-4 sm:py-5 md:py-6 px-6 sm:px-8 rounded-full text-lg sm:text-xl md:text-2xl shadow-pop-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 border-2 border-white border-opacity-20 animate-pulse-scale hover:animate-none"
              >
                モンスターを生成する
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
