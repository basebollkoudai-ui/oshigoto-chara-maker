/**
 * Supabase Mock Database Structure
 *
 * This file defines the database schema for storing diagnosis results.
 * When you're ready to integrate with actual Supabase, replace this mock
 * with the real Supabase client.
 */

import type { DiagnosisResult } from '@/types/quiz'

/**
 * Table: shinden_result
 *
 * Stores diagnosis results from users
 *
 * Schema:
 * - id: uuid (primary key, auto-generated)
 * - character_code: varchar (e.g., "IGYS", "STAS")
 * - character_name: varchar (e.g., "起業家ライオン")
 * - scores: jsonb { actionStyle, socialStyle, motivation, thinking }
 * - answer_history: jsonb (array of answer objects)
 * - ai_advice: text (AI-generated personalized advice)
 * - created_at: timestamp with time zone (auto-generated)
 * - user_ip: varchar (optional, for analytics)
 * - user_agent: text (optional, for analytics)
 */

// Mock in-memory storage (replace with actual Supabase later)
const mockDatabase: DiagnosisResult[] = []

/**
 * Save diagnosis result to database (MOCK)
 *
 * @param result - The diagnosis result to save
 * @returns Promise with the saved result including generated ID
 */
export async function saveDiagnosisResult(
  result: Omit<DiagnosisResult, 'id' | 'createdAt'>
): Promise<DiagnosisResult> {
  // In production, this would be:
  // const { data, error } = await supabase
  //   .from('shinden_result')
  //   .insert({
  //     character_code: result.characterCode,
  //     character_name: result.characterName,
  //     scores: result.scores,
  //     answer_history: result.answerHistory,
  //     ai_advice: result.aiAdvice,
  //   })
  //   .select()
  //   .single()

  // Mock implementation
  const savedResult: DiagnosisResult = {
    id: generateMockId(),
    ...result,
    createdAt: new Date().toISOString(),
  }

  mockDatabase.push(savedResult)

  console.log('📊 Mock: Saved diagnosis result:', {
    id: savedResult.id,
    characterCode: savedResult.characterCode,
    characterName: savedResult.characterName,
  })

  return savedResult
}

/**
 * Get diagnosis result by ID (MOCK)
 *
 * @param id - The result ID
 * @returns Promise with the result or null if not found
 */
export async function getDiagnosisResultById(
  id: string
): Promise<DiagnosisResult | null> {
  // In production:
  // const { data, error } = await supabase
  //   .from('shinden_result')
  //   .select('*')
  //   .eq('id', id)
  //   .single()

  const result = mockDatabase.find((r) => r.id === id)
  return result || null
}

/**
 * Get all diagnosis results (MOCK - for admin/analytics)
 *
 * @param limit - Maximum number of results to return
 * @returns Promise with array of results
 */
export async function getAllDiagnosisResults(
  limit = 100
): Promise<DiagnosisResult[]> {
  // In production:
  // const { data, error } = await supabase
  //   .from('shinden_result')
  //   .select('*')
  //   .order('created_at', { ascending: false })
  //   .limit(limit)

  return mockDatabase.slice(-limit).reverse()
}

/**
 * Get statistics by character type (MOCK)
 *
 * @returns Promise with character type distribution
 */
export async function getCharacterTypeStats(): Promise<
  Record<string, number>
> {
  // In production:
  // const { data, error } = await supabase
  //   .from('shinden_result')
  //   .select('character_code')

  const stats: Record<string, number> = {}
  mockDatabase.forEach((result) => {
    stats[result.characterCode] = (stats[result.characterCode] || 0) + 1
  })

  return stats
}

/**
 * Generate a mock UUID
 */
function generateMockId(): string {
  return `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * SQL Migration for Supabase (for reference)
 *
 * Run this in your Supabase SQL editor when ready to deploy:
 *
 * ```sql
 * -- Create shinden_result table
 * CREATE TABLE shinden_result (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   character_code VARCHAR(10) NOT NULL,
 *   character_name VARCHAR(100) NOT NULL,
 *   scores JSONB NOT NULL,
 *   answer_history JSONB NOT NULL,
 *   ai_advice TEXT,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   user_ip VARCHAR(45),
 *   user_agent TEXT
 * );
 *
 * -- Create index on character_code for analytics
 * CREATE INDEX idx_shinden_result_character_code
 *   ON shinden_result(character_code);
 *
 * -- Create index on created_at for time-based queries
 * CREATE INDEX idx_shinden_result_created_at
 *   ON shinden_result(created_at DESC);
 *
 * -- Enable Row Level Security (RLS)
 * ALTER TABLE shinden_result ENABLE ROW LEVEL SECURITY;
 *
 * -- Policy: Anyone can insert (anonymous users can save results)
 * CREATE POLICY "Anyone can insert results"
 *   ON shinden_result FOR INSERT
 *   WITH CHECK (true);
 *
 * -- Policy: Only authenticated users can view all results (for admin)
 * CREATE POLICY "Authenticated users can view all"
 *   ON shinden_result FOR SELECT
 *   USING (auth.role() = 'authenticated');
 *
 * -- Policy: Anyone can view their own result by ID (for sharing)
 * CREATE POLICY "Anyone can view by ID"
 *   ON shinden_result FOR SELECT
 *   USING (true);
 * ```
 */

/**
 * Example Supabase Client Setup (for when you're ready to integrate)
 *
 * 1. Install Supabase:
 *    npm install @supabase/supabase-js
 *
 * 2. Create lib/supabase.ts:
 *    ```typescript
 *    import { createClient } from '@supabase/supabase-js'
 *
 *    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
 *    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
 *
 *    export const supabase = createClient(supabaseUrl, supabaseAnonKey)
 *    ```
 *
 * 3. Update .env.local:
 *    NEXT_PUBLIC_SUPABASE_URL=your_project_url
 *    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
 *
 * 4. Replace mock functions with real Supabase calls
 */

export default {
  saveDiagnosisResult,
  getDiagnosisResultById,
  getAllDiagnosisResults,
  getCharacterTypeStats,
}
