import { HELP_CENTER_PATH } from "@/lib/help-routes"
import { breadcrumbListSchema, faqPageSchema, webPageSchema } from "@/lib/seo"

import { JsonLd } from "./json-ld"

export function HelpPageJsonLd({
  path,
  title,
  description,
  faq
}: {
  path: string
  title: string
  description: string
  faq?: Array<{ question: string; answer: string }>
}) {
  const schemas: Array<Record<string, unknown>> = [
    webPageSchema({ path, title, description }),
    breadcrumbListSchema([
      { name: "Help Center", path: HELP_CENTER_PATH },
      { name: title, path }
    ])
  ]

  if (faq?.length) {
    schemas.push(faqPageSchema(faq))
  }

  return <JsonLd schemas={schemas} />
}
