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
            background: 'linear-gradient(135deg, #f472b6 0%, #a855f7 50%, #60a5fa 100%)',
            padding: '28px 36px',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <div style={{ fontSize: '32px', marginRight: '12px' }}>🔥</div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              ワークモンスター診断
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
              background: 'rgba(255, 255, 255, 0.97)',
              borderRadius: '24px',
              padding: '32px 48px',
              gap: '12px',
            }}
          >
            {/* Character Icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '130px',
                height: '130px',
                background: 'linear-gradient(135deg, #f472b6 0%, #a855f7 50%, #60a5fa 100%)',
                borderRadius: '65px',
                fontSize: '72px',
              }}
            >
              {icon}
            </div>

            {/* Character Code Badge */}
            <div
              style={{
                display: 'flex',
                background: 'linear-gradient(135deg, #f472b6 0%, #a855f7 100%)',
                padding: '8px 28px',
                borderRadius: '20px',
              }}
            >
              <span
                style={{
                  fontSize: '26px',
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
                fontSize: '64px',
                fontWeight: 'bold',
                color: '#7c3aed',
                textAlign: 'center',
                lineHeight: 1.1,
              }}
            >
              {characterName}
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: '28px',
                color: '#555',
                textAlign: 'center',
                maxWidth: '800px',
                lineHeight: 1.4,
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
              marginTop: '14px',
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.95)',
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
