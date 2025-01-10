import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

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
        <h1 className="text-4xl font-bold">{ history.versionName }の履歴書を改善</h1>
        <Link
          href="/resume-history"
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          保存済み分析履歴を見る →
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        {/* 左側：履歴書表示エリア */}
        <div className="border rounded-lg p-6 bg-white shadow">
          <h2 className="text-2xl font-semibold mb-4">現在の履歴書</h2>
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
        <div className="border rounded-lg p-6 bg-white shadow">
          <h2 className="text-2xl font-semibold mb-4">改善のアドバイス</h2>
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
              {/* TODO: AIによる改善アドバイスの実装 */}
              このセクションでは、AIが履歴書の改善点を分析し、具体的なアドバイスを提供します。
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="container mx-auto">
          <form className="flex gap-4">
            <input
              type="text"
              placeholder="AIに指示を入力してください..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 min-w-[100px]"
            >
              送信
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 