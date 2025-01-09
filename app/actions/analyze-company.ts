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
        const result1 = result
        .replace(/^[\s\S]*?{/, '{')     // Remove everything before the first {
        .replace(/}[\s\S]*$/, '}')      // Remove everything after the last }
        .replace(/```[a-z]*\s*/g, '')   // Remove any markdown code blocks
        .replace(/^\s+|\s+$/g, '')      // Trim whitespace
        .replace(/'/g, '"')             // Convert single quotes to double quotes
        .replace(/\n\s*/g, '')          // Remove newlines and following spaces
        .replace(/,(\s*[}\]])/g, '$1')  // Remove trailing commas
      
    return result1;
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
} 