"use client"

import { useEffect, useState } from "react"

export const SIGN_IN_SSR_VIEWPORT = {
  width: 1280,
  height: 720
} as const

export function useViewportSize() {
  const [size, setSize] = useState<{ width: number; height: number }>(
    SIGN_IN_SSR_VIEWPORT
  )

  useEffect(() => {
    const update = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return size
}
