import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Showtime Barbershop | Haircuts for Men, Women & Kids in Milwaukee, WI',
  description: 'Showtime Barbershop offers sharp, family-friendly haircuts for men, women, and kids on Milwaukee’s south side. Book your next cut online today.',
  generator: 'v0.app',
  openGraph: {
    title: 'Showtime Barbershop | Your cut. Your show.',
    description: 'Sharp, family-friendly cuts on Milwaukee’s south side. Book your next cut online.',
    type: 'website',
    locale: 'en_US',
  },
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0b0c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
