'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { improveResume } from '@/app/actions/improve-resume'

export function ImprovementForm({ updatedResume }: { updatedResume: string }) {
  const [advice, setAdvice] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    try {
      setIsLoading(true)
      formData.append('resume', updatedResume)
      const result = await improveResume(formData)
      setAdvice(result)
    } catch (error) {
      console.error('Failed to get improvement advice:', error)
      setAdvice('改善アドバイスの取得に失敗しました。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="border rounded-lg p-6 bg-white shadow">
        <h2 className="text-2xl font-semibold mb-4">改善のアドバイス</h2>
        <div className="min-h-[600px] whitespace-pre-wrap prose prose-sm max-w-none">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              <div className="text-gray-500 animate-pulse">AIが履歴書を分析しています...</div>
            </div>
          ) : (
            <ReactMarkdown
              components={{
                h1: ({...props}) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                h2: ({...props}) => <h2 className="text-xl font-semibold mb-3" {...props} />,
                p: ({...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                ul: ({...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                li: ({...props}) => <li className="mb-2" {...props} />
              }}
            >
              {advice || 'AIに指示を入力して、履歴書の改善アドバイスを受け取りましょう。'}
            </ReactMarkdown>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="container mx-auto">
          <form onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            await handleSubmit(formData);
          }} className="flex gap-4">
            <input
              type="text"
              name="instruction"
              placeholder="AIに指示を入力してください..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 min-w-[100px]"
            >
              {isLoading ? '改善中...' : '送信'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
} 