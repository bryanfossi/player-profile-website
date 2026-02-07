import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Player Profile | Recruiting Template',
  description: 'Player recruiting profile — stats, highlights, academics & contact information for college coaches.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}
