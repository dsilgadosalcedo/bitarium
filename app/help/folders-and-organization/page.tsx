import type { Metadata } from "next"

import {
  HelpArticle,
  HelpInlineLink,
  HelpNote,
  HelpUiLabel
} from "@/components/help/help-ui"
import { HelpPageJsonLd } from "@/components/seo/help-page-json-ld"
import { HELP_SHARING_PATH } from "@/lib/help-routes"
import { createPageMetadata } from "@/lib/seo"

const PATH = "/help/folders-and-organization"
const TITLE = "Folders and organization"
const DESCRIPTION =
  "Group drawings into folders, customize icons and colors, and keep your sidebar tidy."

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
})

export default function FoldersAndOrganizationHelpPage() {
  return (
    <>
      <HelpPageJsonLd path={PATH} title={TITLE} description={DESCRIPTION} />
      <HelpArticle title={TITLE}>
        <p>
          Folders help you group drawings by client, sprint, or subject so your
          sidebar stays scannable as your library grows.
        </p>

        <h2>Create a folder</h2>
        <ol>
          <li>
            In the sidebar, open the folders section and select{" "}
            <HelpUiLabel>New folder</HelpUiLabel>.
          </li>
          <li>Enter a name and confirm.</li>
          <li>
            Drag existing drawings into the folder or create new ones inside it.
          </li>
        </ol>

        <h2>Customize appearance</h2>
        <p>
          Folders support custom colors and icons so you can scan the sidebar at
          a glance. Open a folder&apos;s menu to rename it, change its color, or
          remove it when a project wraps up.
        </p>

        <h2>Expand and collapse</h2>
        <p>
          Select a folder header to expand or collapse its drawings. Your
          expanded state is remembered while you work in the workspace.
        </p>
        <HelpNote>
          <p>
            Deleting a folder does not necessarily delete the drawings inside —
            check the confirmation dialog for what will be removed.
          </p>
        </HelpNote>

        <h2>Find drawings quickly</h2>
        <p>
          Use sidebar search to jump to a drawing by name. Combine folders with
          clear naming so teammates can find shared work faster.
        </p>

        <h2>Related guides</h2>
        <ul>
          <li>
            <HelpInlineLink href={HELP_SHARING_PATH}>
              Sharing and collaboration
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
