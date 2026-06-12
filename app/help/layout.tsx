import type { Metadata } from "next"

import { HelpShell } from "@/components/help/help-ui"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Help Center",
  description:
    "Guides for getting started, drawing on the canvas, organizing folders, and collaborating in Bitarium.",
  path: "/help"
})

export default function HelpLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <HelpShell>{children}</HelpShell>
}
