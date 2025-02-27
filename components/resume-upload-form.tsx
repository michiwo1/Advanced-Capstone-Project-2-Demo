'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { uploadResume } from '@/app/actions/upload-resume'
import { Button } from '@/components/ui/button'
import { useDropzone } from 'react-dropzone'
import { Cloud, File, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ResumeUploadForm() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: loading
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('resume', file)
      
      const result = await uploadResume(formData)
      
      if (result.success) {
        setTimeout(() => {
          router.push('/jobs')
        }, 1000)
      }
    } catch {
      console.error('Failed to upload resume')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[650px] mx-auto space-y-8">      
      <div className="space-y-6">
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dotted rounded-xl p-10 text-center transition-all",
            loading ? "cursor-not-allowed opacity-60" : "cursor-pointer",
            "hover:border-blue-400 hover:bg-blue-50/50",
            isDragActive ? "border-blue-500 bg-blue-50/70" : "border-blue-300",
            file && "border-green-500 bg-green-50"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-6">
            {file ? (
              <>
                <File className="h-12 w-12 text-green-500" />
                <div>
                  <p className="text-base font-semibold">{file.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </>
            ) : (
              <>
                <Cloud className="h-12 w-12 text-blue-400" />
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    Drag & Drop PDF file here
                  </p>
                  <p className="text-base text-gray-600 mt-2">
                    or click to select a file
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
        className={cn(
          "w-full py-6 text-lg font-medium rounded-lg shadow-md transition-all",
          "bg-blue-500 hover:bg-blue-600 text-white",
          "disabled:bg-gray-400 disabled:cursor-not-allowed"
        )}
      >
        {loading ? (
          <>
            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          'Upload'
        )}
      </Button>
    </form>
  )
}

