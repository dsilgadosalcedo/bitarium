import { breadcrumbListSchema, webPageSchema } from "@/lib/seo"

import { JsonLd } from "./json-ld"

export function LegalPageJsonLd({
  path,
  title,
  description
}: {
  path: string
  title: string
  description: string
}) {
  return (
    <JsonLd
      schemas={[
        webPageSchema({ path, title, description }),
        breadcrumbListSchema([{ name: title, path }])
      ]}
    />
  )
}
