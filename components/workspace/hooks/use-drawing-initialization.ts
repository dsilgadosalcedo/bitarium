"use client"

import { useAuth } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { useEffect, useRef } from "react"
import { api } from "../../../convex/_generated/api"
import { useDrawing } from "../../../context/drawing-context"

export function useDrawingInitialization() {
  const { currentDrawingId, setCurrentDrawingId, isHydrated } = useDrawing()
  const { isLoaded, isSignedIn } = useAuth()
  const ensureInitialDrawing = useMutation(api.drawings.ensureInitialDrawing)
  const hasInitializedRef = useRef(false)

  const shouldInitialize =
    isHydrated && !currentDrawingId && isLoaded && isSignedIn

  useEffect(() => {
    if (!shouldInitialize || hasInitializedRef.current) {
      return
    }

    hasInitializedRef.current = true

    void ensureInitialDrawing({})
      .then((drawingId) => {
        setCurrentDrawingId(drawingId)
      })
      .catch((error) => {
        hasInitializedRef.current = false
        console.error("Failed to create initial drawing:", error)
      })
  }, [ensureInitialDrawing, setCurrentDrawingId, shouldInitialize])
}
