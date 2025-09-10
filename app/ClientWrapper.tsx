'use client';

import { ThemeProvider } from '../lib/components/ThemeProvider'

export function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
