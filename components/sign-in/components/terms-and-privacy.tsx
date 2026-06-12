"use client"

import Link from "next/link"
import {
  TERMS_OF_SERVICE_URL,
  PRIVACY_POLICY_URL
} from "../constants/sign-in-constants"

export function TermsAndPrivacy() {
  return (
    <p className="text-xs text-[var(--sign-in-card-muted)] text-center leading-relaxed">
      By continuing you are agreeing to our
      <br />
      <Link
        href={TERMS_OF_SERVICE_URL}
        className="font-medium hover:underline decoration-2 underline-offset-2 text-[var(--sign-in-card-text)]"
      >
        Terms of Use
      </Link>{" "}
      and{" "}
      <Link
        href={PRIVACY_POLICY_URL}
        className="font-medium hover:underline decoration-2 underline-offset-2 text-[var(--sign-in-card-text)]"
      >
        Privacy Policy
      </Link>
    </p>
  )
}
