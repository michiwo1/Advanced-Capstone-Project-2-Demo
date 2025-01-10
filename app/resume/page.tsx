import * as React from 'react'
import { getResume } from '../actions/get-resume'
import { ResumeAnalysisForm } from '@/components/resume-analysis-form'

export default async function ResumePage() {
  const resume = await getResume()

  return (
    <div className="container mx-auto py-8 pb-24 relative min-h-screen">
      <h1 className="text-4xl font-bold mb-8">レジュメ改善</h1>
      
      <div className="grid grid-cols-2 gap-8">
        {/* 左側：履歴書表示エリア */}
        <div className="border rounded-lg p-6 bg-white shadow">
          <h2 className="text-2xl font-semibold mb-4">あなたの履歴書</h2>
          <div className="min-h-[600px] whitespace-pre-wrap prose prose-sm max-w-none">
            {resume ? resume.originalResume : 'レジュメがまだ登録されていません。'}
          </div>
        </div>

        {/* 右側：AI分析結果表示エリア */}
        <ResumeAnalysisForm />
      </div>
    </div>
  )
} 
