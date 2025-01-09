'use server'

import { analyzeTextWithGemini, analyzeTextWithGemini2, analyzeTextWithGemini3 } from '@/lib/gemini'
import pdfParse from 'pdf-parse/lib/pdf-parse.js'
import { prisma } from '@/lib/prisma'

export async function uploadResume(formData: FormData) {
  const file = formData.get('resume')
  
  if (!file || !(file instanceof File)) {
    return { success: false, message: 'ファイルが選択されていません。' }
  }

  try {
    // PDFファイルをArrayBufferとして読み込む
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // PDFをテキストに変換
    let text: string
    try {
      const data = await pdfParse(buffer, {
        max: 0,
        version: 'v2.0.550'
      })
      text = data.text
      
      if (!text || text.trim().length === 0) {
        return { success: false, message: 'PDFからテキストを抽出できませんでした。PDFが空か、テキストが含まれていない可能性があります。' }
      }
    } catch (pdfError) {
      console.error('PDF解析エラー:', pdfError)
      return { success: false, message: 'PDFの解析に失敗しました。PDFファイルが破損しているか、サポートされていない形式の可能性があります。' }
    }
    
    // Analyze with Gemini
    let analysis: string
    try {
      analysis = await analyzeTextWithGemini(text)
      if (!analysis) {
        return { success: false, message: 'テキスト分析に失敗しました。Gemini APIからの応答がありませんでした。' }
      }
    } catch (geminiError) {
      console.error('Gemini分析エラー:', geminiError)
      return { success: false, message: 'テキスト分析中にエラーが発生しました。しばらく時間をおいて再度お試しください。' }
    }
    
    // Parse JSON and save to database
    try {
      // Clean up the response by removing markdown code blocks and unnecessary characters
      const cleanedAnalysis = analysis
        .replace(/^[\s\S]*?{/, '{')     // Remove everything before the first {
        .replace(/}[\s\S]*$/, '}')      // Remove everything after the last }
        .replace(/```[a-z]*\s*/g, '')   // Remove any markdown code blocks
        .replace(/^\s+|\s+$/g, '')      // Trim whitespace
        .replace(/'/g, '"')             // Convert single quotes to double quotes
        .replace(/\n\s*/g, '')          // Remove newlines and following spaces
        .replace(/,(\s*[}\]])/g, '$1')  // Remove trailing commas
      
      const parsedAnalysis = JSON.parse(cleanedAnalysis)

      // Validate required fields
      const requiredFields = ['job_title', 'location', 'employment_type', 'salary_range', 'skills', 'industry', 'keywords', 'exclusion_terms']
      const missingFields = requiredFields.filter(field => !parsedAnalysis[field])
      
      if (missingFields.length > 0) {
        return { success: false, message: `分析結果に必要なフィールドが不足しています: ${missingFields.join(', ')}` }
      }
      
      await prisma.jobSearchCriteria.create({
        data: {
          jobTitle: parsedAnalysis.job_title,
          location: parsedAnalysis.location,
          employmentType: parsedAnalysis.employment_type,
          salaryRange: parsedAnalysis.salary_range,
          skills: parsedAnalysis.skills,
          industry: parsedAnalysis.industry,
          keywords: parsedAnalysis.keywords,
          exclusionTerms: parsedAnalysis.exclusion_terms
        }
      })

      // レジュメをデータベースに保存
      const savedResume = await prisma.resume.create({
        data: {
          originalResume: text
        }
      })

      if (!savedResume) {
        throw new Error('レジュメの保存に失敗しました。')
      }
      
      // Gemini2での分析結果をAiMessageとして保存
      const gemini2Analysis = await analyzeTextWithGemini2(text)
      await prisma.aiMessage.create({
        data: {
          content: gemini2Analysis,
          tag: 'job'
        }
      })

      // Gemini3での分析結果をAiMessageとして保存
      const gemini3Analysis = await analyzeTextWithGemini3(text)
      await prisma.aiMessage.create({
        data: {
          content: gemini3Analysis,
          tag: 'skill'
        }
      })
    } catch (dbError) {
      console.error('データベース保存エラー:', dbError)
      if (dbError instanceof SyntaxError) {
        return { success: false, message: '分析結果のJSONパースに失敗しました。' }
      }
      return { success: false, message: 'データベースへの保存中にエラーが発生しました。' }
    }
    
    return { success: true, message: analysis }
  } catch (error) {
    console.error('予期せぬエラー:', error)
    return { success: false, message: '予期せぬエラーが発生しました。システム管理者にお問い合わせください。' }
  }
}

