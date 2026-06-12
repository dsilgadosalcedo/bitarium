import { AUTH_PATHS } from "@/lib/auth-routes"
import { HELP_ARTICLES } from "@/lib/help-catalog"

/** Paths included in sitemap.xml. Auth routes are public but not indexed. */
export const PUBLIC_SEO_SITEMAP_ENTRIES = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/help", changeFrequency: "monthly" as const, priority: 0.6 },
  ...HELP_ARTICLES.map((article) => ({
    path: `/help/${article.slug}`,
    changeFrequency: article.changeFrequency,
    priority: article.priority
  })),
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.4 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.4 }
] as const

/** Paths search engines should not crawl. */
export const ROBOTS_DISALLOW_PATHS = ["/app", ...AUTH_PATHS] as const
