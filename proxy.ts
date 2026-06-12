import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { AUTH_PATHS, SIGN_IN_PATH } from "@/lib/auth-routes"
import { rewriteRequestForPublicOrigin } from "@/lib/rewrite-proxy-request"

const isAuthPage = createRouteMatcher(AUTH_PATHS)
const isAppPage = createRouteMatcher(["/app"])
const isLandingPage = createRouteMatcher(["/"])

export default clerkMiddleware(async (auth, request) => {
  const rewrittenRequest = rewriteRequestForPublicOrigin(request)
  const { isAuthenticated } = await auth()

  if (isAuthPage(rewrittenRequest) && isAuthenticated) {
    return NextResponse.redirect(new URL("/app", rewrittenRequest.url))
  }

  if (isLandingPage(rewrittenRequest) && isAuthenticated) {
    return NextResponse.redirect(new URL("/app", rewrittenRequest.url))
  }

  if (isAppPage(rewrittenRequest) && !isAuthenticated) {
    return NextResponse.redirect(new URL(SIGN_IN_PATH, rewrittenRequest.url))
  }
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
}
