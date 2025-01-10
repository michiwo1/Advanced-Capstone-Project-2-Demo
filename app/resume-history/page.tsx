import { prisma } from '@/lib/prisma'

export default async function ResumeHistoryPage() {
  const histories = await prisma.resumeHistory.findMany({
    orderBy: {
      updatedAt: 'desc'
    },
    include: {
      resume: true
    }
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">レジュメ分析履歴</h1>
      
      <div className="grid gap-4">
        {histories.map((history) => (
          <div
            key={history.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{history.versionName}</h2>
              <time className="text-sm text-gray-500">
                {new Date(history.updatedAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <div className="bg-gray-50 rounded p-4 whitespace-pre-wrap">
                {history.updatedResume}
              </div>
            </div>
          </div>
        ))}

        {histories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            保存された分析結果はありません
          </div>
        )}
      </div>
    </div>
  )
} 