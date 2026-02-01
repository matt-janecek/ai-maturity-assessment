import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'AI Maturity Assessment | Donyati',
  description: 'Discover your organization\'s AI maturity level with our free 5-minute assessment. Get personalized insights and recommendations.',
  keywords: ['AI maturity', 'AI assessment', 'enterprise AI', 'digital transformation', 'AI strategy'],
  authors: [{ name: 'Donyati' }],
  openGraph: {
    title: 'AI Maturity Assessment | Donyati',
    description: 'Discover your organization\'s AI maturity level with our free 5-minute assessment.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
