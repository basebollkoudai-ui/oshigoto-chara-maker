import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const characterCode = searchParams.get('code') || 'IGYS'
    const characterName = searchParams.get('name') || '起業家ライオン'
    const subtitle = searchParams.get('subtitle') || '俺についてこい系迷惑上司'
    const icon = searchParams.get('icon') || '🦁'

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '60px',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginRight: '20px',
              }}
            >
              🔥
            </div>
            <div
              style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              仕事モンスター診断
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '32px',
              padding: '60px',
            }}
          >
            {/* Character Icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '180px',
                height: '180px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '90px',
                marginBottom: '40px',
                fontSize: '96px',
              }}
            >
              {icon}
            </div>

            {/* Character Code Badge */}
            <div
              style={{
                display: 'flex',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '12px 32px',
                borderRadius: '24px',
                marginBottom: '24px',
              }}
            >
              <span
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'white',
                  letterSpacing: '4px',
                }}
              >
                {characterCode}
              </span>
            </div>

            {/* Character Name */}
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: '#667eea',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              {characterName}
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: '32px',
                color: '#666',
                textAlign: 'center',
                maxWidth: '800px',
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '40px',
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            建前はもういい。本音で答えろ。
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
