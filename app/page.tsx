import { ResumeUploadForm } from "@/components/resume-upload-form";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            レジュメのアップロード
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            PDFまたはWord文書（.doc, .docx）をアップロードしてください。
            <br />
            ファイルサイズは5MB以下にしてください。
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ResumeUploadForm />
        </div>
      </div>
    </div>
  )
}
