"use client"

import { useClerk, useSignIn, useSignUp } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

export default function SsoCallbackPage() {
  const clerk = useClerk()
  const { signIn } = useSignIn()
  const { signUp } = useSignUp()
  const router = useRouter()
  const hasRun = useRef(false)

  const navigateToSignIn = () => {
    router.push("/sign-in")
  }

  const finalizeSignIn = async () => {
    await signIn.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) {
          router.push(`/sign-in/tasks/${session.currentTask.key}`)
          return
        }

        const url = decorateUrl("/app")
        if (url.startsWith("http")) {
          window.location.href = url
        } else {
          router.push(url)
        }
      }
    })
  }

  const finalizeSignUp = async () => {
    await signUp.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) {
          router.push(`/sign-in/tasks/${session.currentTask.key}`)
          return
        }

        const url = decorateUrl("/app")
        if (url.startsWith("http")) {
          window.location.href = url
        } else {
          router.push(url)
        }
      }
    })
  }

  useEffect(() => {
    void (async () => {
      if (!clerk.loaded || hasRun.current) {
        return
      }

      hasRun.current = true

      if (signIn.status === "complete") {
        await finalizeSignIn()
        return
      }

      if (signUp.isTransferable) {
        await signIn.create({ transfer: true })
        const signInStatus = signIn.status as typeof signIn.status | "complete"
        if (signInStatus === "complete") {
          await finalizeSignIn()
          return
        }

        navigateToSignIn()
        return
      }

      if (
        signIn.status === "needs_first_factor" &&
        !signIn.supportedFirstFactors?.every(
          (factor) => factor.strategy === "enterprise_sso"
        )
      ) {
        navigateToSignIn()
        return
      }

      if (signIn.isTransferable) {
        await signUp.create({ transfer: true })
        if (signUp.status === "complete") {
          await finalizeSignUp()
          return
        }

        router.push("/sign-in/continue")
        return
      }

      if (signUp.status === "complete") {
        await finalizeSignUp()
        return
      }

      if (
        signIn.status === "needs_second_factor" ||
        signIn.status === "needs_new_password"
      ) {
        navigateToSignIn()
        return
      }

      if (signIn.existingSession || signUp.existingSession) {
        const sessionId =
          signIn.existingSession?.sessionId || signUp.existingSession?.sessionId

        if (sessionId) {
          await clerk.setActive({
            session: sessionId,
            navigate: ({ session, decorateUrl }) => {
              if (session?.currentTask) {
                router.push(`/sign-in/tasks/${session.currentTask.key}`)
                return
              }

              const url = decorateUrl("/app")
              if (url.startsWith("http")) {
                window.location.href = url
              } else {
                router.push(url)
              }
            }
          })
        }
      }
    })()
  }, [clerk, signIn, signUp, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div id="clerk-captcha" />
    </div>
  )
}
