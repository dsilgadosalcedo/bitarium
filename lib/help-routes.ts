import {
  HELP_ARTICLES,
  HELP_ARTICLES_BY_CATEGORY,
  helpArticlePath,
  type HelpArticleCategory,
  type HelpArticleSlug
} from "@/lib/help-catalog"

export const HELP_CENTER_PATH = "/help"

export const HELP_GETTING_STARTED_PATH = helpArticlePath("getting-started")
export const HELP_DRAWING_ON_CANVAS_PATH = helpArticlePath(
  "drawing-on-the-canvas"
)
export const HELP_FOLDERS_PATH = helpArticlePath("folders-and-organization")
export const HELP_SHARING_PATH = helpArticlePath("sharing-and-collaboration")

export {
  HELP_ARTICLES,
  HELP_ARTICLES_BY_CATEGORY,
  helpArticlePath,
  type HelpArticleCategory,
  type HelpArticleSlug
}
