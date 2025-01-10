import * as React from 'react'
import { getLatestAiMessage } from '../actions/get-latest-ai-message'
import { getLatestChartData } from '../actions/get-latest-chart-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ReactMarkdown from 'react-markdown'
import { MarketChart } from '@/components/market-chart'
import { SalaryChart } from '@/components/salary-chart'

export default async function MarketPage() {
  const [aiMessage, chartData] = await Promise.all([
    getLatestAiMessage("market"),
    getLatestChartData()
  ]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">労働市場分析</h1>
      {aiMessage && (
        <Card className="mb-8 border-2 border-blue-200">
          <CardHeader>
            <CardTitle>AIからのアドバイス</CardTitle>
            <CardDescription>{new Date(aiMessage.createdAt).toLocaleString('ja-JP')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{aiMessage.content}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>あなたのスキル評価</CardTitle>
            <CardDescription>各スキルを100点満点で表示</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full max-w-xl mx-auto">
              <MarketChart chartData={chartData || undefined} />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>年収レンジ分布</CardTitle>
            <CardDescription>業界別の年収分布状況</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[400px] p-4 mt-10">
              <SalaryChart />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 