import { Link } from 'react-router-dom'
import { Check, ArrowUpRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Reveal from '@/components/common/Reveal'
import Arch from '@/components/arch/Arch'
import { REFERENCE } from '@/components/arch/geometry'
import useArchDraw from '@/hooks/useArchDraw'

/**
 * One tier, one full section. The homepage builds all three arches of the
 * mark together as it scrolls; this page takes the mark apart and gives each
 * arch its own section, in the same outer-to-inner order (Audit, Build,
 * Manage). Same visual language, opposite direction.
 *
 * `archIndex` picks which of the three arches this tier gets: 0 is the
 * outermost (Audit, tapered), 1 the middle (Build), 2 the innermost (Manage).
 *
 * `caseStudy` is optional on purpose. Manage has no client on it yet, so it
 * renders no example rather than a placeholder or a stretch.
 */
export default function TierSection({ tone, tag, heading, body, deliverables, caseStudy, archIndex }) {
  const dark = tone !== 'cream'
  const { ref, drawProgress } = useArchDraw({ mode: 'once' })
  const span = REFERENCE.spans[archIndex]

  return (
    <div ref={ref}>
      <Section tone={tone} padding="loose" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 -right-[6%] flex items-center ${
            dark ? 'text-gold' : 'text-gold-dark'
          } opacity-[0.1]`}
        >
          <Arch
            span={span}
            strokeWidth={REFERENCE.strokeWidth}
            legHeight={REFERENCE.legHeight}
            taper={archIndex === 0}
            drawProgress={drawProgress}
            className="h-[40vh] w-auto md:h-[58vh]"
          />
        </div>

        <Reveal className="relative max-w-2xl">
          <p className={`text-label uppercase ${dark ? 'text-muted-on-ink' : 'text-muted'}`}>{tag}</p>
          <h2 className={`mt-4 font-display text-section ${dark ? 'text-cream' : 'text-ink'}`}>{heading}</h2>
          <p className={`mt-6 text-body-lg ${dark ? 'text-muted-on-ink' : 'text-muted'}`}>{body}</p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {deliverables.map((d) => (
              <li key={d} className="flex items-start gap-3 text-body">
                <Check aria-hidden="true" className={`mt-0.5 h-4 w-4 flex-none ${dark ? 'text-gold' : 'text-gold-dark'}`} />
                <span className={dark ? 'text-muted-on-ink' : 'text-muted'}>{d}</span>
              </li>
            ))}
          </ul>

          {caseStudy && (
            <Link
              to={`/work/${caseStudy.slug}`}
              className={`group mt-10 inline-flex items-center gap-2 py-2 text-button uppercase ${
                dark
                  ? 'text-gold'
                  : 'text-ink underline decoration-gold-dark underline-offset-4 hover:decoration-ink'
              }`}
            >
              {caseStudy.label}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          )}
        </Reveal>
      </Section>
    </div>
  )
}
