'use server'

import { analyzeTextWithGemini9 } from '@/lib/gemini'

export async function improveResume(formData: FormData) {
  const instruction = formData.get('instruction')
  if (!instruction || typeof instruction !== 'string') {
    throw new Error('指示を入力してください')
  }

  const result = await analyzeTextWithGemini9(instruction, formData)
  return result
} 