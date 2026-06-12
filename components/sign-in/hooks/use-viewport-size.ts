"use client"

import { useSyncExternalStore } from "react"

export const SIGN_IN_SSR_VIEWPORT = {
  width: 1280,
  height: 720
} as const

type ViewportSize = {
  width: number
  height: number
}

const SERVER_VIEWPORT_SNAPSHOT = `${SIGN_IN_SSR_VIEWPORT.width}x${SIGN_IN_SSR_VIEWPORT.height}`

function parseViewportSnapshot(snapshot: string): ViewportSize {
  const [width, height] = snapshot.split("x").map(Number)
  return { width, height }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange)
  return () => window.removeEventListener("resize", onStoreChange)
}

function getViewportSnapshot(): string {
  return `${window.innerWidth}x${window.innerHeight}`
}

export function useViewportSize() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getViewportSnapshot,
    () => SERVER_VIEWPORT_SNAPSHOT
  )

  return parseViewportSnapshot(snapshot)
}

export function useIsClientHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}
