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

      <div className="space-y-4 max-w-xl mx-auto">
        {skills.map((skill, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{skill}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(skill + " programming tutorial")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                YouTube
              </a>
              <a
                href={`https://www.udemy.com/courses/search/?q=${encodeURIComponent(skill)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-1.838 19.798c-1.02-.614-1.706-1.535-2.082-2.762-.376-1.227-.47-2.784-.47-4.67 0-1.885.094-3.442.47-4.67.376-1.227 1.062-2.147 2.082-2.762 1.02-.614 2.315-.922 3.838-.922 1.524 0 2.818.307 3.838.922 1.02.614 1.706 1.535 2.082 2.762.376 1.227.47 2.784.47 4.67 0 1.885-.094 3.442-.47 4.67-.376 1.227-1.062 2.147-2.082 2.762-1.02.614-2.315.922-3.838.922-1.524 0-2.818-.307-3.838-.922z"/>
                </svg>
                Udemy
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 