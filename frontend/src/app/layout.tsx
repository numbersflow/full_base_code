import React from 'react'
import type { Metadata } from 'next'
import '@/styles/globals.css'
import { ThemeProvider } from '@/components/ui/theme/ThemeProvider'
import { ThemeToggle } from '@/components/ui/theme/ThemeToggle'

export const metadata: Metadata = {
  title: 'Component Showcase',
  description: 'A showcase of various UI components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground">
            <header className="container mx-auto py-4">
              <div className="flex justify-end">
                <ThemeToggle />
              </div>
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}