import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { answerHistory, characterCode, characterName } = body

    if (!answerHistory || !characterCode || !characterName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // APIキーの確認
    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // 回答履歴を整形
    const answersContext = answerHistory
      .map((answer: any, index: number) => {
        return `Q${index + 1}: ${answer.question}\n回答: ${answer.selectedAnswer}`
      })
      .join('\n\n')

    // Claudeに送るプロンプト
    const prompt = `あなたはキャリアコンサルタントであり、辛口だが本質的なアドバイスをする専門家です。

以下のユーザーの診断結果と回答履歴を分析して、「このユーザーの隠れた才能」と「明日から会社を辞めずに生き抜くための辛口な助言」を200文字程度で生成してください。

【診断結果】
タイプコード: ${characterCode}
タイプ名: ${characterName}

【ユーザーの回答履歴】
${answersContext}

【出力形式】
- 毒舌だが愛のある口調で
- ユーザーの回答パターンから見える「隠れた才能」を1つ指摘
- 会社を辞めずに明日から実践できる具体的なアドバイスを1つ
- 200文字以内で簡潔に
- 「〜です」「〜ます」調ではなく、「〜だ」「〜である」調で
- 絵文字は使わない

例：
「あなたの回答を見る限り、リスクを取らない割に不満は多い典型的なタイプだ。だが、その慎重さは計画力の裏返しでもある。明日からできること？朝イチで上司に「改善案」を1つ提出しろ。文句を言うだけの人間から、解決策を出す人間になれ。それだけで評価は変わる。」

では、このユーザーへの超パーソナライズされた裏のアドバイスを生成してください。`

    // Streaming response
    const stream = await anthropic.messages.stream({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    // ReadableStreamを作成
    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const text = event.delta.text
              controller.enqueue(encoder.encode(text))
            }
          }
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          controller.error(error)
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to generate advice',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
