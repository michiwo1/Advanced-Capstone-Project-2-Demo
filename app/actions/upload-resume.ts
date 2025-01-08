'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { analyzeTextWithGemini, KeywordConfig } from '@/lib/gemini'

export const defaultKeywordConfigs: KeywordConfig[] = [
  {
    category: 'Programming Languages',
    patterns: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'Go']
  },
  {
    category: 'Frameworks',
    patterns: ['React', 'Angular', 'Vue.js', 'Next.js', 'Django', 'Spring']
  },
  {
    category: 'Cloud Services',
    patterns: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes']
  }
];

export async function uploadResume(formData: FormData) {
  const file = formData.get('resume') as File
  const configsJson = formData.get('keywordConfigs') as string
  const keywordConfigs = configsJson ? JSON.parse(configsJson) : defaultKeywordConfigs
  
  if (!file) {
    return { success: false, message: 'ファイルが選択されていません。' }
  }

  try {
    // テキストとして直接読み込む
    const text = await file.text()
    
    // Analyze with Gemini
    const analysis = await analyzeTextWithGemini(text, keywordConfigs)
    
    // Transform the analysis result into a flat array of keywords
    const keywords = Object.values(analysis.keywords).flat() as string[]

    await prisma.resume.create({
      data: {
        fileName: file.name,
        keywords: keywords,
        fullText: text,
        analysis: analysis
      }
    })

    revalidatePath('/resume-upload')
    return { success: true, message: 'レジュメが正常に処理されました。' }
  } catch (error) {
    console.error('処理エラー:', error)
    return { success: false, message: '処理中にエラーが発生しました。' }
  }
}

