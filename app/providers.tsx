'use client'

import { ThemeProvider } from 'next-themes'
import { CMSProvider } from '@/context/CMSContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="ozt-theme"
    >
      <CMSProvider>
        {children}
      </CMSProvider>
    </ThemeProvider>
  )
}
