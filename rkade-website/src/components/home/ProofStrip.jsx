import Counter from '@/components/common/Counter'

/**
 * The proof strip. Sits directly under the hero, still on ink, with no section
 * break, because it is the hero's evidence rather than a new argument.
 *
 * EVERY NUMBER HERE IS CHECKABLE AGAINST A PROJECT FOLDER, and the source is
 * next to it so the next person can re-check it. No rounding up, no "100+",
 * no "trusted by". If a number cannot be sourced it does not go up.
 *
 * The plan also suggested "5 systems shipped". That one is not here: the
 * project folders do not support a clean count of what counts as shipped
 * versus archived versus a survey, so it was dropped rather than guessed.
 */

const stats = [
  {
    // Desktop/RKADE/Projects/*/docs/STATE.md: Jewelry-CRM "LIVE and fully up to
    // date", rkade-crm "LIVE at https://crm.rkade.co", RollsRoyce-Tracker
    // "Delivered July 2026" to dubizzle. metro-jewellers-website is explicitly
    // "Running locally only. Not live." and is not counted.
    to: 3,
    label: 'systems live in production',
  },
  {
    // Jewelry-CRM/docs/STATE.md: "Phase 28 of 28 (100%)", "All 28 phases are
    // shipped". A phase-29.md exists but is planned, not shipped, so 28.
    to: 28,
    label: 'build phases on the largest project',
  },
  {
    // Jewelry-CRM/docs/STATE.md: "All 170 tasks across 28 phases are now built
    // and committed locally."
    to: 170,
    label: 'tasks shipped across all builds',
  },
  {
    // crm-audit/docs/STATE.md: "90,048 rows of order exports across two years".
    // That project is a survey and extraction, so the verb is audited, not
    // migrated. The plan's label said migrated. It is not accurate, and the
    // 18-08-2026 copy review asked for "migrated and audited" for the second
    // time. Rejected for the second time, for the same reason: nothing was
    // moved anywhere. The other two labels here were reworded as that review
    // asked, so that each reads as a standalone fact.
    to: 90048,
    label: 'order rows audited',
  },
]

const format = (n) => n.toLocaleString('en-GB')

export default function ProofStrip() {
  return (
    <section data-header-tone="dark" className="border-t border-cream/10 bg-ink text-cream">
      <div className="mx-auto max-w-[1400px] px-[6vw] py-16 md:px-[8vw] md:py-20">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <Counter to={s.to} format={format} className="text-cream" />
                <span className="mt-3 block max-w-[28ch] text-label uppercase text-muted-on-ink">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
