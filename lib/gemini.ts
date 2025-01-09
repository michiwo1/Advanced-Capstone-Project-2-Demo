import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function analyzeTextWithGemini(text: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const fullPrompt = `
以下の形式でJSONデータを生成してください。このJSONは、求人検索条件を保存するためのものです。各キーとその値の説明は以下の通りです。

### JSON形式
{
    "job_title": "文字列 (求人の職種)",
    "location": "文字列 (勤務地。リモートの場合は 'Remote')",
    "employment_type": "文字列 (雇用形態。例: Full-time, Part-time, Contract)",
    "salary_range": "文字列 (給与範囲。例: '$70,000 - $90,000')",
    "skills": "文字列のリスト (必須スキルをカンマ区切りでリスト化)",
    "industry": "文字列 (業界情報。例: IT, Finance)",
    "keywords": "文字列のリスト (検索用キーワード)",
    "exclusion_terms": "文字列のリスト (除外するキーワード)",
}

### 要求内容
次の条件に基づいてJSONデータを生成してください：
- 求人の職種: この人にあった求人の職種
- 勤務地: この人にあった勤務地
- 雇用形態: この人にあった雇用形態
- 給与範囲: この人にあった給与範囲
- 必須スキル: この人にあった必須スキル
- 業界情報: この人にあった業界情報
- 検索用キーワード: この人にあった検索用キーワード
- 除外キーワード: この人にあった除外キーワード

### 注意
- JSON形式に厳密に従ってください。
- キー名や構造を変更しないでください。
- 値がリスト形式の場合はカンマ区切りでリスト化してください。

### 出力例
{
    "job_title": "Data Scientist",
    "location": "Remote",
    "employment_type": "Full-time",
    "salary_range": "$100,000 - $120,000",
    "skills": "Python, Machine Learning, SQL",
    "industry": "IT",
    "keywords": "AI, Deep Learning",
    "exclusion_terms": "Junior, Internship",
}

テキスト:
${text}`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Failed to get Gemini response:', error);
    throw error;
  }
} 

export async function analyzeTextWithGemini2(text: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const fullPrompt = `
以下の私のレジュメを解析し、次のキャリアステップに関する提案をしてください。また、私のスキルに基づいて適切な職種や役割をいくつか挙げてください。

テキスト:
${text}`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Failed to get Gemini response:', error);
    throw error;
  }
} 

export async function analyzeTextWithGemini3(text: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const fullPrompt = `
以下のレジュメを解析し、現在のスキルや職歴を基に不足しているスキルを特定してください。また、次のキャリアステップに必要なスキルと、それを補うための学習方法やリソース（オンラインコースや書籍など）も提案してください。

テキスト:
${text}`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Failed to get Gemini response:', error);
    throw error;
  }
} 