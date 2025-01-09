import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function JobsPage() {
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
            <Button>Indeedで検索</Button>
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
    </div>
  )
} 