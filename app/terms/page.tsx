import type { Metadata } from "next"

import { LegalPage } from "@/components/legal/legal-page"
import { loadLegalDocument } from "@/lib/legal/load-legal-document"
import { renderLegalMarkdown } from "@/lib/legal/render-legal-markdown"

export const metadata: Metadata = {
  title: "Terms of Use",
  robots: {
    index: true,
    follow: true
  }
}

export default function TermsOfServicePage() {
  const content = loadLegalDocument("terms-of-service.md")

  return (
    <LegalPage
      title="Terms of Use"
      lastUpdated="May 30, 2022 (effective June 1, 2022)"
      currentPage="terms"
    >
      {renderLegalMarkdown(content)}
    </LegalPage>
  )
}
