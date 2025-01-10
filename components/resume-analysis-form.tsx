'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { analyzeResume } from '@/app/actions/analyze-resume'
import { saveResumeHistory } from '@/app/actions/save-resume-history'
import ReactMarkdown from 'react-markdown'
import * as ReactDOM from 'react-dom/client'

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
  const [editableResult, setEditableResult] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [resumeId, setResumeId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [saveError, setSaveError] = useState<string | null>(null)

  // Add PDF export function
  const handlePdfExport = async () => {
    if (!result) return;
    
    // Dynamic import of html2pdf.js
    const html2pdf = (await import('html2pdf.js')).default;
    
    // Create a temporary div and render markdown content
    const tempDiv = document.createElement('div');
    const root = ReactDOM.createRoot(tempDiv);
    root.render(
      <div style={{
        padding: '20px',
        fontFamily: 'sans-serif',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{isEditing ? editableResult : result}</ReactMarkdown>
        </div>
      </div>
    );

    // Wait for React to finish rendering
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const opt = {
      margin: 1,
      filename: 'resume-analysis.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(tempDiv).save().then(() => {
      // Cleanup
      root.unmount();
    });
  };

  async function handleSubmit(formData: FormData) {
    setResult(null)
    setEditableResult(null)
    setResumeId(null)
    try {
      const response = await analyzeResume(formData)
      setResult(response.message)
      setEditableResult(response.message)
      if (response.resumeId) {
        setResumeId(response.resumeId)
      }
    } catch (error) {
      console.error('Analysis failed:', error)
      setResult('分析中にエラーが発生しました。')
      setEditableResult('分析中にエラーが発生しました。')
    }
  }

  async function handleSave() {
    if (!title.trim() || !result || !resumeId) {
      setSaveError('保存に必要な情報が不足しています。')
      return
    }

    try {
      const response = await saveResumeHistory(resumeId, title, isEditing ? editableResult! : result)
      if (response.success) {
        setIsModalOpen(false)
        setTitle('')
        setSaveError(null)
      } else {
        setSaveError('保存に失敗しました。')
      }
    } catch (error) {
      console.error('Save failed:', error)
      setSaveError('保存に失敗しました。')
    }
  }

  return (
    <>
      <div className="border rounded-lg p-6 bg-white shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">AI分析結果</h2>
          <div className="flex gap-2 items-center">
            {result && (
              <>
                <button
                  onClick={() => {
                    if (isEditing) {
                      setResult(editableResult)
                      setIsEditing(false)
                    } else {
                      setIsEditing(true)
                    }
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {isEditing ? '完了' : '編集'}
                </button>
                <button
                  onClick={handlePdfExport}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  PDF出力
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  保存
                </button>
              </>
            )}
          </div>
        </div>
        <div className="min-h-[600px] whitespace-pre-wrap prose prose-sm max-w-none">
          {isEditing ? (
            <textarea
              value={editableResult || ''}
              onChange={(e) => setEditableResult(e.target.value)}
              className="w-full h-full min-h-[600px] p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <AnalysisResult result={result} />
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[500px] max-w-[90vw]">
            <h3 className="text-xl font-semibold mb-4">分析結果の保存</h3>
            {saveError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {saveError}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                タイトル
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="保存するタイトルを入力"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setTitle('')
                  setSaveError(null)
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                キャンセル
              </button>
              <button
                onClick={handleSave}
                disabled={!title.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

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