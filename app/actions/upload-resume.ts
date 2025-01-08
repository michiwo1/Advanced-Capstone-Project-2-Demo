'use server'

import { ImageAnnotatorClient } from '@google-cloud/vision'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const vision = new ImageAnnotatorClient()

export async function uploadResume(formData: FormData) {
  const file = formData.get('resume') as File
  
  if (!file) {
    return { success: false, message: 'ファイルが選択されていません。' }
  }

  try {
    // 1. ファイルをバッファに変換
    const buffer = await file.arrayBuffer()
    const content = Buffer.from(buffer)

    // 2. Vision APIで解析（直接画像データを送信）
    const [result] = await vision.documentTextDetection({
      image: { content }
    })

    // 3. キーワード抽出と保存
    const text = result.fullTextAnnotation?.text || ''
    const keywords = extractKeywords(text)

    // 4. データベースに保存（ファイル名のみ保存）
    await prisma.resume.create({
      data: {
        fileName: file.name,
        gcsPath: '', // GCSは使用しないため空文字列
        keywords: keywords,
        fullText: text
      }
    })

    revalidatePath('/resume-upload')
    return { success: true, message: 'レジュメが正常に処理されました。' }
  } catch (error) {
    console.error('処理エラー:', error)
    return { success: false, message: '処理中にエラーが発生しました。' }
  }
}

function extractKeywords(text: string): string[] {
  const keywordPatterns = [
    /Java|Python|JavaScript|TypeScript|React|Next\.js/gi,
    /AWS|Azure|GCP|Docker|Kubernetes/gi,
    /SQL|NoSQL|PostgreSQL|MySQL|MongoDB/gi,
    /HTML|CSS|Node\.js|Express|Git/gi,
  ]

  const keywords = new Set<string>()
  keywordPatterns.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) {
      matches.forEach(match => keywords.add(match))
    }
  })

  return Array.from(keywords)
}

