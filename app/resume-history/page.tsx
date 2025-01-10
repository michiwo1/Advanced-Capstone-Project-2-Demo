import { prisma } from '@/lib/prisma'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

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
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">レジュメ分析履歴</h1>
        <Link
          href="/resume"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <span>新しい分析を始める</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      
      <div className="grid gap-4">
        {histories.map((history) => (
          <div
            key={history.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{history.versionName}</h2>
              <time className="text-sm text-gray-500">
                {new Date(history.updatedAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <div className="bg-gray-50 rounded p-4">
                <ReactMarkdown>{history.updatedResume}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {histories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            保存された分析結果はありません
          </div>
        )}
      </div>
    </div>
  )
} 