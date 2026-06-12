import Link from "next/link"
import type { ReactNode } from "react"

import { getLegalContactEmail } from "@/lib/legal/config"
import {
  LEGAL_SITE_NAME,
  PRIVACY_POLICY_PATH,
  TERMS_OF_SERVICE_PATH
} from "@/lib/legal/constants"

type LegalPageProps = {
  title: string
  lastUpdated: string
  currentPage: "terms" | "privacy"
  children: ReactNode
}

export function LegalPage({
  title,
  lastUpdated,
  currentPage,
  children
}: LegalPageProps) {
  const contactEmail = getLegalContactEmail()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-5">
          <Link href="/signin" className="text-sm font-medium hover:underline">
            ← Back to sign in
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            {currentPage !== "terms" ? (
              <Link
                href={TERMS_OF_SERVICE_PATH}
                className="hover:text-foreground hover:underline"
              >
                Terms
              </Link>
            ) : null}
            {currentPage !== "privacy" ? (
              <Link
                href={PRIVACY_POLICY_PATH}
                className="hover:text-foreground hover:underline"
              >
                Privacy
              </Link>
            ) : null}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-sm font-medium text-muted-foreground">
          {LEGAL_SITE_NAME}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated {lastUpdated}
        </p>
        <div className="mt-8 space-y-4">{children}</div>
        <footer className="mt-12 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          Questions? Contact us at{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="font-medium text-foreground underline underline-offset-2"
          >
            {contactEmail}
          </a>
          .
        </footer>
      </main>
    </div>
  )
}
