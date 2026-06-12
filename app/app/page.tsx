import type { Metadata } from "next"

import { DrawingWorkspace } from "@/components/workspace/components/drawing-workspace"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Workspace",
  path: "/app",
  noIndex: true
})

export default function AppPage() {
  return <DrawingWorkspace />
}
