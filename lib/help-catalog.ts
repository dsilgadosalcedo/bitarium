export type HelpArticleCategory =
  | "Basics"
  | "Canvas"
  | "Organization"
  | "Collaboration"

export type HelpArticleSlug =
  | "getting-started"
  | "drawing-on-the-canvas"
  | "folders-and-organization"
  | "sharing-and-collaboration"

export type HelpArticleEntry = {
  slug: HelpArticleSlug
  title: string
  description: string
  category: HelpArticleCategory
  changeFrequency: "monthly" | "yearly"
  priority: number
}

export const HELP_ARTICLES = [
  {
    slug: "getting-started",
    title: "Getting started with Bitarium",
    description:
      "Create an account, open your workspace, and save your first drawing on the infinite canvas.",
    category: "Basics",
    changeFrequency: "monthly",
    priority: 0.55
  },
  {
    slug: "drawing-on-the-canvas",
    title: "Drawing on the canvas",
    description:
      "Use Excalidraw-powered tools, themes, and auto-save while you sketch and diagram.",
    category: "Canvas",
    changeFrequency: "monthly",
    priority: 0.5
  },
  {
    slug: "folders-and-organization",
    title: "Folders and organization",
    description:
      "Group drawings into folders, customize icons and colors, and keep your sidebar tidy.",
    category: "Organization",
    changeFrequency: "monthly",
    priority: 0.5
  },
  {
    slug: "sharing-and-collaboration",
    title: "Sharing and collaboration",
    description:
      "Invite collaborators to a drawing and edit together with real-time sync.",
    category: "Collaboration",
    changeFrequency: "monthly",
    priority: 0.5
  }
] as const satisfies ReadonlyArray<HelpArticleEntry>

export function helpArticlePath(slug: HelpArticleSlug): string {
  return `/help/${slug}`
}

export const HELP_ARTICLES_BY_CATEGORY = HELP_ARTICLES.reduce(
  (groups, article) => {
    const list = groups.get(article.category) ?? []
    list.push(article)
    groups.set(article.category, list)
    return groups
  },
  new Map<HelpArticleCategory, HelpArticleEntry[]>()
)
