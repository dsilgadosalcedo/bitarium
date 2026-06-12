import type { Metadata } from "next"

import { getPublicSiteUrl } from "@/lib/site-url"

export const SITE_NAME = "Bitarium"

export const SITE_TITLE =
  "Bitarium | An infinite canvas for thinking, designing, and organizing ideas"

export const SITE_DESCRIPTION =
  "Bitarium is a calm infinite canvas for sketches, diagrams, and whiteboards. Organize drawings in folders, collaborate in real time, and auto-save every stroke."

export const PUBLISHER_NAME =
  process.env.NEXT_PUBLIC_PUBLISHER_NAME?.trim() || "7Lineas"

export const PUBLISHER_URL =
  process.env.NEXT_PUBLIC_PUBLISHER_URL?.trim() || "https://7lineas.com"

export const SEO_LOCALE = "en_US"

export function getSiteUrl(): URL {
  return new URL(getPublicSiteUrl())
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, getSiteUrl()).toString()
}

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  noIndex = false
}: {
  title?: string
  description?: string
  path?: string
  noIndex?: boolean
} = {}): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE
  const ogImagePath = "/opengraph-image"

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title: pageTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: SEO_LOCALE,
      type: "website",
      images: [
        {
          url: ogImagePath,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${SITE_DESCRIPTION}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImagePath]
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false
          }
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
          }
        }
  }
}

export function publisherOrganizationNode() {
  return {
    "@type": "Organization" as const,
    name: PUBLISHER_NAME,
    url: PUBLISHER_URL
  }
}

export function softwareApplicationSchema() {
  const siteUrl = getPublicSiteUrl()

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "DesignApplication",
    applicationSubCategory: "GraphicsApplication",
    operatingSystem: "Web",
    url: siteUrl,
    inLanguage: SEO_LOCALE.replace("_", "-"),
    description: SITE_DESCRIPTION,
    publisher: publisherOrganizationNode()
  }
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    ...publisherOrganizationNode(),
    brand: {
      "@type": "Brand",
      name: SITE_NAME
    }
  }
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getPublicSiteUrl(),
    description: SITE_DESCRIPTION,
    inLanguage: SEO_LOCALE.replace("_", "-"),
    publisher: publisherOrganizationNode()
  }
}

export function siteJsonLdSchemas(): Array<Record<string, unknown>> {
  return [organizationSchema(), webSiteSchema(), softwareApplicationSchema()]
}

export function webPageSchema({
  path,
  title,
  description
}: {
  path: string
  title: string
  description: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    inLanguage: SEO_LOCALE.replace("_", "-"),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: getPublicSiteUrl()
    },
    publisher: publisherOrganizationNode()
  }
}

export function breadcrumbListSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  }
}

export function faqPageSchema(
  items: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  }
}
