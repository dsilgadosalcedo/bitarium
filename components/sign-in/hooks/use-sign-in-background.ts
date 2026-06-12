"use client"

import { useCallback, useSyncExternalStore, type CSSProperties } from "react"
import {
  SIGN_IN_BACKGROUND_STORAGE_KEY,
  getSignInBackgroundColor,
  isSignInBackgroundId,
  type SignInBackgroundId
} from "../constants/sign-in-background"

const DEFAULT_BACKGROUND_ID: SignInBackgroundId = "black"

const backgroundListeners = new Set<() => void>()

function readStoredBackgroundId(): SignInBackgroundId {
  try {
    const stored = localStorage.getItem(SIGN_IN_BACKGROUND_STORAGE_KEY)
    if (stored && isSignInBackgroundId(stored)) {
      return stored
    }
  } catch {
    // localStorage may be unavailable
  }

  return DEFAULT_BACKGROUND_ID
}

function subscribeToBackground(listener: () => void) {
  backgroundListeners.add(listener)
  return () => backgroundListeners.delete(listener)
}

function getBackgroundSnapshot(): SignInBackgroundId {
  return readStoredBackgroundId()
}

function getServerBackgroundSnapshot(): SignInBackgroundId {
  return DEFAULT_BACKGROUND_ID
}

function emitBackgroundChange() {
  backgroundListeners.forEach((listener) => listener())
}

export function useSignInBackground() {
  const backgroundId = useSyncExternalStore(
    subscribeToBackground,
    getBackgroundSnapshot,
    getServerBackgroundSnapshot
  )

  const setBackgroundId = useCallback((id: SignInBackgroundId) => {
    try {
      localStorage.setItem(SIGN_IN_BACKGROUND_STORAGE_KEY, id)
    } catch {
      // localStorage may be unavailable
    }
    emitBackgroundChange()
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
