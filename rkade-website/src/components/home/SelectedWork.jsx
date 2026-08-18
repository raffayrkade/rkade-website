import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import work, { bySlug } from '@/data/work'
import Section from '@/components/layout/Section'
import Reveal from '@/components/common/Reveal'
import RuleSweep from '@/components/common/RuleSweep'
import Counter from '@/components/common/Counter'
import StatusTag from '@/components/work/StatusTag'

/**
 * Selected work. New section, on cream, directly after the tier section.
 *
 * The plan calls this the section that fixes the site's biggest problem: the
 * old homepage never proved anything. Three real case studies, pulled from
 * the same src/data/work.js the /work page reads, not hand-typed copies of
 * it. If a number or a line of copy changes there, it changes here too.
 *
 * Picked for spread rather than for being the flashiest: one live flagship
 * (a paper ledger onto a CRM), one audit engagement (a system the client
 * didn't own), one internal tool (RKade running on its own build). The other
 * two case studies, the storefront and the lead platform, are intentionally
 * left off this teaser and live on /work in full.
 *
 * Each card's number is picked to be one this page has not already spent:
 * the proof strip above already uses this same project's 28 phases and 170
 * tasks, and its 90,048 audited rows, so this section reaches for a
 * different, still-real number on each of those two projects rather than
 * repeating itself.
 */

const FEATURED = [
  {
    slug: 'jewellery-trade-crm',
    // src/data/work.js sources this stat to Jewelry-CRM/docs/STATE.md:
    // "migration 120 (error_log)".
    statLabel: 'database migrations',
  },
  {
    slug: 'crm-forensic-audit',
    // src/data/work.js sources this stat to crm-audit/docs/STATE.md:
    // "6,254 parsed rows".
    statLabel: 'rows parsed',
  },
  {
    slug: 'our-own-crm',
    // src/data/work.js sources this stat to rkade-crm/docs/STATE.md:
    // "LIVE at https://crm.rkade.co running PHASE 8".
    statLabel: 'phases shipped',
  },
]

export default function SelectedWork() {
  return (
    <Section tone="cream" id="work">
      <div className="max-w-3xl">
        <RuleSweep />
        <p className="mt-3 text-label uppercase text-muted">Selected work</p>
        <h2 className="mt-4 font-display text-section text-ink">
          Three of five, <em className="italic">out in the open.</em>
        </h2>
        <p className="mt-5 max-w-xl text-body-lg text-muted">
          Client names stay out of it. The sector, the problem and the number are exactly what
          happened.
        </p>
      </div>

      <ol className="mt-16 border-t border-line-strong">
        {FEATURED.map((f, i) => {
          const item = bySlug(f.slug)
          const stat = item.stats.find((s) => s.label === f.statLabel)

          return (
            // `as="li"` so Reveal's own element is the list item: a wrapping
            // div between <ol> and <li> fails axe's list/listitem audits.
            <Reveal
              key={f.slug}
              as="li"
              delay={i * 0.07}
              className="border-b border-line-strong py-14 md:py-20"
            >
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-label uppercase text-muted">{item.sector}</span>
                    <StatusTag status={item.status} tone="cream" />
                  </div>

                  <h3 className="mt-5 font-display text-card text-ink">{item.title}</h3>

                  <p className="mt-4 max-w-xl text-body-lg text-muted">{item.summary}</p>

                  {stat && (
                    <dl className="mt-9">
                      <dt className="sr-only">{stat.label}</dt>
                      <dd>
                        <Counter
                          to={stat.value}
                          format={(n) => n.toLocaleString('en-GB')}
                          className="text-ink"
                        />
                        <span className="mt-2 block max-w-[28ch] text-label uppercase text-muted">
                          {stat.label}
                        </span>
                      </dd>
                    </dl>
                  )}

                  <Link
                    to={`/work/${item.slug}`}
                    className="group mt-9 inline-flex items-center gap-2 text-button uppercase text-ink underline decoration-gold-dark underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    Read the case study
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>

                {/* Decorative index, redundant with the <ol>'s own numbering.
                    Opacity raised from the original 10% (1.2:1) to 60%, which
                    clears the 3:1 large-text minimum against cream. */}
                <span
                  aria-hidden="true"
                  className="font-display text-stat tabular-nums text-ink/60"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </Reveal>
          )
        })}
      </ol>

      <Link
        to="/work"
        className="group mt-14 inline-flex items-center gap-2 text-button uppercase text-ink underline decoration-gold-dark underline-offset-4 transition-colors hover:decoration-ink"
      >
        See all {work.length} case studies
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </Section>
  )
}
