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
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">診断結果一覧</h1>
        <Link
          href="/company"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          企業診断
        </Link>
      </div>
      <div className="grid gap-4">
        {results.map((result) => (
          <Card key={result.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-semibold">{result.title}</h2>
                    {result.link && (
                      <Link
                        href={result.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        企業サイトへ
                      </Link>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">マッチ率: {result.matchRate}%</p>
                  <div className="prose max-w-none">
                    <ReactMarkdown className="text-gray-700">{result.reason}</ReactMarkdown>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {formatDistanceToNow(result.createdAt, { addSuffix: true, locale: ja })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {results.length === 0 && (
          <p className="text-center text-gray-500">診断結果がありません</p>
        )}
      </div>
    </div>
  );
} 