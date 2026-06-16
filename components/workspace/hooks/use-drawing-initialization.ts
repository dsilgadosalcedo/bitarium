"use client"

import { useEffect } from "react"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { useDrawing } from "../../../context/drawing-context"

export function useDrawingInitialization() {
  const { currentDrawingId, setCurrentDrawingId, isHydrated } = useDrawing()
  const shouldInitialize = isHydrated && !currentDrawingId
  const initialDrawingId = useQuery(
    api.drawings.getInitialDrawingId,
    shouldInitialize ? {} : "skip"
  )

  useEffect(() => {
    // Only initialize if we have data and no current drawing ID
    if (!shouldInitialize) {
      return
    }

    if (initialDrawingId !== undefined) {
      setCurrentDrawingId(initialDrawingId ?? crypto.randomUUID())
    }
  }, [initialDrawingId, setCurrentDrawingId, shouldInitialize])
}
