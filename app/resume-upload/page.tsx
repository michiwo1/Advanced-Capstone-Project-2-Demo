import { ResumeUploadForm } from '@/components/resume-upload-form'

export default function ResumeUploadPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">レジュメアップロード</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <ResumeUploadForm />
      </div>
    </div>
  )
} 