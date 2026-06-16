"use client"

import { useAuth } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { useEffect, useRef } from "react"
import { api } from "../../../convex/_generated/api"
import { useDrawing } from "../../../context/drawing-context"

export function useDrawingInitialization() {
  const { currentDrawingId, setCurrentDrawingId, isHydrated } = useDrawing()
  const { isLoaded, isSignedIn } = useAuth()
  const linkLegacyAccount = useMutation(api.accountLinks.linkLegacyAccount)
  const ensureInitialDrawing = useMutation(api.drawings.ensureInitialDrawing)
  const hasLinkedRef = useRef(false)
  const hasInitializedRef = useRef(false)

  const canRun = isHydrated && isLoaded && isSignedIn

  useEffect(() => {
    if (!canRun || hasLinkedRef.current) {
      return
    }

    hasLinkedRef.current = true

    void linkLegacyAccount({}).catch((error) => {
      hasLinkedRef.current = false
      console.error("Failed to link legacy account:", error)
    })
  }, [canRun, linkLegacyAccount])

  const shouldInitialize = canRun && !currentDrawingId

  useEffect(() => {
    if (!shouldInitialize || hasInitializedRef.current) {
      return
    }

    hasInitializedRef.current = true

    const initializeDrawing = async () => {
      await linkLegacyAccount({})
      return ensureInitialDrawing({})
    }

    void initializeDrawing()
      .then((drawingId) => {
        setCurrentDrawingId(drawingId)
      })
      .catch((error) => {
        hasInitializedRef.current = false
        console.error("Failed to create initial drawing:", error)
      })
  }, [
    ensureInitialDrawing,
    linkLegacyAccount,
    setCurrentDrawingId,
    shouldInitialize
  ])
}
