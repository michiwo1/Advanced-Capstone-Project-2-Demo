import { prisma } from "@/lib/prisma";

interface SkillsData {
  [key: string]: string;
}

export async function getSkills(): Promise<SkillsData> {
  try {
    const skillsData = await prisma.skillsDatabase.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!skillsData?.skill_name) {
      return {};
    }

    // JSONテキストをオブジェクトに変換
    const cleanedSkills = skillsData.skill_name
      .replace(/^'|'$/g, '')          // Remove single quotes only at the start and end
      .replace(/```[a-z]*\s*/g, '')   // Remove any markdown code blocks
      .replace(/^\s+|\s+$/g, '')      // Trim whitespace
      .replace(/\n\s*/g, '')          // Remove newlines and following spaces
      .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas

    return JSON.parse(cleanedSkills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return {};
  }
} 