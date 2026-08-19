/**
 * The shared body for /privacy and /terms.
 *
 * Deliberately not a <Section>: PageHeader above it is already a cream block,
 * and Section's dev-only guard warns whenever two cream sections touch,
 * correctly, because the alternation is the design everywhere else. A legal
 * page is the one place on the site that should be one continuous quiet
 * surface rather than a passage, so it uses the same raw pattern PageHeader
 * itself does.
 *
 * Measure is capped at 68ch. These are the only pages on the site anyone
 * actually reads top to bottom in a straight line.
 */
export default function LegalBody({ updated, children }) {
  return (
    <section data-header-tone="light" className="bg-cream">
      <div className="mx-auto max-w-[1400px] px-[6vw] py-24 md:px-[8vw] md:py-32">
        <div className="max-w-[68ch]">
          <p className="text-label uppercase text-muted">Last updated {updated}</p>
          <div className="mt-14 space-y-14">{children}</div>
        </div>
      </div>
    </section>
  )
}

export function LegalSection({ title, children }) {
  return (
    <div>
      <h2 className="font-display text-card text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-body text-muted">{children}</div>
    </div>
  )
}
