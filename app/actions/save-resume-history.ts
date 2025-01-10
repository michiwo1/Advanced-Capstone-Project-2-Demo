'use server'

import { prisma } from '@/lib/prisma'

export async function saveResumeHistory(resumeId: string, versionName: string, updatedResume: string) {
  console.log('saveResumeHistory', resumeId, versionName, updatedResume)
  try {
    const history = await prisma.resumeHistory.create({
      data: {
        resumeId,
        versionName,
        updatedResume,
      },
    })
    return { success: true, history }
  } catch (error) {
    console.error('Failed to save resume history:', error)
    return { success: false, error: 'Failed to save resume history' }
  }
} 