import * as React from 'react'
import { getLatestAiMessage } from '../actions/get-latest-ai-message'
import { getLatestChartData } from '../actions/get-latest-chart-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ReactMarkdown from 'react-markdown'
import { MarketChart } from '@/components/market-chart'
import { SalaryChart } from '@/components/salary-chart'
import { Tag } from '@prisma/client'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default async function MarketPage() {
  try {
    const [aiMessageResult, chartDataResult] = await Promise.allSettled([
      getLatestAiMessage(Tag.market),
      getLatestChartData()
    ]);

    const aiMessage = aiMessageResult.status === 'fulfilled' ? aiMessageResult.value : null;
    const chartData = chartDataResult.status === 'fulfilled' ? chartDataResult.value : null;

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Labor Market Analysis</h1>
        
        {aiMessageResult.status === 'rejected' && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load AI insights. Please try again later.</AlertDescription>
          </Alert>
        )}

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
                {chartDataResult.status === 'rejected' ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Failed to load chart data. Please try again later.</AlertDescription>
                  </Alert>
                ) : (
                  <MarketChart chartData={chartData || undefined} />
                )}
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
  } catch (error) {
    console.error('Error in MarketPage:', error);
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>An unexpected error occurred. Please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }
} 