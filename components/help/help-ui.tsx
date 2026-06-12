import Link from "next/link"
import type { ReactNode } from "react"

export function HelpShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to Bitarium
          </Link>
          <Link href="/help" className="text-sm font-medium text-foreground">
            Help Center
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-10 pb-20">{children}</main>
    </div>
  )
}

export function HelpArticle({
  title,
  children
}: {
  title: string
  children: ReactNode
}) {
  return (
    <article className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <div className="space-y-6 text-base leading-relaxed text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_p+ul]:mt-2 [&_p+ol]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-6">
        {children}
      </div>
    </article>
  )
}

export function HelpUiLabel({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 text-[0.94em] font-normal text-[#6a65db]">
      {children}
    </code>
  )
}

export function HelpNote({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-lg border border-border/70 bg-muted/30 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
      {children}
    </aside>
  )
}

export function HelpInlineLink({
  href,
  children
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className="font-medium text-[#6a65db] underline-offset-4 hover:underline"
    >
      {children}
    </Link>
  )
}

export function HelpFaq({
  items
}: {
  items: Array<{ question: string; answer: ReactNode }>
}) {
  return (
    <section className="mt-12 space-y-4 border-t border-border/60 pt-10">
      <h2 className="text-xl font-semibold">FAQs</h2>
      <div className="divide-y divide-border/60">
        {items.map((item) => (
          <details key={item.question} className="group py-4">
            <summary className="cursor-pointer list-none text-base font-medium marker:content-none [&::-webkit-details-marker]:hidden">
              {item.question}
            </summary>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
