"use client"

import { Loader2Icon } from "lucide-react"
import { type SignInPanelSectionLayout } from "../constants/grid-layout"
import { type AuthFlow } from "../types"
import { GoogleIcon } from "./google-icon"
import { SignInFormFields } from "./sign-in-form-fields"

interface SignInFormProps {
  flow: AuthFlow
  loading: boolean
  pendingVerification: AuthFlow | null
  onSubmit: (formData: FormData) => void
  onGoogleAuth: () => void
  sectionLayout: SignInPanelSectionLayout
  fieldClassName: string
  buttonClassName: string
  googleButtonClassName: string
}

export function SignInForm({
  flow,
  loading,
  pendingVerification,
  onSubmit,
  onGoogleAuth,
  sectionLayout,
  fieldClassName,
  buttonClassName,
  googleButtonClassName
}: SignInFormProps) {
  const {
    columnSpan,
    passwordInputColumn,
    passwordToggleColumn,
    submitGoogleColumn,
    submitPasswordColumn,
    rows
  } = sectionLayout

  const submitRow = flow === "signUp" ? rows.submitSignUp : rows.submitSignIn
  const passwordLabel = flow === "signIn" ? "Sign in" : "Sign up"

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

      {pendingVerification ? (
        <div
          className="h-full w-full"
          style={{ gridColumn: columnSpan, gridRow: submitRow }}
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
            ) : (
              "Verify"
            )}
          </button>
        </div>
      ) : (
        <>
          <div
            className="h-full w-full"
            style={{ gridColumn: submitGoogleColumn, gridRow: submitRow }}
          >
            <button
              type="button"
              disabled={loading}
              onClick={onGoogleAuth}
              className={`gap-2 ${googleButtonClassName}`}
            >
              {loading ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <>
                  <GoogleIcon className="size-4 shrink-0" />
                  <span className="truncate">Google</span>
                </>
              )}
            </button>
          </div>

          <div
            className="h-full w-full"
            style={{ gridColumn: submitPasswordColumn, gridRow: submitRow }}
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
              ) : (
                passwordLabel
              )}
            </button>
          </div>
        </>
      )}
    </form>
  )
}
