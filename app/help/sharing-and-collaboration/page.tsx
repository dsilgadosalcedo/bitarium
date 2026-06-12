import type { Metadata } from "next"

import {
  HelpArticle,
  HelpFaq,
  HelpInlineLink,
  HelpNote,
  HelpUiLabel
} from "@/components/help/help-ui"
import { HelpPageJsonLd } from "@/components/seo/help-page-json-ld"
import { createPageMetadata } from "@/lib/seo"

import { SHARING_HELP_FAQ } from "./faq"

const PATH = "/help/sharing-and-collaboration"
const TITLE = "Sharing and collaboration"
const DESCRIPTION =
  "Invite collaborators to a drawing and edit together with real-time sync."

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
})

export default function SharingAndCollaborationHelpPage() {
  return (
    <>
      <HelpPageJsonLd
        path={PATH}
        title={TITLE}
        description={DESCRIPTION}
        faq={[...SHARING_HELP_FAQ]}
      />
      <HelpArticle title={TITLE}>
        <p>
          Share a drawing when you want someone else to view or edit the same
          canvas. Bitarium keeps everyone in sync with real-time updates.
        </p>

        <h2>Invite a collaborator</h2>
        <ol>
          <li>Open the drawing you want to share.</li>
          <li>
            Open the sharing panel from the workspace header and select{" "}
            <HelpUiLabel>Add collaborator</HelpUiLabel>.
          </li>
          <li>Enter the person&apos;s email address and send the invite.</li>
          <li>
            They receive access to that drawing in their{" "}
            <HelpUiLabel>Shared with me</HelpUiLabel> sidebar section.
          </li>
        </ol>

        <h2>Real-time editing</h2>
        <p>
          When multiple people have a drawing open, changes appear live on every
          connected client. Auto-save keeps the shared scene up to date for
          everyone.
        </p>
        <HelpNote>
          <p>
            Only the drawing owner can manage collaborators. If you cannot add
            someone, confirm you opened the sharing controls from a drawing you
            own.
          </p>
        </HelpNote>

        <h2>Drawings shared with you</h2>
        <p>
          Collaborations appear in the sidebar under shared drawings. Select one
          to jump back into the canvas with your existing permissions.
        </p>

        <HelpFaq
          items={SHARING_HELP_FAQ.map((item) => ({
            question: item.question,
            answer: <p>{item.answer}</p>
          }))}
        />

        <p className="pt-8 text-sm text-muted-foreground">
          Return to the{" "}
          <HelpInlineLink href="/help">Help Center</HelpInlineLink>.
        </p>
      </HelpArticle>
    </>
  )
}
