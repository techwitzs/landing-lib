import type { Metadata } from 'next'
import { ClientWrapper } from './ClientWrapper'

export const metadata: Metadata = {
  title: 'Advanced Design System App',
  description: 'Powered by config-driven styling with zero CSS dependencies',
  generator: 'Advanced Design System',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        lineHeight: 1.6,
      }}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}
