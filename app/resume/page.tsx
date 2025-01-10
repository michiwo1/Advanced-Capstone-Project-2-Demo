import * as React from 'react'
import { getResume } from '../actions/get-resume'
import { analyzeResume } from '../actions/analyze-resume'

export default async function ResumePage() {
  const resume = await getResume()

  return (
    <div className="container mx-auto py-8 pb-24 relative min-h-screen">
      <h1 className="text-4xl font-bold mb-8">レジュメ改善</h1>
      
      <div className="grid grid-cols-2 gap-8">
        {/* 左側：履歴書表示エリア */}
        <div className="border rounded-lg p-6 bg-white shadow">
          <h2 className="text-2xl font-semibold mb-4">あなたの履歴書</h2>
          <div className="min-h-[600px] whitespace-pre-wrap">
            {resume ? resume.originalResume : 'レジュメがまだ登録されていません。'}
          </div>
        </div>

        {/* 右側：将来的な機能のためのスペース */}
        <div>
          {/* 右側のコンテンツはここに追加されます */}
        </div>
      </div>

      {/* AI指示フォーム */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <form action={analyzeResume} className="container mx-auto flex gap-4">
          <input
            name="instruction"
            type="text"
            placeholder="AIに指示を入力してください..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            送信
          </button>
        </form>
      </div>
    </div>
  )
} 
