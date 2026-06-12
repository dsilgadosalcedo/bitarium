"use client"

import { createContext, use, type ReactNode } from "react"

import { type SignInPanelLayout } from "./constants/grid-layout"
import { useSignInPanelLayout } from "./hooks/use-sign-in-panel-layout"

const PanelLayoutContext = createContext<SignInPanelLayout | null>(null)

export function PanelLayoutProvider({ children }: { children: ReactNode }) {
  const panelLayout = useSignInPanelLayout()

  return <PanelLayoutContext value={panelLayout}>{children}</PanelLayoutContext>
}

export function usePanelLayout() {
  const panelLayout = use(PanelLayoutContext)

  if (!panelLayout) {
    throw new Error("usePanelLayout must be used within PanelLayoutProvider")
  }

  return panelLayout
}
