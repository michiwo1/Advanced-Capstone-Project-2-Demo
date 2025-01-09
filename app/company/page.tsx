'use client';

import { useState } from 'react';
import { analyzeCompany } from '@/app/actions/analyze-company';
import ReactMarkdown from 'react-markdown';

interface AnalysisResult {
  matchRate: number;
  reasons: string;
  improvements: string[];
  outlook: string;
}

export default function CompanyPage() {
  const [showResult, setShowResult] = useState(false);
  const [companyInfo, setCompanyInfo] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await analyzeCompany(companyInfo);
      setAnalysisResult(JSON.parse(result));
      setShowResult(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('分析中にエラーが発生しました。');
    }
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
            value={companyInfo}
            onChange={(e) => setCompanyInfo(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          診断する
        </button>
      </form>

      {showResult && analysisResult && (
        <div className="mt-8 p-6 border rounded-lg bg-gray-50">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">マッチ率</h3>
              <span className="font-semibold">{analysisResult.matchRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${analysisResult.matchRate}%` }}
              />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-4">診断結果</h3>
          <ReactMarkdown>{analysisResult.reasons}</ReactMarkdown>
        </div>
      )}
    </div>
  );
} 