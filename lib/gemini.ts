import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function analyzeTextWithGemini(text: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
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
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
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
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
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
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
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
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
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
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
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
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  
  const fullPrompt = `
Please act as a recruitment matching system.

[Instructions]
1. Read the company information and my resume below and analyze how well they match.
2. You must respond with ONLY a JSON object, nothing else.
3. Calculate matchRate based on the percentage of overlapping words between the two texts.
4. The JSON object must have exactly this structure:
{
  "matchRate": number (1-100),
  "reasons": string
}
5. Do not include any explanations, markdown, or code blocks.
6. The response must be a single line of valid JSON.
7. The matchRate must be a number between 1 and 100.
8. The reasons must be a string explaining the match rate.

[Company Information]
${company}

[Resume Content]:
${text}
`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const responseText = response.text();
    
    console.log('Raw response:', responseText);

    // Step 1: Basic JSON extraction
    let cleanJson = responseText
      .replace(/^[\s\S]*?{/, '{')
      .replace(/}[\s\S]*$/, '}');
    console.log('After basic extraction:', cleanJson);

    // Step 2: Remove markdown and normalize whitespace
    cleanJson = cleanJson
      .replace(/```[a-z]*\s*/g, '')
      .replace(/^\s+|\s+$/g, '')
      .replace(/\r?\n|\r/g, ' ')
      .replace(/\s+/g, ' ');
    console.log('After whitespace normalization:', cleanJson);

    // Step 3: Fix JSON formatting
    cleanJson = cleanJson
      .replace(/'/g, '"')
      .replace(/,\s*([\]}])/g, '$1')
      .replace(/([{,])\s*"([^"]+)"\s*:\s*"([^"]+)"\s*([,}])/g, '$1"$2":"$3"$4')
      .replace(/([{,])\s*"([^"]+)"\s*:\s*(\d+)\s*([,}])/g, '$1"$2":$3$4');
    console.log('After JSON formatting:', cleanJson);

    try {
      // First parsing attempt
      const parsed = JSON.parse(cleanJson);
      
      // Validate structure and types
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid JSON structure');
      }
      if (!('matchRate' in parsed) || !('reasons' in parsed)) {
        throw new Error('Missing required fields in JSON response');
      }
      if (typeof parsed.matchRate !== 'number' || parsed.matchRate < 1 || parsed.matchRate > 100) {
        // Try to convert matchRate to number if it's a string
        if (typeof parsed.matchRate === 'string') {
          const numericRate = parseInt(parsed.matchRate, 10);
          if (!isNaN(numericRate) && numericRate >= 1 && numericRate <= 100) {
            parsed.matchRate = numericRate;
          } else {
            throw new Error('Invalid matchRate value');
          }
        } else {
          throw new Error('Invalid matchRate value');
        }
      }
      if (typeof parsed.reasons !== 'string' || !parsed.reasons.trim()) {
        throw new Error('Invalid reasons value');
      }

      // Return the validated and normalized JSON
      return JSON.stringify({
        matchRate: parsed.matchRate,
        reasons: parsed.reasons.trim()
      });

    } catch (parseError) {
      console.error('Parse error details:', parseError);
      
      // Last resort: try to extract values directly using regex
      try {
        const matchRateMatch = cleanJson.match(/"matchRate"\s*:\s*(\d+)/);
        const reasonsMatch = cleanJson.match(/"reasons"\s*:\s*"([^"]+)"/);
        
        if (matchRateMatch && reasonsMatch) {
          const matchRate = parseInt(matchRateMatch[1], 10);
          const reasons = reasonsMatch[1].trim();
          
          if (matchRate >= 1 && matchRate <= 100 && reasons) {
            return JSON.stringify({
              matchRate,
              reasons
            });
          }
        }
        throw new Error('Could not extract valid values from response');
      } catch (regexError) {
        console.error('Regex extraction failed:', regexError);
        console.error('Final cleaned JSON that failed to parse:', cleanJson);
        throw new Error('Could not parse response into valid JSON format');
      }
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze company match: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
} 


export async function analyzeTextWithGemini8(text: string, formData: FormData) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
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
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
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