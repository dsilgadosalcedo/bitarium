import type { Metadata } from "next"

import { GoogleOneTapPrompt } from "@/components/auth/google-one-tap-prompt"
import { LandingHero } from "@/components/landing/landing-hero"
import { LandingMarketing } from "@/components/landing/landing-marketing"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  path: "/"
})

export default function Home() {
  return (
    <>
      <GoogleOneTapPrompt />
      <LandingHero />
      <LandingMarketing />
    </>
  )
}
