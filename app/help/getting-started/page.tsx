import type { Metadata } from "next"

import {
  HelpArticle,
  HelpInlineLink,
  HelpNote,
  HelpUiLabel
} from "@/components/help/help-ui"
import { HelpPageJsonLd } from "@/components/seo/help-page-json-ld"
import {
  HELP_DRAWING_ON_CANVAS_PATH,
  HELP_FOLDERS_PATH
} from "@/lib/help-routes"
import { createPageMetadata } from "@/lib/seo"

const PATH = "/help/getting-started"
const TITLE = "Getting started with Bitarium"
const DESCRIPTION =
  "Create an account, open your workspace, and save your first drawing on the infinite canvas."

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
})

export default function GettingStartedHelpPage() {
  return (
    <>
      <HelpPageJsonLd path={PATH} title={TITLE} description={DESCRIPTION} />
      <HelpArticle title={TITLE}>
        <p>
          Bitarium is an infinite canvas for sketches, diagrams, and
          whiteboards. This guide covers account setup, your first drawing, and
          how the workspace sidebar is organized.
        </p>

        <h2>Create your account</h2>
        <ol>
          <li>
            Open the{" "}
            <HelpInlineLink href="/sign-up">sign-up page</HelpInlineLink> and
            create an account with email, or use the{" "}
            <HelpInlineLink href="/sign-in">sign-in page</HelpInlineLink> if you
            already have one.
          </li>
          <li>
            After signing in, Bitarium opens your workspace at{" "}
            <HelpUiLabel>/app</HelpUiLabel> with the drawing sidebar and canvas.
          </li>
        </ol>

        <h2>Create your first drawing</h2>
        <ol>
          <li>
            Select <HelpUiLabel>New drawing</HelpUiLabel> from the sidebar or
            header.
          </li>
          <li>
            Pick a name for the drawing and start sketching on the canvas.
          </li>
          <li>
            Your work auto-saves as you draw — there is no manual save step.
          </li>
        </ol>
        <HelpNote>
          <p>
            Switch between light and dark themes from the workspace if you want
            a different canvas contrast while you work.
          </p>
        </HelpNote>

        <h2>Navigate the sidebar</h2>
        <ul>
          <li>
            <strong>Recent drawings</strong> — quick access to what you opened
            lately.
          </li>
          <li>
            <strong>Folders</strong> — group related drawings by project or
            topic.
          </li>
          <li>
            <strong>Shared with me</strong> — drawings where you are a
            collaborator.
          </li>
        </ul>

        <h2>Next steps</h2>
        <ul>
          <li>
            <HelpInlineLink href={HELP_DRAWING_ON_CANVAS_PATH}>
              Drawing on the canvas
            </HelpInlineLink>
          </li>
          <li>
            <HelpInlineLink href={HELP_FOLDERS_PATH}>
              Folders and organization
            </HelpInlineLink>
          </li>
        </ul>

        <p className="pt-8 text-sm text-muted-foreground">
          Return to the{" "}
          <HelpInlineLink href="/help">Help Center</HelpInlineLink>.
        </p>
      </HelpArticle>
    </>
  )
}
