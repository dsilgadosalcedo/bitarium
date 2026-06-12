"use client"

import {
  getLoginErrorZoneLayout,
  type SignInPanelLayout
} from "../constants/grid-layout"
import { ErrorMessage } from "./error-message"
import { px } from "../utils/px"

const errorZoneClass =
  "flex h-full w-full items-center justify-center rounded-none border border-[var(--sign-in-grid-line)] bg-[var(--sign-in-error-bg)] px-3 py-1 text-sm font-medium text-[var(--sign-in-error-text)] shadow-none"

interface SignInErrorZoneProps {
  panelLayout: SignInPanelLayout
  error: string | null
}

export function SignInErrorZone({ panelLayout, error }: SignInErrorZoneProps) {
  const zone = getLoginErrorZoneLayout(panelLayout)

  return (
    <section
      aria-label="Sign in errors"
      aria-live="polite"
      className="absolute z-10"
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
      ) : null}
    </section>
  )
}
