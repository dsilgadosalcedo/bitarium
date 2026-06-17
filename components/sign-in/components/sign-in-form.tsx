"use client"

import { Loader2Icon } from "lucide-react"
import { type SignInPanelSectionLayout } from "../constants/grid-layout"
import { type AuthFlow, type AuthLoadingAction } from "../types"
import { GoogleIcon } from "./google-icon"
import { SignInFormFields } from "./sign-in-form-fields"

interface SignInFormProps {
  flow: AuthFlow
  loadingAction: AuthLoadingAction
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
  loadingAction,
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
  const isLoading = loadingAction !== null

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

      {pendingVerification ? (
        <div
          className="h-full w-full"
          style={{ gridColumn: columnSpan, gridRow: submitRow }}
        >
          <button
            type="submit"
            disabled={isLoading}
            className={`gap-2 ${buttonClassName}`}
          >
            {loadingAction === "verify" ? (
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
              disabled={isLoading}
              onClick={onGoogleAuth}
              className={`gap-2 ${googleButtonClassName}`}
            >
              {loadingAction === "google" ? (
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
              disabled={isLoading}
              className={`gap-2 ${buttonClassName}`}
            >
              {loadingAction === "password" ? (
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
