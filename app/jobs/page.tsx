import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getLatestJobSearchCriteria } from "../actions/get-latest-criteria"
import { getLatestAiMessage } from "../actions/get-latest-ai-message"
import ReactMarkdown from 'react-markdown'

export const revalidate = 0; // このページは常に最新のデータを取得

export default async function JobsPage() {
  const latestCriteria = await getLatestJobSearchCriteria();
  const latestAiMessage = await getLatestAiMessage("job");

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">求人情報一覧</h1>
      
      {latestAiMessage && (
        <Card className="mb-8 border-2 border-blue-200">
          <CardHeader>
            <CardTitle>AIからのアドバイス</CardTitle>
            <CardDescription>{new Date(latestAiMessage.createdAt).toLocaleString('ja-JP')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{latestAiMessage.content}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}

      <h2 className="text-3xl font-semibold mb-6">あなたにおすすめの求人</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Indeed</CardTitle>
            <CardDescription>Indeed Japan株式会社</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Indeed上の求人情報を検索・閲覧することができます。
              多様な業界、職種の求人情報にアクセス可能です。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">求人検索</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">履歴書作成</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">企業レビュー</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <a href={`https://www.indeed.com/jobs?${
                new URLSearchParams({
                  ...(latestCriteria?.jobTitle && { q: latestCriteria.jobTitle }),
                  ...(latestCriteria?.location && { l: latestCriteria.location }),
                  ...(latestCriteria?.employmentType && { jt: latestCriteria.employmentType }),
                }).toString()
              }`} target="_blank" rel="noopener noreferrer">
                Indeedで検索
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>LinkedIn</CardTitle>
            <CardDescription>LinkedIn Corporation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              LinkedInのプロフェッショナルネットワークを通じて、
              キャリアに関する機会を見つけることができます。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">ネットワーキング</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">プロフィール作成</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">スキル認定</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <a href={`https://www.linkedin.com/jobs/search/?${
                new URLSearchParams({
                  ...(latestCriteria?.jobTitle && { keywords: latestCriteria.jobTitle }),
                  ...(latestCriteria?.location && { location: latestCriteria.location }),
                }).toString()
              }`} target="_blank" rel="noopener noreferrer">
                LinkedInで検索
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Glassdoor</CardTitle>
            <CardDescription>Glassdoor, Inc.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Glassdoorでは、企業の口コミ・評価に加えて、
              給与情報や面接体験などの情報も確認できます。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">企業レビュー</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">給与情報</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">面接情報</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <a href={`https://www.glassdoor.com/Job/jobs-SRCH_KO0,4?${
                new URLSearchParams({
                  ...(latestCriteria?.jobTitle && { keyword: latestCriteria.jobTitle }),
                  ...(latestCriteria?.location && { location: latestCriteria.location }),
                }).toString()
              }`} target="_blank" rel="noopener noreferrer">
                Glassdoorで検索
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ZipRecruiter</CardTitle>
            <CardDescription>ZipRecruiter, Inc.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              ZipRecruiterのAIマッチング技術により、
              あなたのスキルと経験に合った求人を効率的に見つけることができます。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">AIマッチング</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">ワンクリック応募</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">求人アラート</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <a href={`https://www.ziprecruiter.com/jobs-search?${
                new URLSearchParams({
                  ...(latestCriteria?.jobTitle && { search: latestCriteria.jobTitle }),
                  ...(latestCriteria?.location && { location: latestCriteria.location }),
                }).toString()
              }`} target="_blank" rel="noopener noreferrer">
                ZipRecruiterで検索
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monster</CardTitle>
            <CardDescription>Monster Worldwide, Inc.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Monsterは世界最大級の求人サイトの一つで、
              キャリアアドバイスや履歴書作成ツールも提供しています。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">グローバル求人</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">キャリアアドバイス</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">履歴書ツール</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <a href={`https://www.monster.com/jobs/${
                latestCriteria?.jobTitle ? `q-${latestCriteria.jobTitle.toLowerCase().replace(/\s+/g, '-')}-jobs` : ''
              }?page=1&so=p.h.p`} target="_blank" rel="noopener noreferrer">
                Monsterで検索
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CareerBuilder</CardTitle>
            <CardDescription>CareerBuilder, LLC</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              CareerBuilderは、AIを活用した求人マッチングと
              キャリア開発ツールを提供する総合的な就職支援プラットフォームです。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">スキル分析</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">給与査定</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">キャリアパス</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <a href={`https://www.careerbuilder.com/jobs?${
                new URLSearchParams({
                  ...(latestCriteria?.jobTitle && { keywords: latestCriteria.jobTitle }),
                  ...(latestCriteria?.location && { location: latestCriteria.location }),
                }).toString()
              }`} target="_blank" rel="noopener noreferrer">
                CareerBuilderで検索
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {latestCriteria && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>あなたにおすすめの検索条件</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {latestCriteria.jobTitle && (
                <div>
                  <p className="font-semibold">職種</p>
                  <p className="text-gray-600">{latestCriteria.jobTitle}</p>
                </div>
              )}
              {latestCriteria.location && (
                <div>
                  <p className="font-semibold">勤務地</p>
                  <p className="text-gray-600">{latestCriteria.location}</p>
                </div>
              )}
              {latestCriteria.employmentType && (
                <div>
                  <p className="font-semibold">雇用形態</p>
                  <p className="text-gray-600">{latestCriteria.employmentType}</p>
                </div>
              )}
              {latestCriteria.salaryRange && (
                <div>
                  <p className="font-semibold">給与範囲</p>
                  <p className="text-gray-600">{latestCriteria.salaryRange}</p>
                </div>
              )}
              {latestCriteria.skills && (
                <div>
                  <p className="font-semibold">スキル</p>
                  <p className="text-gray-600">{latestCriteria.skills}</p>
                </div>
              )}
              {latestCriteria.industry && (
                <div>
                  <p className="font-semibold">業界</p>
                  <p className="text-gray-600">{latestCriteria.industry}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 