import path from "node:path"

import { clerkSetup } from "@clerk/testing/playwright"
import { test as setup } from "@playwright/test"
import dotenv from "dotenv"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

process.env.CLERK_PUBLISHABLE_KEY ??=
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

setup.describe.configure({ mode: "serial" })

setup("clerk testing setup", async () => {
  await clerkSetup()
})
