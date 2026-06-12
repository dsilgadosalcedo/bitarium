"use client"

import {
  SIGN_IN_CELL_SIZE,
  getSignInPanelSectionLayout,
  type SignInPanelLayout
} from "../constants/grid-layout"
import { SignInHeader } from "./sign-in-header"
import { SignInForm } from "./sign-in-form"
import { FlowToggle } from "./flow-toggle"
import { TermsAndPrivacy } from "./terms-and-privacy"
import { SIGN_IN_FIELD_TRANSITION } from "../constants/sign-in-constants"
import { type AuthFlow } from "../types"
import { px } from "../utils/px"

const gridFieldClass = `h-full w-full rounded-none border border-[var(--sign-in-grid-line)] bg-[var(--sign-in-canvas-bg)] px-3 text-base text-[var(--sign-in-card-text)] shadow-none outline-none ${SIGN_IN_FIELD_TRANSITION} placeholder:text-[var(--sign-in-card-muted)] focus-visible:border-[var(--bit-purple-foreground)] focus-visible:ring-0`

const gridButtonClass =
  "flex h-full w-full cursor-pointer items-center justify-center rounded-none border border-[var(--sign-in-button-border)] bg-[var(--sign-in-button-bg)] text-base font-semibold text-[var(--sign-in-button-text)] shadow-none transition-colors hover:bg-[var(--sign-in-button-hover)] focus-visible:border-[var(--bit-purple-foreground)] focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"

interface SignInGridPanelProps {
  panelLayout: SignInPanelLayout
  flow: AuthFlow
  loading: boolean
  onSubmit: (formData: FormData) => void
}

export function SignInGridPanel({
  panelLayout,
  flow,
  loading,
  onSubmit
}: SignInGridPanelProps) {
  const sectionLayout = getSignInPanelSectionLayout(panelLayout.panelCols)
  const { header, columnSpan, rows } = sectionLayout
  return (
    <div
      className="absolute z-10"
      style={{
        left: px(panelLayout.left),
        top: px(panelLayout.top),
        width: px(panelLayout.width),
        height: px(panelLayout.height),
        display: "grid",
        gridTemplateColumns: `repeat(${panelLayout.panelCols}, ${px(SIGN_IN_CELL_SIZE)})`,
        gridTemplateRows: `repeat(${panelLayout.panelRows}, ${px(SIGN_IN_CELL_SIZE)})`
      }}
    >
      <section
        aria-label="Sign in header"
        className="flex flex-col items-center justify-end text-center [&_p]:text-sm"
        style={{
          gridColumn: columnSpan,
          gridRow: `${header.start} / ${header.end}`
        }}
      >
        <SignInHeader flow={flow} />
      </section>

      <SignInForm
        flow={flow}
        loading={loading}
        onSubmit={onSubmit}
        sectionLayout={sectionLayout}
        fieldClassName={gridFieldClass}
        buttonClassName={gridButtonClass}
      />

      <section aria-label="Sign in footer" className="contents">
        <div
          className="flex items-center justify-center"
          style={{ gridColumn: columnSpan, gridRow: rows.flowToggle }}
        >
          <FlowToggle flow={flow} />
        </div>

        <div
          className="flex items-end justify-center px-1 pb-[18px]"
          style={{ gridColumn: columnSpan, gridRow: rows.terms }}
        >
          <TermsAndPrivacy />
        </div>
      </section>
    </div>
  )
}
