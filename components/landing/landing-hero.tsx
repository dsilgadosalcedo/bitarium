"use client"

import Link from "next/link"

import { SIGN_IN_PATH, SIGN_UP_PATH } from "@/lib/auth-routes"

const ctaButtonBase =
  "inline-flex h-11 min-w-[9.5rem] cursor-pointer items-center justify-center rounded-none border px-6 text-base font-semibold shadow-none transition-colors focus-visible:border-[var(--bit-purple-foreground)] focus-visible:outline-none focus-visible:ring-0"

const getStartedButtonClass = `${ctaButtonBase} border-[#6a65db] bg-[#6a65db] text-white hover:bg-[#5b56c7]`

const signInButtonClass = `${ctaButtonBase} border-[#e8e8e8] bg-[#e8e8e8] text-[#191919] hover:bg-[#f5f5f5]`

export function LandingHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6">
      <div className="flex max-w-lg flex-col items-center gap-6 text-pretty text-center">
        <h1
          suppressHydrationWarning
          className="max-w-[19rem] text-pretty text-lg font-medium leading-relaxed tracking-tight text-neutral-300 sm:max-w-[22rem] sm:text-xl sm:leading-relaxed"
        >
          An infinite canvas for thinking, designing, and organizing ideas.
        </h1>

        <nav
          aria-label="Get started"
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link href={SIGN_UP_PATH} className={getStartedButtonClass}>
            Get started
          </Link>
          <Link href={SIGN_IN_PATH} className={signInButtonClass}>
            Sign in
          </Link>
        </nav>
      </div>

      <a
        href="#features"
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-neutral-200"
      >
        <span>Learn more</span>
        <span aria-hidden className="text-lg leading-none">
          ↓
        </span>
      </a>
    </section>
  )
}
