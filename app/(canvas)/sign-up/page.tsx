import type { Metadata } from "next"

import { SignIn } from "@/components/sign-in/components/sign-in"
import { SIGN_UP_PATH } from "@/lib/auth-routes"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Sign up",
  description: "Create your Bitarium account and open your workspace.",
  path: SIGN_UP_PATH,
  noIndex: true
})

export default function SignUpPage() {
  return <SignIn flow="signUp" />
}
