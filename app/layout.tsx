import type { Metadata } from 'next'
import { M_PLUS_Rounded_1c, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'

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
  metadataBase: new URL('https://oshigoto-chara-maker.vercel.app'),
  title: 'ワークモンスター診断 - あなたは何系キャラクター？',
  description: '建前はもういい。本音で答えろ。あなたの真の仕事スタイルを16種類のワークモンスターに分類します。',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: 'ワークモンスター診断 - あなたは何系キャラクター？',
    description: '建前はもういい。本音で答えろ。あなたの真の仕事スタイルを16種類のワークモンスターに分類します。',
    url: 'https://oshigoto-chara-maker.vercel.app',
    siteName: 'ワークモンスター診断',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'ワークモンスター診断',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ワークモンスター診断 - あなたは何系キャラクター？',
    description: '建前はもういい。本音で答えろ。あなたの真の仕事スタイルを16種類のワークモンスターに分類します。',
    images: ['/twitter-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${mPlusRounded.variable} ${notoSansJP.variable} font-noto flex flex-col min-h-screen`}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
