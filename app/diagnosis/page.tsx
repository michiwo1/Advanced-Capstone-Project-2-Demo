import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

async function getDiagnosisResults() {
  const results = await prisma.diagnosisResult.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return results;
}

export default async function DiagnosisPage() {
  const results = await getDiagnosisResults();

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8 bg-gradient-to-r p-6 rounded-xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">診断結果一覧</h1>
          <p className="text-gray-600">あなたと企業とのマッチング診断結果をご確認いただけます</p>
        </div>
        <Link
          href="/company"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          新規企業診断
        </Link>
      </div>
      <div className="grid gap-6">
        {results.map((result) => (
          <Card key={result.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-8">
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">{result.title}</h2>
                    {result.link && (
                      <Link
                        href={result.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-1 text-sm text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                      >
                        企業サイトへ →
                      </Link>
                    )}
                  </div>
                  <p className="text-lg font-semibold text-blue-600 mb-4">
                    マッチ率: {result.matchRate}%
                  </p>
                  <div className="prose max-w-none">
                    <ReactMarkdown className="text-gray-700 leading-relaxed">{result.reason}</ReactMarkdown>
                  </div>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  {formatDistanceToNow(result.createdAt, { addSuffix: true, locale: ja })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {results.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">診断結果がありません</p>
            <p className="text-gray-400 mt-2">新規企業診断から始めましょう</p>
          </div>
        )}
      </div>
    </div>
  );
} 