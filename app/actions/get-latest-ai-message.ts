'use server'

import { prisma } from "@/lib/prisma";
import { Tag } from "@prisma/client";

export async function getLatestAiMessage(tag: Tag) {
  const message = await prisma.aiMessage.findFirst({
    where: {
      tag: tag,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return message;
} 