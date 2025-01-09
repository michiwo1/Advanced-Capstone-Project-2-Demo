'use client';

import { useState } from 'react';

export default function CompanyPage() {
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">企業分析</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mt-4">
          <textarea
            className="w-full h-48 p-4 border rounded-lg resize-none"
            placeholder="企業情報を入力してください"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          診断する
        </button>
      </form>

      {showResult && (
        <div className="mt-8 p-6 border rounded-lg bg-gray-50">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">マッチ率</h3>
              <span className="font-semibold">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-600 h-4 rounded-full transition-all duration-500"
                style={{ width: '85%' }}
              />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-4">診断結果</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">企業の強み</h4>
              <p>• 革新的な技術開発力と研究開発体制</p>
              <p>• 安定した財務基盤</p>
              <p>• グローバルな市場展開</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">改善ポイント</h4>
              <p>• 人材育成プログラムの強化</p>
              <p>• デジタルトランスフォーメーションの加速</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">今後の展望</h4>
              <p>持続可能な成長が期待できる企業です。特に技術革新への投資と市場展開の戦略が効果的に機能しています。</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 