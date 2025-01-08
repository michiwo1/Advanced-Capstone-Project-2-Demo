import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export interface KeywordConfig {
  category: string;
  patterns: string[];
}

export async function analyzeTextWithGemini(resumeText: string, configs: KeywordConfig[]) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `
Please analyze the following resume text and extract relevant information based on these categories:
${configs.map(config => `${config.category}: Look for ${config.patterns.join(', ')}`).join('\n')}

Resume text:
${resumeText}

Please respond in the following JSON format:
{
  "keywords": {
    "categoryName": ["found", "keywords"],
  }
}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const responseText = response.text();
  
  try {
    return JSON.parse(responseText);
  } catch (error) {
    console.error('Failed to parse Gemini response:', error);
    return { keywords: {} };
  }
} 