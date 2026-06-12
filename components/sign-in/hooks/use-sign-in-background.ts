"use client"

import { useCallback, useState, type CSSProperties } from "react"
import {
  SIGN_IN_BACKGROUND_STORAGE_KEY,
  getSignInBackgroundColor,
  isSignInBackgroundId,
  type SignInBackgroundId
} from "../constants/sign-in-background"

function readStoredBackgroundId(): SignInBackgroundId {
  try {
    const stored = localStorage.getItem(SIGN_IN_BACKGROUND_STORAGE_KEY)
    if (stored && isSignInBackgroundId(stored)) {
      return stored
    }
  } catch {
    // localStorage may be unavailable
  }

  return "black"
}

export function useSignInBackground() {
  const [backgroundId, setBackgroundIdState] = useState<SignInBackgroundId>(
    readStoredBackgroundId
  )

  const setBackgroundId = useCallback((id: SignInBackgroundId) => {
    setBackgroundIdState(id)
    try {
      localStorage.setItem(SIGN_IN_BACKGROUND_STORAGE_KEY, id)
    } catch {
      // localStorage may be unavailable
    }
  }, [])

  const canvasBackgroundColor = getSignInBackgroundColor(backgroundId)

  const rootStyle = {
    "--sign-in-canvas-bg": canvasBackgroundColor
  } as CSSProperties

  return {
    backgroundId,
    setBackgroundId,
    canvasBackgroundColor,
    rootStyle
  }
}
