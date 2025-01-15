'use server'

import { prisma } from "@/lib/prisma";
import { AiMessage, Tag } from "@prisma/client";
import { Prisma } from "@prisma/client";

export async function getLatestAiMessage(tag: Tag): Promise<AiMessage | null> {
  try {
    const message = await prisma.aiMessage.findFirst({
      where: {
        tag: tag,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return message;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Database error: ${error.code}`, error.message);
    } else {
      console.error('Error fetching AI message:', error);
    }
    throw error; // Re-throw to handle in the UI layer
  }
} 