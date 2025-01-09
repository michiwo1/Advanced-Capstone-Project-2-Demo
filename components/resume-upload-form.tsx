'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { uploadResume } from '@/app/actions/upload-resume'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useDropzone } from 'react-dropzone'
import { Cloud, File } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ResumeUploadForm() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('resume', file)
      
      const result = await uploadResume(formData)
      
      setMessage({
        type: result.success ? 'success' : 'error',
        text: result.message
      })

      if (result.success) {
        setTimeout(() => {
          router.push('/jobs')
        }, 1000)
      }
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
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">      
      <div className="space-y-4">
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/50 transition-colors cursor-pointer",
            isDragActive && "border-primary bg-accent",
            file && "border-green-500 bg-green-50"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            {file ? (
              <>
                <File className="h-10 w-10 text-green-500" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </>
            ) : (
              <>
                <Cloud className="h-10 w-10 text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">
                    ここにPDFファイルをドラッグ&ドロップ
                  </p>
                  <p className="text-sm text-muted-foreground">
                    または、クリックしてファイルを選択
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Button
        type="submit"
        disabled={loading || !file}
        className="w-full"
      >
        {loading ? '処理中...' : 'アップロード'}
      </Button>
    </form>
  )
}

