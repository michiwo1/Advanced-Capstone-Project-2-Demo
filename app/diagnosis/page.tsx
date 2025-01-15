import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Suspense } from "react";

async function getDiagnosisResults() {
  try {
    const results = await prisma.diagnosisResult.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return results;
  } catch (error) {
    console.error("Error fetching diagnosis results:", error);
    return [];
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DiagnosisPage() {
  const results = await getDiagnosisResults();

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8 bg-gradient-to-r p-6 rounded-xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Diagnosis Results</h1>
          <p className="text-gray-600">View your company compatibility analysis results</p>
        </div>
        <Link
          href="/company"
          className="inline-flex items-center px-6 py-3 bg-[#4A90E2] text-white rounded-lg hover:bg-[#5DA1F0] transition-all duration-200 shadow-sm text-center justify-center whitespace-nowrap"
        >
          New Company Analysis
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid gap-8">
          {results.map((result) => (
            <Card 
              key={result.id} 
              className="hover:shadow-lg transition-shadow duration-200 border border-[#D9DDE1] rounded-lg overflow-hidden"
            >
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6">
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[#4A90E2] font-bold text-lg">
                        Match Rate: {result.matchRate}%
                      </span>
                      {result.link && (
                        <Link
                          href={result.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 text-sm text-[#4A90E2] border border-[#4A90E2] rounded-md hover:bg-blue-50 transition-colors whitespace-nowrap"
                        >
                          Visit Company Site →
                        </Link>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{result.title}</h2>
                    </div>
                    <div className="prose max-w-none mt-4">
                      <ReactMarkdown className="text-gray-700 leading-relaxed text-base">{result.reason}</ReactMarkdown>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap mt-2 sm:mt-0">
                    {formatDistanceToNow(result.createdAt, { addSuffix: true, locale: enUS })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {results.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-gray-600 text-xl font-medium">No diagnosis results found</p>
              <p className="text-gray-500 mt-3">Start with a new company analysis</p>
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
} 