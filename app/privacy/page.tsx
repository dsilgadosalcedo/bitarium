import type { Metadata } from "next"

import { LegalPage } from "@/components/legal/legal-page"
import { LegalPageJsonLd } from "@/components/seo/legal-page-json-ld"
import { loadLegalDocument } from "@/lib/legal/load-legal-document"
import { PRIVACY_POLICY_PATH } from "@/lib/legal/constants"
import { renderLegalMarkdown } from "@/lib/legal/render-legal-markdown"
import { createPageMetadata } from "@/lib/seo"

const PATH = PRIVACY_POLICY_PATH
const TITLE = "Privacy Policy"
const DESCRIPTION =
  "Learn how Bitarium collects, uses, and protects your personal information and drawing data."

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
})

export default function PrivacyPolicyPage() {
  const content = loadLegalDocument("privacy-policy.md")

  return (
    <>
      <LegalPageJsonLd path={PATH} title={TITLE} description={DESCRIPTION} />
      <LegalPage
        title={TITLE}
        lastUpdated="April 29, 2021"
        currentPage="privacy"
      >
        {renderLegalMarkdown(content)}
      </LegalPage>
    </>
  )
}
