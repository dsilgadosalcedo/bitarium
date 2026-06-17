"use client"

import {
  getLoginErrorZoneLayout,
  type SignInPanelLayout
} from "../constants/grid-layout"
import { type AuthFlow } from "../types"
import { ErrorMessage } from "./error-message"
import { px } from "../utils/px"

const errorZoneClass =
  "flex h-full w-full items-center justify-center rounded-none border border-[var(--sign-in-grid-line)] bg-[var(--sign-in-error-bg)] px-3 py-1 text-sm font-medium text-[var(--sign-in-error-text)] shadow-none"

interface SignInErrorZoneProps {
  panelLayout: SignInPanelLayout
  flow: AuthFlow
  pendingVerification: AuthFlow | null
  error: string | null
}

export function SignInErrorZone({
  panelLayout,
  flow,
  pendingVerification,
  error
}: SignInErrorZoneProps) {
  const zone = getLoginErrorZoneLayout(panelLayout)
  const showCaptcha = flow === "signUp" && !pendingVerification && !error

  if (!error && !showCaptcha) {
    return null
  }

  return (
    <section
      aria-label={error ? "Sign in errors" : "Sign up verification"}
      aria-live="polite"
      className="absolute z-10 overflow-visible"
      style={{
        left: px(zone.left),
        top: px(zone.top),
        width: px(zone.width),
        height: px(zone.height)
      }}
    >
      {error ? (
        <div className={errorZoneClass}>
          <ErrorMessage error={error} />
        </div>
      ) : (
        <div
          id="clerk-captcha"
          className="flex h-full w-full items-center justify-center"
        />
      )}
    </section>
  )
}
