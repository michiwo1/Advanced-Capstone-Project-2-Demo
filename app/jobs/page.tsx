import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getLatestJobSearchCriteria } from "../actions/get-latest-criteria"

export default async function JobsPage() {
  const latestCriteria = await getLatestJobSearchCriteria();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">求人情報一覧</h1>
      
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
            <Button>LinkedInで検索</Button>
          </CardFooter>
        </Card>
      </div>

      {latestCriteria && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>最新の検索条件</CardTitle>
            <CardDescription>前回設定した検索条件</CardDescription>
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