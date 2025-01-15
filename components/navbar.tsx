'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center space-x-4">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Upload
          </Link>
          <Link
            href="/jobs"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/jobs" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Job Search
          </Link>
          <Link
            href="/skills"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/skills" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Skills Analysis
          </Link>
          <Link
            href="/market"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/market" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Market Analysis
          </Link>
          <Link
            href="/company"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/company" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Company Analysis
          </Link>
          <Link
            href="/resume"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/resume" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Resume Improvement
          </Link>
        </div>
      </div>
    </nav>
  )
} 