import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getLatestAiMessage } from "../actions/get-latest-ai-message";
import ReactMarkdown from 'react-markdown';

export const revalidate = 0;

export default async function SkillsPage() {
  const aiMessage = await getLatestAiMessage("skill");

  // スキルカテゴリーとスキルの定義
  const skillCategories = [
    {
      title: "プログラミング言語",
      description: "使用可能なプログラミング言語とフレームワーク",
      skills: [
        { name: "JavaScript/TypeScript", level: 90, description: "フロントエンド開発、Node.js" },
        { name: "Python", level: 85, description: "データ分析、バックエンド開発" },
        { name: "Java", level: 80, description: "エンタープライズアプリケーション開発" },
      ]
    },
    {
      title: "フロントエンド技術",
      description: "Webフロントエンド開発に関する技術",
      skills: [
        { name: "React", level: 95, description: "SPAの開発、コンポーネント設計" },
        { name: "Next.js", level: 85, description: "SSR/SSGの実装" },
        { name: "HTML/CSS", level: 90, description: "レスポンシブデザイン、アニメーション" },
      ]
    },
    {
      title: "バックエンド技術",
      description: "サーバーサイド開発に関する技術",
      skills: [
        { name: "Node.js", level: 85, description: "APIサーバー開発" },
        { name: "Express", level: 80, description: "RESTful API設計" },
        { name: "データベース設計", level: 75, description: "SQL/NoSQLの設計と最適化" },
      ]
    },
    {
      title: "開発ツール・その他",
      description: "開発効率を向上させるツールとその他のスキル",
      skills: [
        { name: "Git", level: 90, description: "バージョン管理、チーム開発" },
        { name: "Docker", level: 75, description: "コンテナ化、開発環境構築" },
        { name: "CI/CD", level: 70, description: "自動化パイプラインの構築" },
      ]
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">スキル一覧</h1>
      
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

      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                    <p className="text-sm text-gray-600">{skill.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>スキル開発の目標</CardTitle>
          <CardDescription>継続的な学習と成長のための目標</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>クラウドプラットフォーム（AWS、GCP）の専門知識の向上</li>
            <li>マイクロサービスアーキテクチャの設計と実装スキルの強化</li>
            <li>AI/機械学習技術の実践的な応用力の習得</li>
            <li>セキュリティベストプラクティスの深い理解と実装</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
} 