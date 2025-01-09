import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function JobsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">求人情報一覧</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* サンプルの求人カード */}
        <Card>
          <CardHeader>
            <CardTitle>フロントエンドエンジニア</CardTitle>
            <CardDescription>株式会社サンプル</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              React、Next.js、TypeScriptを使用したWebアプリケーション開発のポジションです。
              3年以上のフロントエンド開発経験が必要です。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">React</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Next.js</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">TypeScript</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button>詳細を見る</Button>
          </CardFooter>
        </Card>

        {/* 他の求人カードも同様に追加可能 */}
      </div>
    </div>
  )
} 