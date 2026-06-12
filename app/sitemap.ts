import type { MetadataRoute } from "next"

import { getPublicSiteUrl } from "@/lib/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getPublicSiteUrl()

  return [
    {
      url: new URL("/", baseUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1
    },
    {
      url: new URL("/privacy", baseUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2
    },
    {
      url: new URL("/terms", baseUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2
    }
  ]
}
