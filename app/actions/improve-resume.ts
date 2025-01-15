'use server'

import { analyzeTextWithGemini9 } from '@/lib/gemini'
import { getResume } from './get-resume'

export async function improveResume(formData: FormData) {
  const resume = formData.get('resume')
  if (!resume || typeof resume !== 'string') {
    throw new Error('Resume is required')
  }
  const instruction = formData.get('instruction')
  if (!instruction || typeof instruction !== 'string') {
    throw new Error('Please enter instructions')
  }

  const currentResume = await getResume()
  if (!currentResume) {
    throw new Error('Resume not found')
  }

  const result = await analyzeTextWithGemini9(resume, formData)
  return { message: result, resumeId: currentResume.id }
} 