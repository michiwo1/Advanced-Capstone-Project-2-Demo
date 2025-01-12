'use client';

import { useState } from 'react';
import { analyzeCompany } from '@/app/actions/analyze-company';
import { saveDiagnosis } from '@/app/actions/save-diagnosis';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface AnalysisResult {
  matchRate: number;
  reasons: string;
}

export default function CompanyPage() {
  const [showResult, setShowResult] = useState(false);
  const [companyInfo, setCompanyInfo] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [companyTitle, setCompanyTitle] = useState('');
  const [companyLink, setCompanyLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    try {
      const result = await analyzeCompany(companyInfo);
      setAnalysisResult(JSON.parse(result));
      setShowResult(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('An error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Company Analysis</h2>
          <p className="text-muted-foreground mt-2">Enter company information to analyze compatibility</p>
        </div>
        <Link
          href="/diagnosis"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Analysis History
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="companyInfo" className="block text-sm font-medium text-gray-700 mb-2">
              Company Information
            </label>
            <textarea
              id="companyInfo"
              className="w-full h-48 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter information about the company's characteristics, business activities, and corporate culture"
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
                Analyzing...
              </span>
            ) : 'Analyze'}
          </button>
        </form>
      </div>

      {showResult && analysisResult && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold mb-4">Analysis Results</h3>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium text-gray-700">Match Rate</h4>
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
              <ReactMarkdown className="text-gray-700">{analysisResult.reasons}</ReactMarkdown>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setShowSaveDialog(true)}
              >
                Save Results
              </button>
            </div>
          </div>
        </div>
      )}

      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Save Analysis Results</h3>
            <div className="mb-4">
              <label htmlFor="companyTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="companyTitle"
                value={companyTitle}
                onChange={(e) => setCompanyTitle(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter company name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="companyLink" className="block text-sm font-medium text-gray-700 mb-2">
                Company Website
              </label>
              <input
                type="url"
                id="companyLink"
                value={companyLink}
                onChange={(e) => setCompanyLink(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter company website URL"
              />
            </div>
            <p className="text-gray-600 mb-6">Would you like to save this company analysis?</p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setShowSaveDialog(false);
                  setCompanyTitle('');
                  setCompanyLink('');
                }}
              >
                Cancel
              </button>
              <button
                disabled={!companyTitle.trim()}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !companyTitle.trim()
                    ? 'bg-blue-400 cursor-not-allowed text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                onClick={async () => {
                  if (!analysisResult) return;
                  try {
                    const result = await saveDiagnosis(
                      companyTitle,
                      analysisResult.matchRate,
                      analysisResult.reasons,
                      companyLink
                    );
                    if (result.success) {
                      alert('Successfully saved');
                    } else {
                      throw new Error(result.error);
                    }
                  } catch (error) {
                    console.error('Failed to save:', error);
                    alert('Failed to save');
                  }
                  setShowSaveDialog(false);
                  setCompanyTitle('');
                  setCompanyLink('');
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 