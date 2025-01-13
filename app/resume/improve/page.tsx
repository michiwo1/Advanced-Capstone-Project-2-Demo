import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { ImprovementForm } from '@/components/improvement-form'


export default async function ResumeImprovePage({
  searchParams,
}: {
  searchParams: { history?: string }
}) {
  if (!searchParams.history) {
    notFound()
  }

  const history = await prisma.resumeHistory.findUnique({
    where: {
      id: searchParams.history
    },
    include: {
      resume: true
    }
  })

  if (!history) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 pb-24 relative min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Improve Resume: {history.versionName}</h1>
        <Link
          href="/resume-history"
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          View Saved Improvement History
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        {/* Left side: Resume display area */}
        <div className="border rounded-lg p-6 bg-white shadow">
          <h2 className="text-2xl font-semibold mb-4">Current Resume</h2>
          <div className="min-h-[600px] whitespace-pre-wrap prose prose-sm max-w-none">
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

        {/* 右側：AI分析結果表示エリア */}
        <ImprovementForm updatedResume={history.updatedResume} />
      </div>
    </div>
  )
} 