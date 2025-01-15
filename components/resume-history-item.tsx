'use client'

import { ResumeHistory } from '@prisma/client'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import PDFExportButton from './pdf-export-button'

interface ResumeHistoryItemProps {
  history: ResumeHistory & {
    resume: {
      id: string
      originalResume: string
      createdAt: Date
    }
  }
}

export default function ResumeHistoryItem({ history }: ResumeHistoryItemProps) {
  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">{history.versionName}</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <time className="text-sm text-gray-600 bg-gray-50 px-4 py-1.5 rounded-full font-medium">
              {new Date(history.updatedAt).toLocaleDateString('en-US', {
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
                Improve This Resume
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
  )
} 