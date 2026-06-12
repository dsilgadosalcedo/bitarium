import Link from "next/link"

import { LandingAppPreview } from "@/components/landing/landing-app-preview"
import { SIGN_IN_PATH, SIGN_UP_PATH } from "@/lib/auth-routes"
import {
  HELP_DRAWING_ON_CANVAS_PATH,
  HELP_FOLDERS_PATH,
  HELP_GETTING_STARTED_PATH,
  HELP_SHARING_PATH
} from "@/lib/help-routes"
import {
  PRIVACY_POLICY_PATH,
  TERMS_OF_SERVICE_PATH
} from "@/lib/legal/constants"

const FEATURES = [
  {
    title: "Excalidraw-powered canvas",
    description:
      "Sketch diagrams, wireframes, and whiteboards with a familiar toolset, smooth panning, and an infinite workspace.",
    href: HELP_DRAWING_ON_CANVAS_PATH,
    linkLabel: "Learn about the canvas"
  },
  {
    title: "Folders that stay organized",
    description:
      "Group drawings by project, give folders custom colors and icons, and expand only what you need in the sidebar.",
    href: HELP_FOLDERS_PATH,
    linkLabel: "See folder tips"
  },
  {
    title: "Real-time collaboration",
    description:
      "Invite collaborators to a drawing and see updates instantly across every connected client.",
    href: HELP_SHARING_PATH,
    linkLabel: "Read the sharing guide"
  },
  {
    title: "Auto-save by default",
    description:
      "Every stroke is saved as you work, so ideas stay safe even when you jump between drawings.",
    href: HELP_GETTING_STARTED_PATH,
    linkLabel: "Get started"
  }
] as const

export function LandingMarketing() {
  return (
    <div className="relative z-10 bg-background text-foreground">
      <section
        id="features"
        aria-labelledby="features-heading"
        className="scroll-mt-6 border-t border-border/60 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-pretty text-center">
            <h2
              id="features-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Draw, organize, and collaborate without friction
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
              Bitarium combines a focused canvas with a workspace sidebar so
              sketches stay easy to find and share.
            </p>
          </div>

          <LandingAppPreview />

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <article
                key={feature.href}
                className="rounded-xl border border-border/70 bg-card/40 p-6 text-left"
              >
                <h3 className="text-lg font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                <Link
                  href={feature.href}
                  className="mt-4 inline-flex text-sm font-medium text-[#6a65db] underline-offset-4 hover:underline"
                >
                  {feature.linkLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="use-cases-heading"
        className="border-t border-border/60 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-6">
          <h2
            id="use-cases-heading"
            className="text-pretty text-center text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Made for visual thinking
          </h2>
          <ul className="mt-10 space-y-4 text-base leading-relaxed text-muted-foreground">
            <li>
              <strong className="font-medium text-foreground">
                Product and UX teams
              </strong>{" "}
              — map flows, annotate wireframes, and keep workshop output in one
              place.
            </li>
            <li>
              <strong className="font-medium text-foreground">
                Engineering diagrams
              </strong>{" "}
              — whiteboard architecture, sequence ideas, and revisit sketches
              without digging through exports.
            </li>
            <li>
              <strong className="font-medium text-foreground">
                Teaching and workshops
              </strong>{" "}
              — share a live canvas with collaborators and build together in
              real time.
            </li>
          </ul>
          <p className="mt-8 text-center">
            <Link
              href={HELP_GETTING_STARTED_PATH}
              className="text-sm font-medium text-[#6a65db] underline-offset-4 hover:underline"
            >
              Read the getting started guide
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-border/60 py-16 text-pretty text-center sm:py-20">
        <div className="mx-auto max-w-xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Open your canvas
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">
            Create a free account, start drawing, and invite collaborators when
            you are ready.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={SIGN_UP_PATH}
              className="inline-flex h-11 min-w-40 items-center justify-center border border-[#6a65db] bg-[#6a65db] px-8 text-base font-semibold text-white transition-colors hover:bg-[#5b56c7]"
            >
              Create your workspace
            </Link>
            <Link
              href="/help"
              className="inline-flex h-11 min-w-40 items-center justify-center border border-border px-8 text-base font-semibold transition-colors hover:bg-muted/40"
            >
              Browse help center
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Bitarium</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-end">
            <Link
              href="/help"
              className="transition-colors hover:text-foreground"
            >
              Help center
            </Link>
            <Link
              href={TERMS_OF_SERVICE_PATH}
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href={PRIVACY_POLICY_PATH}
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href={SIGN_IN_PATH}
              className="transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
