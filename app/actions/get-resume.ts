import { prisma } from '@/lib/prisma'

export async function getResume() {
  try {
    const resume = await prisma.resume.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return resume
  } catch (error) {
    console.error('Failed to fetch resume:', error)
    throw new Error('Failed to fetch resume')
  }
} 