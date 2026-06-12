import { NextRequest } from "next/server"

/**
 * Portless terminates TLS and forwards to Next.js over HTTP on an ephemeral port.
 * Convex Auth treats mismatched Origin/Host/protocol as cross-site and blocks
 * sign-in with a plain-text "Invalid origin" response.
 */
export function rewriteRequestForPublicOrigin(
  request: NextRequest
): NextRequest {
  const portlessUrl = process.env.PORTLESS_URL
  if (!portlessUrl) {
    return request
  }

  let publicOrigin: URL
  try {
    publicOrigin = new URL(portlessUrl)
  } catch {
    return request
  }

  const publicUrl = new URL(
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
    publicOrigin
  )

  if (publicUrl.toString() === request.url) {
    return request
  }

  const init: ConstructorParameters<typeof NextRequest>[1] = {
    method: request.method,
    headers: request.headers
  }

  if (request.body) {
    init.body = request.body
    init.duplex = "half"
  }

  const rewritten = new NextRequest(publicUrl, init)

  // Host is a forbidden header on construction, but Convex Auth compares it
  // against Origin when deciding whether auth POSTs are same-origin.
  rewritten.headers.set("host", publicOrigin.host)

  return rewritten
}
