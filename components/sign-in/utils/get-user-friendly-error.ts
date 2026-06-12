import { type AuthFlow } from "../types"

function collectErrorMessages(error: unknown): string[] {
  const messages: string[] = []

  const visit = (value: unknown) => {
    if (value instanceof Error) {
      messages.push(value.message)

      if ("data" in value) {
        const data = value.data
        if (typeof data === "string") {
          messages.push(data)
        } else if (
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof data.message === "string"
        ) {
          messages.push(data.message)
        }
      }

      if (value.cause !== undefined) {
        visit(value.cause)
      }
    } else if (typeof value === "string") {
      messages.push(value)
    } else if (typeof value === "object" && value !== null) {
      if ("message" in value && typeof value.message === "string") {
        messages.push(value.message)
      }
      if ("data" in value && typeof value.data === "string") {
        messages.push(value.data)
      }
    }
  }

  visit(error)
  return messages
}

export function getUserFriendlyError(error: unknown, flow: AuthFlow): string {
  const normalizedMessage = collectErrorMessages(error).join(" ").toLowerCase()

  if (normalizedMessage.includes("toomanyfailedattempts")) {
    return "Too many failed attempts. Please wait a moment and try again."
  }

  if (
    normalizedMessage.includes("invalidsecret") ||
    normalizedMessage.includes("invalidaccountid") ||
    normalizedMessage.includes("invalid credentials") ||
    normalizedMessage.includes("invalid email") ||
    normalizedMessage.includes("invalid password") ||
    normalizedMessage.includes("wrong password") ||
    (normalizedMessage.includes("password") &&
      normalizedMessage.includes("incorrect"))
  ) {
    return flow === "signIn"
      ? "Wrong username or password."
      : "Couldn't create your account. Please try again."
  }

  if (
    normalizedMessage.includes("user already exists") ||
    normalizedMessage.includes("already exists") ||
    normalizedMessage.includes("account already exists")
  ) {
    return "That username is already taken. Sign in instead."
  }

  if (
    normalizedMessage.includes("user not found") ||
    normalizedMessage.includes("account not found")
  ) {
    return flow === "signIn"
      ? "No account found with this username."
      : "Couldn't create your account. Please try again."
  }

  if (
    normalizedMessage.includes("password") &&
    (normalizedMessage.includes("at least") ||
      normalizedMessage.includes("8 characters") ||
      normalizedMessage.includes("too short"))
  ) {
    return "Password must be at least 8 characters."
  }

  return flow === "signIn"
    ? "Wrong username or password."
    : "Couldn't create your account. Please try again."
}
