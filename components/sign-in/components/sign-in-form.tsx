"use client"

import { Loader2Icon } from "lucide-react"
import { type SignInPanelSectionLayout } from "../constants/grid-layout"
import { type AuthFlow } from "../types"
import { SignInFormFields } from "./sign-in-form-fields"

interface SignInFormProps {
  flow: AuthFlow
  loading: boolean
  pendingVerification: AuthFlow | null
  onSubmit: (formData: FormData) => void
  sectionLayout: SignInPanelSectionLayout
  fieldClassName: string
  buttonClassName: string
}

export function SignInForm({
  flow,
  loading,
  pendingVerification,
  onSubmit,
  sectionLayout,
  fieldClassName,
  buttonClassName
}: SignInFormProps) {
  const { columnSpan, passwordInputColumn, passwordToggleColumn, rows } =
    sectionLayout

  return (
    <form
      className="contents"
      onSubmit={async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        onSubmit(formData)
      }}
    >
      <SignInFormFields
        flow={flow}
        pendingVerification={pendingVerification}
        fieldClassName={fieldClassName}
        columnSpan={columnSpan}
        passwordInputColumn={passwordInputColumn}
        passwordToggleColumn={passwordToggleColumn}
        usernameGridRow={rows.username}
        passwordGridRow={rows.password}
        hintGridRow={rows.passwordHint}
      />

      {flow === "signUp" && !pendingVerification ? (
        <div
          id="clerk-captcha"
          style={{ gridColumn: columnSpan, gridRow: rows.passwordHint }}
        />
      ) : null}

      <div
        className="h-full w-full"
        style={{
          gridColumn: columnSpan,
          gridRow: flow === "signUp" ? rows.submitSignUp : rows.submitSignIn
        }}
      >
        <button
          type="submit"
          disabled={loading}
          className={`gap-2 ${buttonClassName}`}
        >
          {loading ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Loading
            </>
          ) : pendingVerification ? (
            "Verify"
          ) : flow === "signIn" ? (
            "Sign in"
          ) : (
            "Sign up"
          )}
        </button>
      </div>
    </form>
  )
}
