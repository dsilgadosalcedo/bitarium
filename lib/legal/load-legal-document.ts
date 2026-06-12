import { readFileSync } from "node:fs"
import { join } from "node:path"

import { applyLegalTemplate } from "@/lib/legal/render-legal-markdown"
import { getLegalTemplateValues } from "@/lib/legal/config"

export function loadLegalDocument(filename: string) {
  const markdown = readFileSync(
    join(process.cwd(), "content", "legal", filename),
    "utf8"
  )

  return applyLegalTemplate(markdown, getLegalTemplateValues())
}
