import * as React from 'react'
import { getResume } from '../actions/get-resume'
import { ResumeAnalysisForm } from '@/components/resume-analysis-form'
import Link from 'next/link'


export default async function ResumePage() {
  const resume = await getResume()

  return (
    <div className="container mx-auto py-8 pb-24 relative min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Resume Improvement</h1>
        <Link
          href="/resume-history"
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          View Improvement History
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        {/* Left: Resume Display Area */}
        <div className="border rounded-lg p-6 bg-white shadow">
          <h2 className="text-2xl font-semibold mb-4">Your Resume</h2>
          <div className="min-h-[600px] whitespace-pre-wrap prose prose-sm max-w-none">
            {resume ? resume.originalResume : 'No resume has been uploaded yet.'}
          </div>
        </div>

        {/* Right: AI Analysis Results Area */}
        <ResumeAnalysisForm />
      </div>
    </div>
  )
} 
