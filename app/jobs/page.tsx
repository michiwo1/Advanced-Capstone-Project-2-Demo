import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getLatestJobSearchCriteria } from "../actions/get-latest-criteria"
import { getLatestAiMessage } from "../actions/get-latest-ai-message"
import ReactMarkdown from 'react-markdown'

export const revalidate = 0; // Always fetch the latest data

export default async function JobsPage() {
  const latestCriteria = await getLatestJobSearchCriteria();
  const latestAiMessage = await getLatestAiMessage("job");

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Job Listings</h1>
      
      {latestAiMessage && (
        <Card className="mb-8 border-2 border-blue-200">
          <CardHeader>
            <CardTitle>AI Advice</CardTitle>
            <CardDescription>{new Date(latestAiMessage.createdAt).toLocaleString('en-US')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{latestAiMessage.content}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}

      <h2 className="text-3xl font-semibold mb-6">Recommended Jobs for You</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Indeed</CardTitle>
            <CardDescription>Indeed Inc.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Search and browse job listings on Indeed.
              Access job opportunities across various industries and positions.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Job Search</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Resume Builder</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Company Reviews</span>
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
                Search on Indeed
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
              Find career opportunities through LinkedIn&apos;s
              professional network.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Networking</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Profile Creation</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Skill Certification</span>
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
                Search on LinkedIn
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
              On Glassdoor, you can find company reviews, ratings,
              salary information, and interview experiences.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Company Reviews</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Salary Info</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Interview Tips</span>
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
                Search on Glassdoor
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
              Find jobs efficiently with ZipRecruiter's AI matching technology
              based on your skills and experience.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">AI Matching</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">One-Click Apply</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Job Alerts</span>
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
                Search on ZipRecruiter
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
              Monster is one of the world's largest job sites,
              offering career advice and resume building tools.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Global Jobs</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Career Advice</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Resume Tools</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <a href={`https://www.monster.com/jobs/${
                latestCriteria?.jobTitle ? `q-${latestCriteria.jobTitle.toLowerCase().replace(/\s+/g, '-')}-jobs` : ''
              }?page=1&so=p.h.p`} target="_blank" rel="noopener noreferrer">
                Search on Monster
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
              CareerBuilder is a comprehensive job search platform
              offering AI-powered job matching and career development tools.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Skill Analysis</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Salary Assessment</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Career Path</span>
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
                Search on CareerBuilder
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {latestCriteria && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recommended Search Criteria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {latestCriteria.jobTitle && (
                <div>
                  <p className="font-semibold">Job Title</p>
                  <p className="text-gray-600">{latestCriteria.jobTitle}</p>
                </div>
              )}
              {latestCriteria.location && (
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-600">{latestCriteria.location}</p>
                </div>
              )}
              {latestCriteria.employmentType && (
                <div>
                  <p className="font-semibold">Employment Type</p>
                  <p className="text-gray-600">{latestCriteria.employmentType}</p>
                </div>
              )}
              {latestCriteria.salaryRange && (
                <div>
                  <p className="font-semibold">Salary Range</p>
                  <p className="text-gray-600">{latestCriteria.salaryRange}</p>
                </div>
              )}
              {latestCriteria.skills && (
                <div>
                  <p className="font-semibold">Skills</p>
                  <p className="text-gray-600">{latestCriteria.skills}</p>
                </div>
              )}
              {latestCriteria.industry && (
                <div>
                  <p className="font-semibold">Industry</p>
                  <p className="text-gray-600">{latestCriteria.industry}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 