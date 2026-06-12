"use client"

import { type AuthFlow } from "../types"

interface FlowToggleProps {
  flow: AuthFlow
  onToggle: () => void
}

export function FlowToggle({ flow, onToggle }: FlowToggleProps) {
  return (
    <div className="flex flex-row gap-2 text-sm justify-center">
      <span className="text-[var(--sign-in-card-muted)]">
        {flow === "signIn"
          ? "Don't have an account?"
          : "Already have an account?"}
      </span>
      <span
        className="cursor-pointer font-medium text-[var(--sign-in-card-text)] decoration-2 underline-offset-2 hover:underline"
        onClick={onToggle}
      >
        {flow === "signIn" ? "Sign up" : "Sign in"}
      </span>
    </div>
  )
}
