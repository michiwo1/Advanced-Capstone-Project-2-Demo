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
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    try {
      const result = await analyzeCompany(companyInfo);
      setAnalysisResult(JSON.parse(result));
      setShowResult(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('分析中にエラーが発生しました。');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">企業分析</h2>
          <p className="text-muted-foreground mt-2">企業情報を入力して、あなたとの相性を分析します</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="companyInfo" className="block text-sm font-medium text-gray-700 mb-2">
              企業情報
            </label>
            <textarea
              id="companyInfo"
              className="w-full h-48 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="企業の特徴、事業内容、企業文化などの情報を入力してください"
              value={companyInfo}
              onChange={(e) => setCompanyInfo(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isAnalyzing || !companyInfo.trim()}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all ${
              isAnalyzing || !companyInfo.trim()
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
            }`}
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                診断中...
              </span>
            ) : '診断する'}
          </button>
        </form>
      </div>

      {showResult && analysisResult && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold mb-4">診断結果</h3>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium text-gray-700">マッチ率</h4>
                <span className="font-semibold text-blue-600">{analysisResult.matchRate}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-5 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${analysisResult.matchRate}%` }}
                />
              </div>
            </div>
            <div className="prose max-w-none">
              <ReactMarkdown>{analysisResult.reasons}</ReactMarkdown>
            </div>
          </div>
          {analysisResult.improvements && analysisResult.improvements.length > 0 && (
            <div className="p-6 bg-gray-50">
              <h4 className="font-semibold mb-3">改善ポイント</h4>
              <ul className="space-y-2">
                {analysisResult.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 