'use server';

import { analyzeTextWithGemini7 } from '@/lib/gemini';
import { getOriginalResume } from './upload-resume';

interface AnalysisResult {
  matchRate: number;
  reasons: string;
}

export async function analyzeCompany(companyInfo: string) {
  if (!companyInfo?.trim()) {
    throw new Error('Company information is required');
  }

  try {
    const originalResume = await getOriginalResume();
    if (!originalResume) {
      throw new Error('Resume not found. Please upload your resume first.');
    }

    console.log('Analyzing company match...');
    const result = await analyzeTextWithGemini7(originalResume, companyInfo);

    try {
      // Parse to validate the structure
      const parsed: AnalysisResult = JSON.parse(result);
      if (!parsed || typeof parsed.matchRate !== 'number' || typeof parsed.reasons !== 'string') {
        throw new Error('Invalid analysis result format');
      }
      return result;
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      throw new Error('Failed to process analysis results. Please try again.');
    }
  } catch (error) {
    console.error('Company analysis failed:', error);
    throw error instanceof Error ? error : new Error('An unexpected error occurred');
  }
} 