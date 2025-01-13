import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function analyzeTextWithGemini(text: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-thinking-exp-1219' });
  
  const fullPrompt = `
Please generate JSON data in the following format. This JSON is for storing job search criteria. Here's the explanation for each key and its value:

### JSON Format
{
    "job_title": "string (job position)",
    "location": "string (work location. 'Remote' for remote work)",
    "employment_type": "string (e.g., Full-time, Part-time, Contract)",
    "salary_range": "string (e.g., '$70,000 - $90,000')",
    "skills": "list of strings (required skills as comma-separated list)",
    "industry": "string (e.g., IT, Finance)",
    "keywords": "list of strings (search keywords)",
    "exclusion_terms": "list of strings (terms to exclude)",
}

### Requirements
Please generate JSON data based on the following criteria:
- Job Position: Suitable job position for this person
- Location: Suitable work location for this person
- Employment Type: Suitable employment type for this person
- Salary Range: Suitable salary range for this person
- Required Skills: Required skills suitable for this person
- Industry: Suitable industry for this person
- Search Keywords: Search keywords suitable for this person
- Exclusion Terms: Exclusion terms suitable for this person

### Notes
- Strictly follow the JSON format.
- Do not change key names or structure.
- For list values, use comma-separated format.

### Output Example
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

Resume Content:
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
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-thinking-exp-1219' });
  
  const fullPrompt = `
Please analyze my resume below and suggest next career steps. Also, suggest appropriate job positions and roles based on my skills. Please keep the output within 300 characters.

Resume Content:
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
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-thinking-exp-1219' });
  
  const fullPrompt = `
Please analyze the resume below and identify 6 or more missing skills based on current skills and work history. Also, suggest skills needed for the next career step and learning methods or resources (online courses, books, etc.) to acquire them. Please keep the output within 300 characters.

Resume Content:
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
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-thinking-exp-1219' });
  
  const fullPrompt = `
Please output 6 skills needed for this person's career step in dictionary format with skill names and reasons. For each reason, briefly explain the background and benefits of the skill.

### Output Format
{
  "Required Skill for Career Step": "Reason",
  "Required Skill for Career Step": "Reason",
  "Required Skill for Career Step": "Reason",
  "Required Skill for Career Step": "Reason",
  "Required Skill for Career Step": "Reason",
  "Required Skill for Career Step": "Reason"
}

### Notes
- Output 6 skills in dictionary format.
- For each reason, briefly explain the background and benefits of the skill.

### Output Example
{
  "Python": "Versatile programming language for data analysis, web development, and machine learning",
  "JavaScript": "Fundamental programming language for frontend development",
  "React": "Popular library for building modern UIs",
  "Node.js": "JavaScript runtime for efficient server-side development",
  "AWS": "Industry-standard platform for cloud infrastructure",
  "DevOps": "Methods and tools for efficient continuous development and operations"
}

Resume Content:
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
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-thinking-exp-1219' });
  
  const fullPrompt = `
Please calculate the salary range and competitiveness based on the work history and skills from the resume below. Please keep the output within 300 characters.

Resume Content:
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
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-thinking-exp-1219' });
  
  const fullPrompt = `
Instructions:
You are acting as a hiring manager. Please read the resume below and evaluate the following 6 items on a 100-point scale.

1. Work Experience & Job Level
2. Technical Skills & Expertise
3. Achievements & Results
4. Soft Skills & Communication
5. Industry & Domain Knowledge
6. Career Growth & Adaptability

Format:
Please output the results in a dictionary (JSON format).
Keys should be the item names in English, values should be numerical evaluations (integers from 1-100).
Please evaluate strictly.

Output Example (for a 10-year experienced engineer):

{
  "Work Experience & Job Level": 80,
  "Technical Skills & Expertise": 92,
  "Achievements & Results": 86,
  "Soft Skills & Communication": 71,
  "Industry & Domain Knowledge": 83,
  "Career Growth & Adaptability": 90
}

Resume Content:
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

export async function analyzeTextWithGemini7(text: string, company: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-thinking-exp-1219' });
  
  const fullPrompt = `
Please act as a recruitment matching system.

[Instructions]
1. Read the company information and my resume below and analyze how well they match.
2. Output the diagnosis results in **dictionary (JSON format)**.
3. Calculate matchRate based on the percentage of overlapping words between the two texts.
4. Specifically, the output must include the following keys:
   - "matchRate": An integer from 1-100 indicating how well the company and I match.
   - "reasons": A string explaining the basis and reasons for the match rate in detail.

[Company Information]
${company}

[Resume Content]:
${text}

[Output Example]
{
  "matchRate": 85,
  "reasons": "reason"
}
`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Failed to get Gemini response:', error);
    throw error;
  }
} 


export async function analyzeTextWithGemini8(text: string, formData: FormData) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-thinking-exp-1219' });
  const fullPrompt = `
You are an excellent resume improvement advisor. Please improve the resume according to the instructions below.

Note:
- Please output only the improved resume content.

[Instructions]
${formData.get('instruction')}

[Resume Content]
${text}


`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Failed to get Gemini response:', error);
    throw error;
  }
} 

export async function analyzeTextWithGemini9(text: string, formData: FormData) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-thinking-exp-1219' });
  const fullPrompt = `
You are an excellent resume improvement advisor. Please improve the resume according to the instructions below.

Note:
- Please output only the improved resume content.

[Instructions]
${formData.get('instruction')}

[Resume Content]
${text}


`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Failed to get Gemini response:', error);
    throw error;
  }
} 