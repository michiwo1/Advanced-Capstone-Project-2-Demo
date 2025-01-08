'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { uploadResume } from '../actions/upload-resume'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ReloadIcon } from '@radix-ui/react-icons'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          アップロード中...
        </>
      ) : (
        'アップロード'
      )}
    </Button>
  )
}

export function ResumeUploadForm() {
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    const result = await uploadResume(formData)
    setResult(result)
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="resume">レジュメをアップロード</Label>
        <Input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          required
          className="mt-1"
        />
      </div>
      <SubmitButton />
      {result && (
        <Alert variant={result.success ? "default" : "destructive"}>
          <AlertTitle>{result.success ? '成功' : 'エラー'}</AlertTitle>
          <AlertDescription>{result.message}</AlertDescription>
        </Alert>
      )}
    </form>
  )
}

