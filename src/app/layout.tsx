import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/lib/darkMode'
import { SearchProvider } from '@/lib/searchContext'
import { Navbar } from '@/components/layout/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tooly - Advanced Calculator Suite',
  description: 'A modern, user-friendly calculator suite with interactive explanations and educational content.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <SearchProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Navbar />
              <div className="pt-16">
                {children}
              </div>
            </div>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
