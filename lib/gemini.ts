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

レジュメ本文:
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

レジュメ本文:
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

レジュメ本文:
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

export async function analyzeTextWithGemini4(text: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const fullPrompt = `
「この人のキャリアステップに必要な6つのスキルを以下の形式で、スキル名と理由を辞書型で出力してください。理由には各スキルが必要な背景や利点を簡潔に記載してください。

### 出力形式
{
  "キャリアステップに必要なスキル": "理由",
  "キャリアステップに必要なスキル": "理由",
  "キャリアステップに必要なスキル": "理由",
  "キャリアステップに必要なスキル": "理由",
  "キャリアステップに必要なスキル": "理由",
  "キャリアステップに必要なスキル": "理由"
}


### 注意
- 6つのスキルを辞書型で出力してください。
- 理由は、各スキルが必要な背景や利点を簡潔に記載してください。

### 出力例
{
  "Python": "データ分析、Web開発、機械学習など多用途で使えるプログラミング言語",
  "JavaScript": "フロントエンド開発の基礎となるプログラミング言語",
  "React": "モダンなUIを構築するための人気のあるライブラリ",
  "Node.js": "効率的なサーバーサイド開発を実現するためのJavaScriptランタイム",
  "AWS": "クラウドインフラを構築・運用するための業界標準プラットフォーム",
  "DevOps": "継続的な開発・運用プロセスを効率化するための手法とツール"
}

レジュメ本文:
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

export async function analyzeTextWithGemini5(text: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const fullPrompt = `
以下のレジュメから職歴やスキルに基づいて年収や競争力を算出してください。

レジュメ本文:
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

export async function analyzeTextWithGemini6(text: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const fullPrompt = `
指示:
あなたは採用担当者の役割を担っています。以下のレジュメを読み込み、下記の6項目について100点満点で評価してください。

1. 実務経験・職務レベル
2. 専門スキル・技術力
3. 実績・成果
4. ソフトスキル・コミュニケーション
5. 業界・領域知識
6. キャリア成長度・適応力

形式:
辞書型（JSON形式） のオブジェクトで結果を出力してください。
キーは日本語項目名、値は数値評価（1～100の整数）にしてください。
厳しめに評価してください。



出力例（エンジニア歴10年のイメージ）:

{
  "実務経験・職務レベル": 80,
  "専門スキル・技術力": 92,
  "実績・成果": 86,
  "ソフトスキル・コミュニケーション": 71,
  "業界・領域知識": 83,
  "キャリア成長度・適応力": 90
}


レジュメ本文:
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