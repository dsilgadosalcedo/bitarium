"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthActions } from "@convex-dev/auth/react"
import { type AuthFlow } from "../types"
import { getUserFriendlyError } from "../utils/get-user-friendly-error"

export function useSignInForm(flow: AuthFlow) {
  const { signIn } = useAuthActions()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setError(null)
    formData.set("flow", flow)

    try {
      const result = await signIn("password", formData)

      if (!result.signingIn) {
        setError(
          flow === "signIn"
            ? "Wrong username or password."
            : "Couldn't create your account. Please try again."
        )
        setLoading(false)
        return
      }

      router.push("/app")
    } catch (error) {
      console.error("Authentication error:", error)
      setError(getUserFriendlyError(error, flow))
      setLoading(false)
    }
  }

  return {
    flow,
    error,
    loading,
    handleSubmit
  }
}
