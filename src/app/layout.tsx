import type { Metadata, Viewport } from 'next'
import { Outfit, Inter } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0d0d0d',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://12o1b.com'),
  title: '12o1b - AI Technologies',
  description: 'Building Agentic Solutions. We create cutting-edge AI products that transform businesses with intelligent automation and machine learning.',
  keywords: ['AI', 'Artificial Intelligence', 'Machine Learning', 'Agentic Solutions', '12o1b', 'Technology', 'Automation'],
  authors: [{ name: '12o1b' }],
  creator: '12o1b',
  publisher: '12o1b',
  robots: 'index, follow',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://12o1b.com',
    siteName: '12o1b',
    title: '12o1b - AI Technologies',
    description: 'Building Agentic Solutions. We create cutting-edge AI products that transform businesses.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: '12o1b - AI Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '12o1b - AI Technologies',
    description: 'Building Agentic Solutions. We create cutting-edge AI products that transform businesses.',
    images: ['/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
