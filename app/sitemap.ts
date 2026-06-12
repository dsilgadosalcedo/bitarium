import type { MetadataRoute } from "next"

import { PUBLIC_SEO_SITEMAP_ENTRIES } from "@/lib/public-routes"
import { absoluteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return PUBLIC_SEO_SITEMAP_ENTRIES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }))
}
