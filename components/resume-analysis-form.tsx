'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { analyzeResume } from '@/app/actions/analyze-resume'
import ReactMarkdown from 'react-markdown'

// Loading button component with form status
function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 min-w-[100px]"
    >
      {pending ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
          改善中...
        </div>
      ) : (
        '送信'
      )}
    </button>
  )
}

// Loading skeleton for analysis result
function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      <div className="space-y-3 mt-8">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  )
}

// Analysis result component with loading state
function AnalysisResult({ result }: { result: string | null }) {
  const { pending } = useFormStatus()

  if (pending) return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      <div className="text-gray-500 animate-pulse">AIがレジュメを分析しています...</div>
      <LoadingSkeleton />
    </div>
  )

  if (result) return <ReactMarkdown>{result}</ReactMarkdown>
  
  return '分析結果がここに表示されます。'
}

export function ResumeAnalysisForm() {
  const [result, setResult] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setResult(null)
    try {
      const response = await analyzeResume(formData)
      setResult(response.message)
    } catch (error) {
      console.error('Analysis failed:', error)
      setResult('分析中にエラーが発生しました。')
    }
  }

  return (
    <>
      <div className="border rounded-lg p-6 bg-white shadow">
        <h2 className="text-2xl font-semibold mb-4">AI分析結果</h2>
        <div className="min-h-[600px] whitespace-pre-wrap prose prose-sm max-w-none">
          <AnalysisResult result={result} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <form action={handleSubmit} className="container mx-auto flex gap-4">
          <input
            name="instruction"
            type="text"
            placeholder="AIに指示を入力してください..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <SubmitButton />
        </form>
      </div>
    </>
  )
} 