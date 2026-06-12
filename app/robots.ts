import type { MetadataRoute } from "next"

import { getPublicSiteUrl } from "@/lib/site-url"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getPublicSiteUrl()

  return {
    rules: {
      userAgent: "*",
      disallow: "/"
    },
    sitemap: new URL("/sitemap.xml", baseUrl).toString()
  }
}
