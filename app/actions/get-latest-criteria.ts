import { prisma } from "@/lib/prisma";

export async function getLatestJobSearchCriteria() {
  try {
    const latestCriteria = await prisma.jobSearchCriteria.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return latestCriteria;
  } catch (error) {
    console.error('Failed to fetch latest job search criteria:', error);
    return null;
  }
} 