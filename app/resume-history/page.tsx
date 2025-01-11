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
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">レジュメ改善履歴</h1>
          <Link
            href="/resume"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
          >
            <span>あなたの履歴書を改善</span>
          </Link>
        </div>
      
        <div className="grid gap-8">
          {histories.map((history) => (
            <div
              key={history.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-800">{history.versionName}</h2>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <time className="text-sm text-gray-600 bg-gray-50 px-4 py-1.5 rounded-full font-medium">
                      {new Date(history.updatedAt).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </time>
                    <div className="flex gap-3">
                      <PDFExportButton 
                        targetId={`resume-${history.id}`} 
                        filename={`${history.versionName}.pdf`}
                      />
                      <Link
                        href={`/resume/improve?history=${history.id}`}
                        className="inline-flex items-center px-4 py-2 bg-[#9B51E0] hover:bg-[#AF66E7] text-white rounded-lg transition-all duration-200 text-sm shadow-sm hover:shadow-md"
                      >
                        この履歴書を改善
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div 
                id={`resume-${history.id}`} 
                className="p-8"
              >
                <div className="prose prose-sm max-w-none">
                  <div className="rounded-lg">
                    <ReactMarkdown
                      components={{
                        h1: ({...props}) => <h1 className="text-2xl font-bold mb-6" {...props} />,
                        h2: ({...props}) => <h2 className="text-xl font-semibold mb-4" {...props} />,
                        p: ({...props}) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
                        ul: ({...props}) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
                        li: ({...props}) => <li className="text-gray-700" {...props} />
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
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-xl">保存された分析結果はありません</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 