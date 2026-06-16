"use client"

import { GoogleOneTap } from "@clerk/nextjs"
import { useConvexAuth } from "convex/react"

const WORKSPACE_PATH = "/app"

/**
 * Google One Tap prompt (top-right) for visitors signed into Google in the browser.
 * Clerk hides this automatically once the user is authenticated.
 */
export function GoogleOneTapPrompt() {
  const { isAuthenticated, isLoading } = useConvexAuth()

  if (isLoading || isAuthenticated) {
    return null
  }

  return (
    <GoogleOneTap
      signInForceRedirectUrl={WORKSPACE_PATH}
      signUpForceRedirectUrl={WORKSPACE_PATH}
    />
  )
}
