import { prisma } from "@/lib/prisma";

export async function getSkills() {
  try {
    const skillsData = await prisma.skillsDatabase.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!skillsData?.skill_name) {
      return [];
    }

    // カンマで区切られたスキルを配列に変換
    const skills = skillsData.skill_name.split(',').map(skill => skill.trim());
    return skills;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
} 