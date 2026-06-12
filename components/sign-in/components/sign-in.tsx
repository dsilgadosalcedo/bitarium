"use client"

import { useState } from "react"
import { FooterMarkLink } from "@/components/sign-in/components/footer-mark-link"
import { GridBackground } from "@/components/sign-in/components/grid-background"
import { SignInBackgroundPicker } from "@/components/sign-in/components/sign-in-background-picker"
import { SignInGridPanel } from "@/components/sign-in/components/sign-in-grid-panel"
import { SignInErrorZone } from "@/components/sign-in/components/sign-in-error-zone"
import { useSignInBackground } from "../hooks/use-sign-in-background"
import { useSignInForm } from "../hooks/use-sign-in-form"
import { useSignInPanelLayout } from "../hooks/use-sign-in-panel-layout"

export function SignIn() {
  const { flow, error, loading, handleSubmit, toggleFlow } = useSignInForm()
  const panelLayout = useSignInPanelLayout()
  const { backgroundId, setBackgroundId, canvasBackgroundColor, rootStyle } =
    useSignInBackground()
  const [footerMarkHovered, setFooterMarkHovered] = useState(false)

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-[var(--sign-in-canvas-bg)]"
      style={rootStyle}
    >
      <GridBackground
        panelLayout={panelLayout}
        canvasBackground={canvasBackgroundColor}
        footerMarkHovered={footerMarkHovered}
      />
      <SignInBackgroundPicker
        backgroundId={backgroundId}
        onBackgroundChange={setBackgroundId}
      />
      <SignInGridPanel
        panelLayout={panelLayout}
        flow={flow}
        loading={loading}
        onSubmit={handleSubmit}
        onToggleFlow={toggleFlow}
      />
      <SignInErrorZone panelLayout={panelLayout} error={error} />
      <FooterMarkLink onHoverChange={setFooterMarkHovered} />
    </div>
  )
}
