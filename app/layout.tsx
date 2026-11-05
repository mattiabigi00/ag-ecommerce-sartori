import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { MetaPixel } from '@/components/analytics/meta-pixel'
import { CookieBanner } from '@/components/legal/cookie-banner'
import { TrackingCapture } from '@/components/funnel/tracking-capture'
import { Anton, Caveat, Montserrat } from 'next/font/google'
import './globals.css'

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap' })
const caveat = Caveat({ subsets: ['latin'], weight: '700', variable: '--font-caveat', display: 'swap' })
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ecommerce AG',
  description: 'Funnel ecommerce AG',
  generator: 'v0.app',
  robots: { index: false, follow: false },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`light ${anton.variable} ${montserrat.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased">
        <TrackingCapture />
        <MetaPixel />
        {children}
        <CookieBanner />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
