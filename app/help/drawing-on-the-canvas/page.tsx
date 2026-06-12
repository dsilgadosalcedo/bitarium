import type { Metadata } from "next"

import {
  HelpArticle,
  HelpInlineLink,
  HelpNote,
  HelpUiLabel
} from "@/components/help/help-ui"
import { HelpPageJsonLd } from "@/components/seo/help-page-json-ld"
import { HELP_GETTING_STARTED_PATH } from "@/lib/help-routes"
import { createPageMetadata } from "@/lib/seo"

const PATH = "/help/drawing-on-the-canvas"
const TITLE = "Drawing on the canvas"
const DESCRIPTION =
  "Use Excalidraw-powered tools, themes, and auto-save while you sketch and diagram."

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
})

export default function DrawingOnCanvasHelpPage() {
  return (
    <>
      <HelpPageJsonLd path={PATH} title={TITLE} description={DESCRIPTION} />
      <HelpArticle title={TITLE}>
        <p>
          Bitarium is built on Excalidraw, so you get a familiar set of drawing
          tools on an infinite canvas with smooth panning and zooming.
        </p>

        <h2>Core tools</h2>
        <ul>
          <li>Shapes, arrows, lines, and freehand drawing</li>
          <li>Text labels and sticky-note style elements</li>
          <li>Selection, grouping, and alignment helpers</li>
          <li>Undo and redo while you iterate</li>
        </ul>

        <h2>Auto-save</h2>
        <p>
          Changes sync automatically while you draw. You can close a drawing and
          reopen it from the sidebar without exporting files manually.
        </p>

        <h2>Canvas navigation</h2>
        <p>
          Pan by dragging the canvas background or using trackpad gestures. Zoom
          in to refine details or zoom out to see the full diagram.
        </p>
        <HelpNote>
          <p>
            Large drawings stay responsive because Bitarium stores scene data in
            your workspace and streams updates in real time when collaborators
            are present.
          </p>
        </HelpNote>

        <h2>Themes</h2>
        <p>
          Toggle light or dark mode from the workspace chrome to match your
          environment. The canvas and UI update together for comfortable long
          sessions.
        </p>

        <h2>Rename and return later</h2>
        <p>
          Open a drawing from the sidebar at any time. Rename it from the
          workspace header so it is easy to find in search and folders.
        </p>

        <p className="pt-8 text-sm text-muted-foreground">
          New to Bitarium? Start with the{" "}
          <HelpInlineLink href={HELP_GETTING_STARTED_PATH}>
            getting started guide
          </HelpInlineLink>
          .
        </p>
      </HelpArticle>
    </>
  )
}
