"use client"

import { useSignIn, useSignUp } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { type AuthFlow } from "../types"
import { getUserFriendlyError } from "../utils/get-user-friendly-error"

export function useSignInForm(flow: AuthFlow) {
  const { signIn } = useSignIn()
  const { signUp } = useSignUp()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [pendingVerification, setPendingVerification] =
    useState<AuthFlow | null>(null)

  const navigateAfterAuth = () => {
    router.push("/app")
  }

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setError(null)

    try {
      const identifier = String(formData.get("email") ?? "").trim()
      const password = String(formData.get("password") ?? "")
      const code = String(formData.get("code") ?? "").trim()
      const isEmailIdentifier = identifier.includes("@")

      if (pendingVerification) {
        if (!code) {
          setError("Enter the verification code sent to your email.")
          return
        }

        if (pendingVerification === "signIn") {
          if (!signIn) {
            setError("Authentication is not ready. Please try again.")
            return
          }

          await signIn.mfa.verifyEmailCode({ code })

          if (signIn.status === "complete") {
            await signIn.finalize({
              navigate: () => {
                navigateAfterAuth()
              }
            })
            return
          }

          setError(getUserFriendlyError(signIn, pendingVerification))
          return
        }

        if (!signUp) {
          setError("Authentication is not ready. Please try again.")
          return
        }

        await signUp.verifications.verifyEmailCode({ code })

        if (signUp.status === "complete") {
          await signUp.finalize({
            navigate: () => {
              navigateAfterAuth()
            }
          })
          return
        }

        setError(getUserFriendlyError(signUp, pendingVerification))
        return
      }

      if (flow === "signIn") {
        if (!signIn) {
          setError("Authentication is not ready. Please try again.")
          return
        }

        const { error: passwordError } = await signIn.password({
          identifier,
          password
        })

        if (passwordError) {
          setError(getUserFriendlyError(passwordError, flow))
          return
        }

        if (signIn.status === "complete") {
          await signIn.finalize({
            navigate: () => {
              navigateAfterAuth()
            }
          })
          return
        }

        if (signIn.status === "needs_client_trust") {
          await signIn.mfa.sendEmailCode()
          setPendingVerification("signIn")
          setError("Enter the verification code sent to your email.")
          return
        }

        setError(getUserFriendlyError(signIn, flow))
        return
      }

      if (!signUp) {
        setError("Authentication is not ready. Please try again.")
        return
      }

      const { error: passwordError } = await signUp.password({
        ...(isEmailIdentifier
          ? { emailAddress: identifier }
          : { username: identifier }),
        password
      })

      if (passwordError) {
        setError(getUserFriendlyError(passwordError, flow))
        return
      }

      if (
        signUp.status === "missing_requirements" &&
        signUp.unverifiedFields.includes("email_address")
      ) {
        await signUp.verifications.sendEmailCode()
        setPendingVerification("signUp")
        setError("Enter the verification code sent to your email.")
        return
      }

      if (signUp.status === "complete") {
        await signUp.finalize({
          navigate: () => {
            navigateAfterAuth()
          }
        })
        return
      }

      setError(getUserFriendlyError(signUp, flow))
    } catch (authError) {
      setError(getUserFriendlyError(authError, flow))
    } finally {
      setLoading(false)
    }
  }

  return {
    flow,
    error,
    loading,
    pendingVerification,
    handleSubmit
  }
}
