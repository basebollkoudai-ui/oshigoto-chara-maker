import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Eye,
  Lightbulb,
  Briefcase,
  ArrowLeft,
} from 'lucide-react'
import charactersData from '@/data/characters.json'
import characterImages from '@/data/character-images.json'
import type { CharactersData } from '@/types/quiz'

interface PageProps {
  params: {
    code: string
  }
}

const siteUrl = 'https://oshigoto-chara-maker.vercel.app'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = params
  const data = charactersData as CharactersData
  const character = data.characterTypes.find((c) => c.code === code)

  if (!character) {
    return {
      title: 'ワークモンスター診断',
    }
  }

  const ogImageUrl = `${siteUrl}/api/og-image?code=${encodeURIComponent(
    character.code
  )}&name=${encodeURIComponent(character.name)}&subtitle=${encodeURIComponent(
    character.subtitle
  )}&icon=${encodeURIComponent(character.icon)}`

  return {
    title: `${character.name} - ワークモンスター診断`,
    description: `${character.subtitle} | ${character.personality}`,
    openGraph: {
      title: `${character.name} - ワークモンスター診断`,
      description: `${character.subtitle}`,
      url: `${siteUrl}/result/${code}`,
      siteName: 'ワークモンスター診断',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${character.name} - ${character.subtitle}`,
        },
      ],
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${character.name} - ワークモンスター診断`,
      description: `${character.subtitle}`,
      images: [ogImageUrl],
    },
  }
}

export default function ResultPage({ params }: PageProps) {
  const { code } = params
  const data = charactersData as CharactersData
  const character = data.characterTypes.find((c) => c.code === code)

  if (!character) {
    notFound()
  }

  const imageMap = characterImages.imageMapping as Record<string, string>
  const characterImagePath = imageMap[code] || 'character-01.png'

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">

        {/* Friend's result banner */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-pop p-4 mb-6 flex items-center justify-between gap-3">
          <p className="text-sm sm:text-base font-rounded font-bold text-gray-700">
            👀 友達の診断結果をチェック中！
          </p>
          <Link
            href="/"
            className="flex-shrink-0 bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue text-white font-rounded font-bold py-2 px-4 rounded-full shadow-pop text-xs sm:text-sm hover:shadow-pop-lg transition-all"
          >
            自分も診断する
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-accent-pink mx-auto mb-3 sm:mb-4" />
          <h1 className="text-gray-800 text-2xl sm:text-3xl md:text-4xl font-rounded font-bold mb-2">
            診断結果
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">ワークモンスターが明らかになりました</p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-pop-lg overflow-hidden mb-4 sm:mb-6">
          {/* Character Header */}
          <div className="bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue p-6 sm:p-8 text-center">
            <div className="mb-3 sm:mb-4">
              <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex items-center justify-center p-3 sm:p-4 shadow-pop-lg">
                <Image
                  src={`/characters/${characterImagePath}`}
                  alt={character.name}
                  width={224}
                  height={224}
                  className="rounded-xl sm:rounded-2xl object-contain w-full h-full"
                  priority
                />
              </div>
            </div>
            <div>
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
            </div>
          </div>

          {/* Character Details */}
          <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            {/* Personality */}
            <div className="gradient-pastel-purple rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-rounded font-bold text-gray-800">性格</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {character.personality}
              </p>
            </div>

            {/* Strengths */}
            <div className="gradient-pastel-mint rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-rounded font-bold text-gray-800">長所</h3>
              </div>
              <ul className="space-y-2">
                {character.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="gradient-pastel-peach rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-orange rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-rounded font-bold text-gray-800">短所</h3>
              </div>
              <ul className="space-y-2">
                {character.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hidden Face */}
            <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">裏の顔</h3>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                {character.hiddenFace}
              </p>
            </div>

            {/* Suitable Jobs */}
            <div className="gradient-pastel-blue rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-blue rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-rounded font-bold text-gray-800">向いている職種</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {character.suitableJobs.map((job, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-sm border-2 border-accent-blue border-opacity-20"
                  >
                    <p className="text-sm sm:text-base text-gray-800 font-medium text-center">{job}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Advice */}
            <div className="gradient-pastel-yellow rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-yellow rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-rounded font-bold text-gray-800">アドバイス</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {character.advice}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-3 mb-8">
          <p className="text-white font-rounded font-bold text-lg drop-shadow">
            あなたのワークモンスターは何？
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue text-white font-rounded font-bold py-4 px-8 rounded-2xl shadow-pop-lg hover:shadow-2xl transition-all duration-300 text-base sm:text-lg"
          >
            <Sparkles className="w-5 h-5" />
            自分も診断してみる
          </Link>
        </div>

        {/* Back to top */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-rounded text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            トップに戻る
          </Link>
        </div>

      </div>
    </div>
  )
}
