import type { MetadataRoute } from "next"

import { ROBOTS_DISALLOW_PATHS } from "@/lib/public-routes"
import { absoluteUrl } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: [...ROBOTS_DISALLOW_PATHS]
    },
    sitemap: absoluteUrl("/sitemap.xml")
  }
}
