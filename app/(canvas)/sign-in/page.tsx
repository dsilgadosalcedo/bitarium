import type { Metadata } from "next"

import { SignIn } from "@/components/sign-in/components/sign-in"
import { SIGN_IN_PATH } from "@/lib/auth-routes"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Sign in",
  description: "Sign in to your Bitarium workspace.",
  path: SIGN_IN_PATH,
  noIndex: true
})

export default function SignInPage() {
  return <SignIn flow="signIn" />
}
