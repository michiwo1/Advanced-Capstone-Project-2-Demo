'use server'

import { revalidatePath } from 'next/cache'
import { analyzeTextWithGemini8 } from '@/lib/gemini'
import { getResume } from './get-resume'

export async function analyzeResume(formData: FormData) {
  // Add a small delay to make loading state noticeable
  await new Promise(resolve => setTimeout(resolve, 1000))

  const instruction = formData.get('instruction')
  
  if (!instruction || typeof instruction !== 'string') {
    throw new Error('指示を入力してください')
  }

  const resume = await getResume()
  if (!resume) {
    throw new Error('レジュメが見つかりません')
  }

  const result = await analyzeTextWithGemini8(resume.originalResume, formData)
  
  revalidatePath('/resume')
  return { message: result }
} 