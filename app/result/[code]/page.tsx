import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import charactersData from '@/data/characters.json'
import type { CharactersData } from '@/types/quiz'

interface PageProps {
  params: {
    code: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = params
  const data = charactersData as CharactersData
  const character = data.characterTypes.find((c) => c.code === code)

  if (!character) {
    return {
      title: 'お仕事キャラメーカー',
    }
  }

  const siteUrl = 'https://oshigoto-chara-maker.vercel.app'
  const ogImageUrl = `${siteUrl}/api/og-image?code=${encodeURIComponent(
    character.code
  )}&name=${encodeURIComponent(character.name)}&subtitle=${encodeURIComponent(
    character.subtitle
  )}&icon=${encodeURIComponent(character.icon)}`

  return {
    title: `${character.name} - お仕事キャラメーカー`,
    description: `${character.subtitle} | ${character.personality}`,
    openGraph: {
      title: `${character.name} - お仕事キャラメーカー`,
      description: `${character.subtitle}`,
      url: `${siteUrl}/result/${code}`,
      siteName: 'お仕事キャラメーカー',
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
      title: `${character.name} - お仕事キャラメーカー`,
      description: `${character.subtitle}`,
      images: [ogImageUrl],
    },
  }
}

export default function ResultPage({ params }: PageProps) {
  // Redirect to home page - actual results are shown in the app
  redirect('/')
}
