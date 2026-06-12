import { NextRequest } from "next/server"

/**
 * Portless terminates TLS and forwards to Next.js over HTTP on an ephemeral port.
 * Clerk treats mismatched Origin/Host/protocol as cross-site during auth flows.
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

  // Host is a forbidden header on construction, but auth providers compare it
  // against Origin when deciding whether auth POSTs are same-origin.
  rewritten.headers.set("host", publicOrigin.host)

  return rewritten
}
