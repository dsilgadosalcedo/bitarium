"use client"

import Link from "next/link"

import { SIGN_IN_PATH, SIGN_UP_PATH } from "@/lib/auth-routes"
import { type AuthFlow } from "../types"

interface FlowToggleProps {
  flow: AuthFlow
}

export function FlowToggle({ flow }: FlowToggleProps) {
  const otherPath = flow === "signIn" ? SIGN_UP_PATH : SIGN_IN_PATH
  const otherLabel = flow === "signIn" ? "Sign up" : "Sign in"

  return (
    <div className="flex flex-row gap-2 text-sm justify-center">
      <span className="text-[var(--sign-in-card-muted)]">
        {flow === "signIn"
          ? "Don't have an account?"
          : "Already have an account?"}
      </span>
      <Link
        href={otherPath}
        className="font-medium text-[var(--sign-in-card-text)] decoration-2 underline-offset-2 hover:underline"
      >
        {otherLabel}
      </Link>
    </div>
  )
}
