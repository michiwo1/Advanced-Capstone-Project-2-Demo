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
            href="/jobs"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/jobs" ? "text-primary" : "text-muted-foreground"
            )}
          >
            求人検索
          </Link>
          <Link
            href="/skills"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/skills" ? "text-primary" : "text-muted-foreground"
            )}
          >
            スキル分析
          </Link>
        </div>
      </div>
    </nav>
  )
} 