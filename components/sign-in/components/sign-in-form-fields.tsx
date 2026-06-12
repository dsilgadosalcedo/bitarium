"use client"

import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { type AuthFlow } from "../types"
import {
  MIN_PASSWORD_LENGTH,
  SIGN_IN_FIELD_TRANSITION
} from "../constants/sign-in-constants"

const passwordToggleClass = `flex h-full w-full cursor-pointer items-center justify-center rounded-none border border-l-0 border-[var(--sign-in-grid-line)] bg-[var(--sign-in-canvas-bg)] text-[var(--sign-in-card-muted)] shadow-none ${SIGN_IN_FIELD_TRANSITION} hover:text-[var(--sign-in-card-text)] focus-visible:border-[var(--bit-purple-foreground)] focus-visible:ring-0`

interface SignInFormFieldsProps {
  flow: AuthFlow
  pendingVerification: AuthFlow | null
  fieldClassName: string
  columnSpan: string
  passwordInputColumn: string
  passwordToggleColumn: string
  usernameGridRow: string
  passwordGridRow: string
  hintGridRow: string
}

export function SignInFormFields({
  flow,
  pendingVerification,
  fieldClassName,
  columnSpan,
  passwordInputColumn,
  passwordToggleColumn,
  usernameGridRow,
  passwordGridRow,
  hintGridRow
}: SignInFormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false)

  if (pendingVerification) {
    return (
      <div style={{ gridColumn: columnSpan, gridRow: usernameGridRow }}>
        <input
          type="text"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="Verification code"
          required
          aria-label="Verification code"
          className={fieldClassName}
        />
      </div>
    )
  }

  return (
    <>
      <div style={{ gridColumn: columnSpan, gridRow: usernameGridRow }}>
        <input
          type="text"
          name="email"
          placeholder="Username"
          required
          aria-label="Username"
          autoComplete="username"
          className={fieldClassName}
        />
      </div>

      <div
        style={{ gridColumn: passwordInputColumn, gridRow: passwordGridRow }}
      >
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          minLength={MIN_PASSWORD_LENGTH}
          required
          aria-label="Password"
          autoComplete={flow === "signUp" ? "new-password" : "current-password"}
          className={fieldClassName}
        />
      </div>

      <div
        style={{ gridColumn: passwordToggleColumn, gridRow: passwordGridRow }}
      >
        <button
          type="button"
          className={passwordToggleClass}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          onClick={() => setShowPassword((current) => !current)}
        >
          {showPassword ? (
            <EyeOffIcon className="size-4" aria-hidden />
          ) : (
            <EyeIcon className="size-4" aria-hidden />
          )}
        </button>
      </div>

      {flow === "signUp" ? (
        <p
          className="flex items-center px-1 text-xs text-[var(--sign-in-card-muted)]"
          style={{ gridColumn: columnSpan, gridRow: hintGridRow }}
        >
          Password must be at least {MIN_PASSWORD_LENGTH} characters
        </p>
      ) : null}
    </>
  )
}
