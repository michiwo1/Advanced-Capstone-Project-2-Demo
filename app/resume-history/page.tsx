import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ResumeHistoryItem = dynamic(() => import('@/components/resume-history-item'), {
  ssr: false
})

export default async function ResumeHistoryPage() {
  const histories = await prisma.resumeHistory.findMany({
    orderBy: {
      updatedAt: 'desc'
    },
    include: {
      resume: true
    }
  })

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Resume Improvement History</h1>
          <Link
            href="/resume"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
          >
            <span>Improve Your Resume</span>
          </Link>
        </div>
      
        <div className="grid gap-8">
          {histories.map((history) => (
            <Suspense key={history.id} fallback={<div className="h-32 bg-gray-100 rounded-xl animate-pulse" />}>
              <ResumeHistoryItem history={history} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  )
} 