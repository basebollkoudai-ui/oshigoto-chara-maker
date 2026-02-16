import type { Metadata } from 'next'
import { M_PLUS_Rounded_1c, Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ['400', '500', '700', '800'],
  subsets: ['latin'],
  variable: '--font-rounded',
  display: 'swap',
})

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-noto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'お仕事キャラメーカー - あなたは何系キャラクター？',
  description: '建前はもういい。本音で答えろ。あなたの真の仕事スタイルを12種類のお仕事キャラクターに分類します。',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: 'お仕事キャラメーカー - あなたは何系キャラクター？',
    description: '建前はもういい。本音で答えろ。あなたの真の仕事スタイルを12種類のお仕事キャラクターに分類します。',
    url: 'https://oshigoto-chara-maker.vercel.app',
    siteName: 'お仕事キャラメーカー',
    images: [
      {
        url: 'https://oshigoto-chara-maker.vercel.app/mv.png',
        width: 1472,
        height: 704,
        alt: 'お仕事キャラメーカー - 全12キャラクター',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'お仕事キャラメーカー - あなたは何系キャラクター？',
    description: '建前はもういい。本音で答えろ。あなたの真の仕事スタイルを12種類のお仕事キャラクターに分類します。',
    images: ['https://oshigoto-chara-maker.vercel.app/mv.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${mPlusRounded.variable} ${notoSansJP.variable} font-noto`}>
        {children}
      </body>
    </html>
  )
}
