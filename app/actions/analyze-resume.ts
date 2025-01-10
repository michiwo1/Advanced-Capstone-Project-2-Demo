'use server'

import { revalidatePath } from 'next/cache'

export async function analyzeResume(formData: FormData) {
  const instruction = formData.get('instruction')
  
  if (!instruction || typeof instruction !== 'string') {
    throw new Error('指示を入力してください')
  }

  // TODO: AIモデルとの連携処理を実装
  console.log('AI指示:', instruction)

  revalidatePath('/resume')
  return { message: '指示を受け付けました' }
} 