import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { SiteJsonLd } from "@/components/seo/site-json-ld"
import ConvexClientProvider from "@/components/convex-client-provider"
import {
  createPageMetadata,
  getSiteUrl,
  PUBLISHER_NAME,
  PUBLISHER_URL,
  SITE_DESCRIPTION,
  SITE_NAME
} from "@/lib/seo"
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server"

import "../styles/globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  applicationName: SITE_NAME,
  authors: [{ name: PUBLISHER_NAME, url: PUBLISHER_URL }],
  creator: PUBLISHER_NAME,
  publisher: PUBLISHER_NAME,
  category: "design",
  ...createPageMetadata({
    description: SITE_DESCRIPTION
  }),
  icons: {
    icon: [{ url: "/app.svg", type: "image/svg+xml" }]
  },
  appleWebApp: {
    title: SITE_NAME,
    capable: true,
    statusBarStyle: "default"
  },
  formatDetection: {
    telephone: false
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        >
          <SiteJsonLd />
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  )
}
