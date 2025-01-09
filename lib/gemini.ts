import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function analyzeTextWithGemini(text: string, prompt: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const fullPrompt = `
以下のテキストに対して、与えられた指示に従って分析してください：

テキスト:
${text}

指示:
${prompt}`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Failed to get Gemini response:', error);
    throw error;
  }
} 