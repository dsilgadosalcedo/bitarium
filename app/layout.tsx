import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../styles/globals.css"
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server"
import ConvexClientProvider from "@/components/convex-client-provider"
import { getPublicSiteUrl } from "@/lib/site-url"

const siteName = "Bitarium"
const siteDescription =
  "A modern, collaborative drawing application built with Excalidraw, Next.js, and Convex"

const metadataBase = new URL(getPublicSiteUrl())

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteName,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  alternates: {
    canonical: "/"
  },
  robots: {
    index: false,
    follow: false
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/app.svg",
        width: 512,
        height: 512,
        alt: `${siteName} logo`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/app.svg"]
  },
  icons: {
    icon: "/app.svg"
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
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  )
}
