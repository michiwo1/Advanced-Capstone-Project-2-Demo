import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getLatestAiMessage } from "../actions/get-latest-ai-message";
import { getSkills } from "../actions/get-skills";
import ReactMarkdown from 'react-markdown';

export const revalidate = 0;

export default async function SkillsPage() {
  const [aiMessage, skills] = await Promise.all([
    getLatestAiMessage("skill"),
    getSkills()
  ]);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          スキル一覧
        </h1>
        
        {aiMessage && (
          <Card className="mb-12 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="text-2xl">AIからのアドバイス</CardTitle>
              <CardDescription className="text-sm opacity-75">
                {new Date(aiMessage.createdAt).toLocaleString('ja-JP')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{aiMessage.content}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        )}

        <h2 className="text-2xl font-bold mb-6">あなたにおすすめのスキル</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-gray-100"
            >
              <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                <CardTitle className="text-xl font-bold text-gray-800">{skill}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(skill + " tutorial")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 p-3 rounded-lg transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                    <span className="font-medium">YouTubeで学ぶ</span>
                  </a>
                  <a
                    href={`https://www.udemy.com/courses/search/?q=${encodeURIComponent(skill)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 p-3 rounded-lg transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-1.838 19.798c-1.02-.614-1.706-1.535-2.082-2.762-.376-1.227-.47-2.784-.47-4.67 0-1.885.094-3.442.47-4.67.376-1.227 1.062-2.147 2.082-2.762 1.02-.614 2.315-.922 3.838-.922 1.524 0 2.818.307 3.838.922 1.02.614 1.706 1.535 2.082 2.762.376 1.227.47 2.784.47 4.67 0 1.885-.094 3.442-.47 4.67-.376 1.227-1.062 2.147-2.082 2.762-1.02.614-2.315.922-3.838.922-1.524 0-2.818-.307-3.838-.922z"/>
                    </svg>
                    <span className="font-medium">Udemyで学ぶ</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 