import type { ReactNode } from "react"
import Link from "next/link"

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|([^[\]*]+)/g
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match[2] && match[3]) {
      const href = match[3]
      const isExternal = href.startsWith("http")
      nodes.push(
        isExternal ? (
          <a
            key={`${match.index}-link`}
            href={href}
            className="font-medium text-foreground underline underline-offset-2"
            rel="noreferrer"
            target="_blank"
          >
            {match[2]}
          </a>
        ) : (
          <Link
            key={`${match.index}-link`}
            href={href}
            className="font-medium text-foreground underline underline-offset-2"
          >
            {match[2]}
          </Link>
        )
      )
      continue
    }

    if (match[5]) {
      nodes.push(
        <strong
          key={`${match.index}-strong`}
          className="font-semibold text-foreground"
        >
          {match[5]}
        </strong>
      )
      continue
    }

    if (match[6]) {
      nodes.push(match[6])
    }
  }

  return nodes
}

function isTableRow(line: string) {
  return line.trim().startsWith("|")
}

function parseTable(lines: string[]) {
  const rows = lines
    .map((line) =>
      line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim())
    )
    .filter((row) => row.some((cell) => cell.length > 0))

  if (rows.length < 2) {
    return null
  }

  const [header, , ...body] = rows
  if (!header || header.some((cell) => /^-+$/.test(cell))) {
    return null
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            {header.map((cell) => (
              <th
                key={cell}
                className="border border-border px-3 py-2 font-semibold text-foreground"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell) => (
                <td
                  key={`${row[0]}-${cell}`}
                  className="border border-border px-3 py-2 align-top"
                >
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function renderLegalMarkdown(markdown: string): ReactNode[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n")
  const nodes: ReactNode[] = []
  let index = 0
  let key = 0

  while (index < lines.length) {
    const line = lines[index]?.trim() ?? ""

    if (!line) {
      index += 1
      continue
    }

    if (line.startsWith("# ")) {
      nodes.push(
        <h2
          key={key++}
          className="mt-10 scroll-mt-24 text-xl font-semibold text-foreground first:mt-0"
        >
          {line.slice(2)}
        </h2>
      )
      index += 1
      continue
    }

    if (line.startsWith("## ")) {
      nodes.push(
        <h3
          key={key++}
          className="mt-8 scroll-mt-24 text-lg font-semibold text-foreground"
        >
          {line.slice(3)}
        </h3>
      )
      index += 1
      continue
    }

    if (isTableRow(line)) {
      const tableLines: string[] = []
      while (index < lines.length && isTableRow(lines[index] ?? "")) {
        tableLines.push(lines[index] ?? "")
        index += 1
      }
      const table = parseTable(tableLines)
      if (table) {
        nodes.push(<div key={key++}>{table}</div>)
      }
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (
        index < lines.length &&
        /^\d+\.\s/.test(lines[index]?.trim() ?? "")
      ) {
        items.push((lines[index] ?? "").replace(/^\d+\.\s/, "").trim())
        index += 1
      }
      nodes.push(
        <ol key={key++} className="list-decimal space-y-2 pl-5">
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ol>
      )
      continue
    }

    if (line.startsWith("- ")) {
      const items: string[] = []
      while (
        index < lines.length &&
        (lines[index]?.trim() ?? "").startsWith("- ")
      ) {
        items.push((lines[index] ?? "").slice(2).trim())
        index += 1
      }
      nodes.push(
        <ul key={key++} className="list-disc space-y-2 pl-5">
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ul>
      )
      continue
    }

    const paragraphLines = [line]
    index += 1
    while (
      index < lines.length &&
      (lines[index]?.trim() ?? "") &&
      !lines[index]?.startsWith("#") &&
      !lines[index]?.trim().startsWith("- ") &&
      !/^\d+\.\s/.test(lines[index]?.trim() ?? "") &&
      !isTableRow(lines[index] ?? "")
    ) {
      paragraphLines.push(lines[index]?.trim() ?? "")
      index += 1
    }

    nodes.push(
      <p key={key++} className="text-sm leading-7 text-muted-foreground">
        {renderInline(paragraphLines.join(" "))}
      </p>
    )
  }

  return nodes
}

export function applyLegalTemplate(
  markdown: string,
  values: Record<string, string>
): string {
  return Object.entries(values).reduce(
    (content, [token, value]) => content.replaceAll(`{{${token}}}`, value),
    markdown
  )
}
