'use server'

import { analyzeTextWithGemini, analyzeTextWithGemini2, analyzeTextWithGemini3, analyzeTextWithGemini4, analyzeTextWithGemini5, analyzeTextWithGemini6 } from '@/lib/gemini'
import pdfParse from 'pdf-parse/lib/pdf-parse.js'
import { prisma } from '@/lib/prisma'

export async function uploadResume(formData: FormData) {
  const file = formData.get('resume')
  
  if (!file || !(file instanceof File)) {
    return { success: false, message: 'No file selected.' }
  }

  try {
    // Read PDF file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Convert PDF to text
    let text: string
    try {
      const data = await pdfParse(buffer, {
        max: 0,
        version: 'v2.0.550'
      })
      text = data.text
      
      if (!text || text.trim().length === 0) {
        return { success: false, message: 'Could not extract text from PDF. The PDF might be empty or contain no text.' }
      }
    } catch (pdfError) {
      console.error('PDF parsing error:', pdfError)
      return { success: false, message: 'Failed to parse PDF. The file might be corrupted or in an unsupported format.' }
    }
    
    // Analyze with Gemini
    let analysis: string
    try {
      analysis = await analyzeTextWithGemini(text)
      if (!analysis) {
        return { success: false, message: 'Text analysis failed. No response from Gemini API.' }
      }
    } catch (geminiError) {
      console.error('Gemini analysis error:', geminiError)
      return { success: false, message: 'An error occurred during text analysis. Please try again later.' }
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
        return { success: false, message: `Analysis results missing required fields: ${missingFields.join(', ')}` }
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

      // Save resume to database
      const savedResume = await prisma.resume.create({
        data: {
          originalResume: text
        }
      })

      if (!savedResume) {
        throw new Error('Failed to save resume.')
      }
      
      // Save Gemini2 analysis as AiMessage
      const gemini2Analysis = await analyzeTextWithGemini2(text)
      await prisma.aiMessage.create({
        data: {
          content: gemini2Analysis,
          tag: 'job'
        }
      })

      // Save Gemini3 analysis as AiMessage
      const gemini3Analysis = await analyzeTextWithGemini3(text)
      await prisma.aiMessage.create({
        data: {
          content: gemini3Analysis,
          tag: 'skill'
        }
      })

      // Save Gemini4 analysis as AiMessage
      const gemini4Analysis = await analyzeTextWithGemini4(gemini3Analysis)
      await prisma.skillsDatabase.create({
          data: {
            skill_name: gemini4Analysis
          }
        })

      // Save Gemini5 analysis as AiMessage
      const gemini5Analysis = await analyzeTextWithGemini5(text)
      await prisma.aiMessage.create({
        data: {
          content: gemini5Analysis,
          tag: 'market'
        }
      })

      // Save Gemini6 analysis as AiMessage
      const gemini6Analysis = await analyzeTextWithGemini6(text)
      // Remove ``` from response
      const cleanedGemini6Analysis = gemini6Analysis
        .replace(/^[\s\S]*?{/, '{')     // Remove everything before the first {
        .replace(/}[\s\S]*$/, '}')      // Remove everything after the last }
        .replace(/```[a-z]*\s*/g, '')   // Remove any markdown code blocks
        .replace(/^\s+|\s+$/g, '')      // Trim whitespace
        .replace(/'/g, '"')             // Convert single quotes to double quotes
        .replace(/\n\s*/g, '')          // Remove newlines and following spaces
        .replace(/,(\s*[}\]])/g, '$1')  // Remove trailing commas
      
      await prisma.chartData.create({
        data: {
          chart_data: cleanedGemini6Analysis
        }
      })

    } catch (dbError) {
      console.error('Database save error:', dbError)
      if (dbError instanceof SyntaxError) {
        return { success: false, message: 'Failed to parse analysis results JSON.' }
      }
      return { success: false, message: 'An error occurred while saving to database.' }
    }
    
    return { success: true, message: analysis }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, message: 'An unexpected error occurred. Please contact system administrator.' }
  }
}

export async function getOriginalResume(): Promise<string | null> {
  try {
    const latestResume = await prisma.resume.findFirst({
      orderBy: {
        id: 'desc'
      }
    });
    
    return latestResume?.originalResume ?? null;
  } catch (error) {
    console.error('Failed to fetch resume:', error);
    return null;
  }
}

