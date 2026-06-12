import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect
} from "@convex-dev/auth/nextjs/server"
import { AUTH_PATHS, SIGN_IN_PATH } from "@/lib/auth-routes"
import { rewriteRequestForPublicOrigin } from "@/lib/rewrite-proxy-request"

const isAuthPage = createRouteMatcher(AUTH_PATHS)
const isAppPage = createRouteMatcher(["/app"])
const isLandingPage = createRouteMatcher(["/"])

const authMiddleware = convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {
    const isAuthenticated = await convexAuth.isAuthenticated()

    if (isAuthPage(request) && isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/app")
    }

    if (isLandingPage(request) && isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/app")
    }

    if (isAppPage(request) && !isAuthenticated) {
      return nextjsMiddlewareRedirect(request, SIGN_IN_PATH)
    }
  }
)

export default function proxy(
  request: Parameters<typeof authMiddleware>[0],
  event: Parameters<typeof authMiddleware>[1]
) {
  return authMiddleware(rewriteRequestForPublicOrigin(request), event)
}

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
}
