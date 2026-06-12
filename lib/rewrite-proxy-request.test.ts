import { NextRequest } from "next/server"
import { afterEach, describe, expect, it } from "vitest"
import { rewriteRequestForPublicOrigin } from "./rewrite-proxy-request"

describe("rewriteRequestForPublicOrigin", () => {
  afterEach(() => {
    delete process.env.PORTLESS_URL
  })

  it("returns the original request when PORTLESS_URL is unset", () => {
    const request = new NextRequest("http://127.0.0.1:4132/sign-in", {
      method: "POST",
      headers: {
        host: "127.0.0.1:4132",
        origin: "https://draw.localhost"
      }
    })

    expect(rewriteRequestForPublicOrigin(request)).toBe(request)
  })

  it("rewrites the internal URL and host to the public portless origin", () => {
    process.env.PORTLESS_URL = "https://draw.localhost"

    const request = new NextRequest("http://127.0.0.1:4132/sign-in", {
      method: "POST",
      headers: {
        host: "127.0.0.1:4132",
        origin: "https://draw.localhost"
      }
    })

    const rewritten = rewriteRequestForPublicOrigin(request)

    expect(rewritten.url).toBe("https://draw.localhost/sign-in")
    expect(rewritten.headers.get("host")).toBe("draw.localhost")
  })
})
