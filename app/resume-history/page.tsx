import { prisma } from '@/lib/prisma'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import PDFExportButton from '@/components/pdf-export-button'

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
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">レジュメ分析履歴</h1>
        <Link
          href="/resume"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
        >
          <span>新しい分析を始める</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      
      <div className="grid gap-6">
        {histories.map((history) => (
          <div
            key={history.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-800">{history.versionName}</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <time className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    {new Date(history.updatedAt).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </time>
                  <div className="flex gap-2">
                    <PDFExportButton 
                      targetId={`resume-${history.id}`} 
                      filename={`${history.versionName}.pdf`}
                    />
                    <Link
                      href={`/resume/improve?history=${history.id}`}
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 text-sm"
                    >
                      この履歴書を改善
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              id={`resume-${history.id}`} 
              className="p-6"
            >
              <div className="prose prose-sm max-w-none">
                <div className="rounded-lg p-6">
                  <ReactMarkdown
                    components={{
                      h1: ({...props}) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                      h2: ({...props}) => <h2 className="text-xl font-semibold mb-3" {...props} />,
                      p: ({...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                      ul: ({...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                      li: ({...props}) => <li className="mb-2" {...props} />
                    }}
                  >
                    {history.updatedResume}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}

        {histories.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">保存された分析結果はありません</p>
          </div>
        )}
      </div>
    </div>
  )
} 