"use client"

import { usePathname } from "next/navigation"
import { useState, type ReactNode } from "react"

import { SIGN_IN_PATH, SIGN_UP_PATH } from "@/lib/auth-routes"
import { BitariumLogoLink } from "@/components/sign-in/components/bitarium-logo-link"
import { FooterMarkLink } from "@/components/sign-in/components/footer-mark-link"
import { GridBackground } from "@/components/sign-in/components/grid-background"
import { SignInBackgroundPicker } from "@/components/sign-in/components/sign-in-background-picker"
import { useIsClientHydrated } from "../hooks/use-viewport-size"
import { useSignInBackground } from "../hooks/use-sign-in-background"
import { PanelLayoutProvider, usePanelLayout } from "../panel-layout-context"

const LANDING_PATH = "/"

function isAuthPath(pathname: string) {
  return pathname === SIGN_IN_PATH || pathname === SIGN_UP_PATH
}

function isLandingPath(pathname: string) {
  return pathname === LANDING_PATH
}

function CanvasRouteLayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isHydrated = useIsClientHydrated()
  const panelLayout = usePanelLayout()
  const { backgroundId, setBackgroundId, canvasBackgroundColor, rootStyle } =
    useSignInBackground()
  const [footerMarkHovered, setFooterMarkHovered] = useState(false)
  const isLanding = isLandingPath(pathname)
  const showAuthPanel = isAuthPath(pathname) && isHydrated
  const gridShellClass = isLanding
    ? "pointer-events-none absolute inset-x-0 top-0 z-0 h-screen"
    : "pointer-events-none fixed inset-0 z-0"

  return (
    <div className="relative bg-[var(--sign-in-canvas-bg)]" style={rootStyle}>
      <div className={gridShellClass}>
        <GridBackground
          panelLayout={showAuthPanel ? panelLayout : null}
          canvasBackground={canvasBackgroundColor}
          footerMarkHovered={footerMarkHovered}
        />
      </div>
      {isHydrated ? (
        <>
          <BitariumLogoLink />
          <SignInBackgroundPicker
            backgroundId={backgroundId}
            onBackgroundChange={setBackgroundId}
          />
          <FooterMarkLink onHoverChange={setFooterMarkHovered} />
        </>
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function CanvasRouteLayout({ children }: { children: ReactNode }) {
  return (
    <PanelLayoutProvider>
      <CanvasRouteLayoutContent>{children}</CanvasRouteLayoutContent>
    </PanelLayoutProvider>
  )
}
