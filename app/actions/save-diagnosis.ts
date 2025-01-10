'use server'

import { prisma } from '@/lib/prisma'

export async function saveDiagnosis(title: string, matchRate: number, reason: string, link?: string) {
  try {
    const result = await prisma.diagnosisResult.create({
      data: {
        title,
        matchRate,
        reason,
        link,
      },
    })
    return { success: true, data: result }
  } catch (error) {
    console.error('Failed to save diagnosis:', error)
    return { success: false, error: 'Failed to save diagnosis result' }
  }
} 