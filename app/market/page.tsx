import * as React from 'react'
import { getLatestAiMessage } from '../actions/get-latest-ai-message'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ReactMarkdown from 'react-markdown'
import { MarketChart } from '@/components/market-chart'

export default async function MarketPage() {
  const aiMessage = await getLatestAiMessage("market");

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
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>業界別市場動向</CardTitle>
          <CardDescription>各業界の求人動向を100点満点で表示</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-xl mx-auto">
            <MarketChart />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 