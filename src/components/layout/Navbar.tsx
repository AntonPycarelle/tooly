'use client'

import { useSearch } from '@/lib/searchContext.tsx'
import { ThemeToggle } from './ThemeToggle.tsx'

export function Navbar() {
  const { searchQuery, setSearchQuery } = useSearch()

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            Tooly
          </h1>

          <div className="flex-1 max-w-xl mx-4">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Search calculators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
