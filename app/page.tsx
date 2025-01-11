import { ResumeUploadForm } from "@/components/resume-upload-form";
import { VantaBackground } from "@/components/vanta-background";

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <VantaBackground />
      <div className="relative z-10 min-h-screen bg-gradient-to-br flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-10">
          <div className="space-y-6">
            <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              レジュメのアップロード
            </h1>
            <p className="text-center text-lg text-gray-600">
              PDFをアップロードしてください。
              <br />
              <span className="text-sm opacity-75">ファイルサイズは5MB以下にしてください。</span>
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm py-10 px-6 shadow-xl rounded-2xl sm:px-12 transition-all hover:shadow-2xl hover:bg-white/90">
            <ResumeUploadForm />
          </div>
        </div>
      </div>
    </div>
  );
}
