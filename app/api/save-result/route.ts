import { NextRequest, NextResponse } from 'next/server'
import { saveDiagnosisResult } from '@/lib/supabase-mock'
import type { DiagnosisResult } from '@/types/quiz'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { characterCode, characterName, scores, answerHistory, aiAdvice } = body

    if (!characterCode || !characterName || !scores || !answerHistory) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to database (mock for now)
    const savedResult = await saveDiagnosisResult({
      characterCode,
      characterName,
      scores,
      answerHistory,
      aiAdvice,
    })

    return NextResponse.json({
      success: true,
      resultId: savedResult.id,
      message: 'Result saved successfully',
    })
  } catch (error) {
    console.error('Error saving result:', error)
    return NextResponse.json(
      {
        error: 'Failed to save result',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
