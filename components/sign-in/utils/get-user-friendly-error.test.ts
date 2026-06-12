import { describe, expect, it } from "vitest"
import { getUserFriendlyError } from "./get-user-friendly-error"

describe("getUserFriendlyError", () => {
  it("maps invalid credentials to a clear sign-in message", () => {
    expect(getUserFriendlyError(new Error("InvalidSecret"), "signIn")).toBe(
      "Wrong username or password."
    )
    expect(getUserFriendlyError(new Error("InvalidAccountId"), "signIn")).toBe(
      "Wrong username or password."
    )
    expect(
      getUserFriendlyError(new Error("Invalid credentials"), "signIn")
    ).toBe("Wrong username or password.")
  })

  it("maps duplicate accounts during sign up", () => {
    expect(
      getUserFriendlyError(
        new Error("Account test@example.com already exists"),
        "signUp"
      )
    ).toBe("That username is already taken. Sign in instead.")
  })

  it("reads nested convex auth errors", () => {
    const error = new Error("[CONVEX A(auth:signIn)] Server Error")
    error.cause = new Error("InvalidSecret")

    expect(getUserFriendlyError(error, "signIn")).toBe(
      "Wrong username or password."
    )
  })

  it("maps rate limiting", () => {
    expect(
      getUserFriendlyError(new Error("TooManyFailedAttempts"), "signIn")
    ).toBe("Too many failed attempts. Please wait a moment and try again.")
  })
})
