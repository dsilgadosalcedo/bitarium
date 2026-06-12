import type { Metadata } from "next"

import { LegalPage } from "@/components/legal/legal-page"
import { LegalPageJsonLd } from "@/components/seo/legal-page-json-ld"
import { loadLegalDocument } from "@/lib/legal/load-legal-document"
import { TERMS_OF_SERVICE_PATH } from "@/lib/legal/constants"
import { renderLegalMarkdown } from "@/lib/legal/render-legal-markdown"
import { createPageMetadata } from "@/lib/seo"

const PATH = TERMS_OF_SERVICE_PATH
const TITLE = "Terms of Use"
const DESCRIPTION =
  "Read the terms that govern your access to Bitarium, your drawings, collaboration, and acceptable use."

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
})

export default function TermsOfServicePage() {
  const content = loadLegalDocument("terms-of-service.md")

  return (
    <>
      <LegalPageJsonLd path={PATH} title={TITLE} description={DESCRIPTION} />
      <LegalPage
        title={TITLE}
        lastUpdated="May 30, 2022 (effective June 1, 2022)"
        currentPage="terms"
      >
        {renderLegalMarkdown(content)}
      </LegalPage>
    </>
  )
}
