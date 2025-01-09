import { prisma } from "@/lib/prisma";

export async function getLatestAiMessage() {
  try {
    const latestMessage = await prisma.aiMessage.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return latestMessage;
  } catch (error) {
    console.error('Error fetching latest AI message:', error);
    return null;
  }
} 