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
      <h1 className="text-4xl font-bold mb-8">Labor Market Analysis</h1>
      {aiMessage && (
        <Card className="mb-8 border-2 border-blue-200">
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>{new Date(aiMessage.createdAt).toLocaleString('en-US')}</CardDescription>
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
            <CardTitle>Your Skill Assessment</CardTitle>
            <CardDescription>Skills rated out of 100 points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full max-w-xl mx-auto">
              <MarketChart chartData={chartData || undefined} />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Software Engineer Salary Distribution</CardTitle>
            <CardDescription>Annual salary ranges</CardDescription>
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