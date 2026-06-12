import type { Metadata } from "next"

import { LegalPage } from "@/components/legal/legal-page"
import { loadLegalDocument } from "@/lib/legal/load-legal-document"
import { renderLegalMarkdown } from "@/lib/legal/render-legal-markdown"

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: {
    index: true,
    follow: true
  }
}

export default function PrivacyPolicyPage() {
  const content = loadLegalDocument("privacy-policy.md")

  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="April 29, 2021"
      currentPage="privacy"
    >
      {renderLegalMarkdown(content)}
    </LegalPage>
  )
}
