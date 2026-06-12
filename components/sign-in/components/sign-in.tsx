"use client"

import { SignInGridPanel } from "@/components/sign-in/components/sign-in-grid-panel"
import { SignInErrorZone } from "@/components/sign-in/components/sign-in-error-zone"
import { useIsClientHydrated } from "../hooks/use-viewport-size"
import { useSignInForm } from "../hooks/use-sign-in-form"
import { usePanelLayout } from "../panel-layout-context"
import { type AuthFlow } from "../types"

export function SignIn({ flow }: { flow: AuthFlow }) {
  const isHydrated = useIsClientHydrated()
  const { error, loading, pendingVerification, handleSubmit } =
    useSignInForm(flow)
  const panelLayout = usePanelLayout()

  if (!isHydrated) {
    return <div className="h-screen overflow-hidden" aria-hidden />
  }

  return (
    <div className="h-screen overflow-hidden">
      <SignInGridPanel
        panelLayout={panelLayout}
        flow={flow}
        loading={loading}
        pendingVerification={pendingVerification}
        onSubmit={handleSubmit}
      />
      <SignInErrorZone panelLayout={panelLayout} error={error} />
    </div>
  )
}
