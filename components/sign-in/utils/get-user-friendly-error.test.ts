import { describe, expect, it } from "vitest"
import { getUserFriendlyError } from "./get-user-friendly-error"

describe("getUserFriendlyError", () => {
  it("maps invalid credentials to a clear sign-in message", () => {
    expect(
      getUserFriendlyError(new Error("form_password_incorrect"), "signIn")
    ).toBe("Wrong username or password.")
    expect(
      getUserFriendlyError(new Error("form_identifier_not_found"), "signIn")
    ).toBe("Wrong username or password.")
    expect(
      getUserFriendlyError(new Error("Invalid credentials"), "signIn")
    ).toBe("Wrong username or password.")
  })

  it("maps duplicate accounts during sign up", () => {
    expect(
      getUserFriendlyError(new Error("form_identifier_exists"), "signUp")
    ).toBe("That username is already taken. Sign in instead.")
  })

  it("reads nested clerk errors", () => {
    const error = new Error("Sign in failed")
    error.cause = new Error("form_password_incorrect")

    expect(getUserFriendlyError(error, "signIn")).toBe(
      "Wrong username or password."
    )
  })

  it("maps rate limiting", () => {
    expect(getUserFriendlyError(new Error("too_many_requests"), "signIn")).toBe(
      "Too many failed attempts. Please wait a moment and try again."
    )
  })
})
