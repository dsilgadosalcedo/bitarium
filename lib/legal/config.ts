import { getPublicSiteUrl } from "@/lib/site-url"

import {
  LEGAL_SITE_NAME,
  PRIVACY_POLICY_PATH,
  TERMS_OF_SERVICE_PATH
} from "@/lib/legal/constants"

function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

export function getLegalContactEmail() {
  return requireEnv(
    "NEXT_PUBLIC_CONTACT_EMAIL",
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? process.env.CONTACT_EMAIL
  )
}

export function getLegalTemplateValues() {
  const siteUrl = getPublicSiteUrl().replace(/\/$/, "")

  return {
    SITE_NAME: LEGAL_SITE_NAME,
    CONTACT_EMAIL: getLegalContactEmail(),
    SITE_URL: siteUrl,
    PRIVACY_URL: `${siteUrl}${PRIVACY_POLICY_PATH}`,
    TERMS_URL: `${siteUrl}${TERMS_OF_SERVICE_PATH}`
  }
}
