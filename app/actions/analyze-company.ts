'use server';

import { analyzeTextWithGemini7 } from '@/lib/gemini';
import { getOriginalResume } from './upload-resume';

export async function analyzeCompany(companyInfo: string) {
  try {
    const originalResume = await getOriginalResume();
    if (!originalResume) {
      throw new Error('Resume not found');
    }

    const result = await analyzeTextWithGemini7(originalResume, companyInfo);
    console.log("1--------------------");
    console.log(result);
    console.log("2--------------------");
    return result;
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
} 