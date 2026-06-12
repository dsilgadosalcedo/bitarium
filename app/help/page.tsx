import Link from "next/link"

import {
  HELP_ARTICLES_BY_CATEGORY,
  helpArticlePath,
  type HelpArticleCategory
} from "@/lib/help-routes"

const CATEGORY_ORDER: HelpArticleCategory[] = [
  "Basics",
  "Canvas",
  "Organization",
  "Collaboration"
]

export default function HelpCenterPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Help Center</h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          Step-by-step guides for Bitarium — from your first sketch to sharing a
          live canvas with your team.
        </p>
      </div>

      {CATEGORY_ORDER.map((category) => {
        const articles = HELP_ARTICLES_BY_CATEGORY.get(category)
        if (!articles?.length) {
          return null
        }

        return (
          <section key={category} aria-labelledby={`help-${category}`}>
            <h2
              id={`help-${category}`}
              className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase"
            >
              {category}
            </h2>
            <ul className="divide-y divide-border/60 rounded-lg border border-border/60">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={helpArticlePath(article.slug)}
                    className="flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-muted/30"
                  >
                    <span className="text-base font-medium">
                      {article.title}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {article.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
