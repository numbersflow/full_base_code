import React from 'react'
import type { Metadata } from 'next'
import '@/styles/globals.css'
import { ThemeProvider } from '@/components/ui/theme/ThemeProvider'
import Layout from '@/components/layout/Layout'

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
          <Layout>
            {children}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  )
}