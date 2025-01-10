'use client'

import { useState } from 'react'
import { analyzeResume } from '@/app/actions/analyze-resume'
import ReactMarkdown from 'react-markdown'

export function ResumeAnalysisForm() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsAnalyzing(true)
    try {
      const response = await analyzeResume(formData)
      setResult(response.message)
    } catch (error) {
      console.error('Analysis failed:', error)
      setResult('分析中にエラーが発生しました。')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <>
      <div className="border rounded-lg p-6 bg-white shadow">
        <h2 className="text-2xl font-semibold mb-4">AI分析結果</h2>
        <div className="min-h-[600px] whitespace-pre-wrap prose prose-sm max-w-none">
          {result ? (
            <ReactMarkdown>{result}</ReactMarkdown>
          ) : (
            '分析結果がここに表示されます。'
          )}
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
          <button
            type="submit"
            disabled={isAnalyzing}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            {isAnalyzing ? '分析中...' : '送信'}
          </button>
        </form>
      </div>
    </>
  )
} 