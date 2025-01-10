'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import * as ReactDOM from 'react-dom/client'
import { improveResume } from '@/app/actions/improve-resume'
import { saveResumeHistory } from '@/app/actions/save-resume-history'

export function ImprovementForm({ updatedResume }: { updatedResume: string }) {
  const [advice, setAdvice] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [saveError, setSaveError] = useState<string | null>(null)
  const [resumeId, setResumeId] = useState<string | null>(null)

  const handlePdfExport = async () => {
    if (!advice) return;
    
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
          <ReactMarkdown>{advice}</ReactMarkdown>
        </div>
      </div>
    );

    // Wait for React to finish rendering
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const opt = {
      margin: 1,
      filename: '履歴書改善アドバイス.pdf',
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
    try {
      setIsLoading(true)
      formData.append('resume', updatedResume)
      const result = await improveResume(formData)
      setAdvice(result.message)
      setResumeId(result.resumeId)
    } catch (error) {
      console.error('Failed to get improvement advice:', error)
      setAdvice('改善アドバイスの取得に失敗しました。')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSave() {
    if (!title.trim() || !advice || !resumeId) {
      setSaveError('保存に必要な情報が不足しています。')
      return
    }

    try {
      const response = await saveResumeHistory(resumeId, title, advice)
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
          <h2 className="text-2xl font-semibold">改善のアドバイス</h2>
          {advice && (
            <div className="flex gap-2">
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
            </div>
          )}
        </div>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[500px] max-w-[90vw]">
            <h3 className="text-xl font-semibold mb-4">改善アドバイスの保存</h3>
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
    </>
  )
} 