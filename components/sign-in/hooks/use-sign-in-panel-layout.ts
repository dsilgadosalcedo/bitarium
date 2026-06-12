"use client"

import { useMemo } from "react"
import { computeSignInPanelLayout } from "../constants/grid-layout"
import { useViewportSize } from "./use-viewport-size"

export function useSignInPanelLayout() {
  const { width, height } = useViewportSize()

  return useMemo(() => computeSignInPanelLayout(width, height), [width, height])
}
