import * as React from 'react'

export default async function ResumePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">レジュメ改善</h1>
      
      <div className="grid grid-cols-2 gap-8">
        {/* 左側：履歴書表示エリア */}
        <div className="border rounded-lg p-6 bg-white shadow">
          <h2 className="text-2xl font-semibold mb-4">あなたの履歴書</h2>
          <div className="min-h-[600px]">
            {/* ここに履歴書のコンテンツが表示されます */}
          </div>
        </div>

        {/* 右側：将来的な機能のためのスペース */}
        <div>
          {/* 右側のコンテンツはここに追加されます */}
        </div>
      </div>
    </div>
  )
} 
