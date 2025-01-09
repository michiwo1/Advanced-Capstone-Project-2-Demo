'use client'

import { useState } from 'react'
import { uploadResume } from '@/app/actions/upload-resume'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'


export function ResumeUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !prompt) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('resume', file)
      formData.append('prompt', prompt)
      
      const result = await uploadResume(formData)
      
      setMessage({
        type: result.success ? 'success' : 'error',
        text: result.message
      })
    } catch (error: unknown) {
      console.error('Upload error:', error);
      setMessage({
        type: 'error',
        text: 'アップロード中にエラーが発生しました。'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          <AlertTitle>
            {message.type === 'success' ? '成功' : 'エラー'}
          </AlertTitle>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="resume" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            PDFをアップロード
          </label>
          <input
            id="resume"
            type="file"
            accept=".pdf"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className="grid w-full gap-1.5">
          <label htmlFor="prompt" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            プロンプト
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="PDFの内容に対する質問や指示を入力してください"
            className="min-h-[100px]"
          />
        </div>
      </div>
      
      <Button type="submit" disabled={loading || !file || !prompt}>
        {loading ? '処理中...' : 'アップロード'}
      </Button>
    </form>
  )
}

