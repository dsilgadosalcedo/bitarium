"use client"

import { H1, Muted } from "@/components/ui/typography"
import { type AuthFlow } from "../types"

const HEADER_COPY: Record<AuthFlow, { title: string; subtitle: string }> = {
  signIn: {
    title: "Hi there!",
    subtitle: "Please sign in to continue."
  },
  signUp: {
    title: "Create your account",
    subtitle: "You are about to start."
  }
}

export function SignInHeader({ flow }: { flow: AuthFlow }) {
  const { title, subtitle } = HEADER_COPY[flow]

  return (
    <div className="text-center flex flex-col items-center gap-2">
      <H1 className="text-2xl font-bold">{title}</H1>
      <Muted>{subtitle}</Muted>
    </div>
  )
}
