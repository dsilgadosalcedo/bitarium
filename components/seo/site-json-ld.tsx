import { siteJsonLdSchemas } from "@/lib/seo"

import { JsonLd } from "./json-ld"

export function SiteJsonLd() {
  return <JsonLd schemas={siteJsonLdSchemas()} />
}
