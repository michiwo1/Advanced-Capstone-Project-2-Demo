'use client'

import { useState } from 'react'
import { uploadResume, defaultKeywordConfigs } from '@/app/actions/upload-resume'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { KeywordConfig } from '@/lib/gemini'

export function ResumeUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [keywordConfigs, setKeywordConfigs] = useState<KeywordConfig[]>(defaultKeywordConfigs)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('resume', file)
      formData.append('keywordConfigs', JSON.stringify(keywordConfigs))
      
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

  const handleConfigChange = (index: number, field: keyof KeywordConfig, value: string) => {
    const newConfigs = [...keywordConfigs]
    if (field === 'patterns') {
      newConfigs[index][field] = value.split(',').map(p => p.trim())
    } else {
      newConfigs[index][field] = value
    }
    setKeywordConfigs(newConfigs)
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
        <div>
          <h3 className="text-lg font-medium">キーワード設定</h3>
          {keywordConfigs.map((config, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 mt-2">
              <input
                type="text"
                value={config.category}
                onChange={e => handleConfigChange(index, 'category', e.target.value)}
                className="flex h-9 rounded-md border border-input px-3 py-1"
                placeholder="カテゴリー"
              />
              <input
                type="text"
                value={config.patterns.join(', ')}
                onChange={e => handleConfigChange(index, 'patterns', e.target.value)}
                className="flex h-9 rounded-md border border-input px-3 py-1"
                placeholder="キーワード（カンマ区切り）"
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => setKeywordConfigs([...keywordConfigs, { category: '', patterns: [] }])}
            className="mt-2"
          >
            カテゴリーを追加
          </Button>
        </div>
        
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="resume" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            レジュメをアップロード
          </label>
          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
      </div>
      
      <Button type="submit" disabled={loading || !file}>
        {loading ? '処理中...' : 'アップロード'}
      </Button>
    </form>
  )
}

