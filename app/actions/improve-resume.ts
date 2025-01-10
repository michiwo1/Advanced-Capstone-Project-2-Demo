'use server'

import { analyzeTextWithGemini9 } from '@/lib/gemini'
import { getResume } from './get-resume'

export async function improveResume(formData: FormData) {
  const resume = formData.get('resume')
  if (!resume || typeof resume !== 'string') {
    throw new Error('履歴書が必要です')
  }
  const instruction = formData.get('instruction')
  if (!instruction || typeof instruction !== 'string') {
    throw new Error('指示を入力してください')
  }

  const currentResume = await getResume()
  if (!currentResume) {
    throw new Error('レジュメが見つかりません')
  }

  const result = await analyzeTextWithGemini9(resume, formData)
  return { message: result, resumeId: currentResume.id }
} 