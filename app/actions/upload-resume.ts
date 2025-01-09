'use server'

import { analyzeTextWithGemini } from '@/lib/gemini'
import pdfParse from 'pdf-parse/lib/pdf-parse.js'

export async function uploadResume(formData: FormData) {
  const file = formData.get('resume')
  const prompt = formData.get('prompt') as string
  
  if (!file || !(file instanceof File)) {
    return { success: false, message: 'ファイルが選択されていません。' }
  }

  if (!prompt) {
    return { success: false, message: 'プロンプトが入力されていません。' }
  }

  try {
    // PDFファイルをArrayBufferとして読み込む
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // PDFをテキストに変換
    const data = await pdfParse(buffer, {
      max: 0, // ページ制限なし
      version: 'v2.0.550'
    })
    const text = data.text
    
    // Analyze with Gemini
    const analysis = await analyzeTextWithGemini(text, prompt)
    
    return { success: true, message: analysis }
  } catch (error) {
    console.error('処理エラー:', error)
    return { success: false, message: '処理中にエラーが発生しました。PDFの読み込みに失敗した可能性があります。' }
  }
}

