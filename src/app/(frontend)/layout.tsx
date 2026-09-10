import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Libre_Franklin } from 'next/font/google'
import React from 'react'

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-libre-franklin',
  display: 'swap',
})

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { SITE_DESCRIPTION, SITE_TITLE } from '@/utilities/siteMetadata'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable, libreFranklin.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.png" rel="icon" type="image/png" sizes="512x512" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      </head>
      <body >
        <Providers>

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: 'Multimedia Entertainment Hub',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
}
