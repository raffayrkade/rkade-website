import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import work from '@/data/work'
import Section from '@/components/layout/Section'
import Reveal from '@/components/common/Reveal'
import StatusTag from '@/components/work/StatusTag'
import ArchTrio from '@/components/arch/ArchTrio'
import useArchDraw from '@/hooks/useArchDraw'
import CTASection from '@/components/home/CTASection'
import { useDeclareHeaderTone } from '@/components/layout/HeaderTone'

/**
 * The Work index. The single biggest gap on the old site: it proved nothing,
 * and a visitor could not tell whether RKade had shipped one thing or fifty.
 *
 * Full-width editorial rows on alternating tones, not a three-up card grid.
 * Every agency has a three-up card grid and the old site already had five.
 *
 * Every claim here is anonymised and every number is sourced in
 * src/data/work.js. Read the rules at the top of that file before editing.
 */

function Row({ item, index }) {
  const dark = index % 2 === 1
  const tone = dark ? 'ink' : 'cream'

  return (
    <Section tone={tone} padding="loose">
      <Reveal>
        <article className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`text-label uppercase ${dark ? 'text-muted-on-ink' : 'text-muted'}`}>
                {item.sector}
              </span>
              <StatusTag status={item.status} tone={dark ? 'ink' : 'cream'} />
            </div>

            <h2 className={`mt-5 font-display text-section ${dark ? 'text-cream' : 'text-ink'}`}>
              {item.title}
            </h2>

            <p className={`mt-5 max-w-xl text-body-lg ${dark ? 'text-muted-on-ink' : 'text-muted'}`}>
              {item.summary}
            </p>

            {item.stats.length > 0 && (
              <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-5">
                {item.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span
                        className={`font-display text-card tabular-nums ${dark ? 'text-gold' : 'text-ink'}`}
                      >
                        {s.value.toLocaleString('en-GB')}
                      </span>
                      <span
                        className={`mt-1 block max-w-[20ch] text-label uppercase ${dark ? 'text-muted-on-ink' : 'text-muted'}`}
                      >
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <Link
              to={`/work/${item.slug}`}
              className={`group mt-10 inline-flex items-center gap-2 text-button uppercase ${
                dark
                  ? 'text-gold'
                  : 'text-ink underline decoration-gold-dark underline-offset-4 hover:decoration-ink'
              }`}
            >
              Read the case study
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <span
            aria-hidden="true"
            className={`font-display text-stat tabular-nums ${dark ? 'text-cream/10' : 'text-ink/10'}`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </article>
      </Reveal>
    </Section>
  )
}

export default function Work() {
  useDeclareHeaderTone('ink')
  // Rows alternate starting cream, so the closing block takes whatever the
  // last row did not. Computed rather than hardcoded, so adding a sixth study
  // cannot silently put two sections of the same tone next to each other.
  const lastRowDark = (work.length - 1) % 2 === 1
  const closeTone = lastRowDark ? 'cream' : 'ink'
  const closeDark = closeTone !== 'cream'
  const { ref, drawProgress } = useArchDraw({ mode: 'once' })

  return (
    <>
      <section ref={ref} className="relative overflow-hidden bg-ink pt-[72px] text-cream">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] bottom-[-20%] h-[120%] w-[55%] text-gold opacity-[0.09]"
        >
          <ArchTrio drawProgress={drawProgress} className="h-full w-auto" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-[6vw] py-28 md:px-[8vw] md:py-36">
          <p className="text-label uppercase text-muted-on-ink">Selected work</p>
          <h1 className="mt-5 max-w-[18ch] font-display text-hero text-cream">
            Five systems. <em className="italic text-gold">All of them real.</em>
          </h1>
          <p className="mt-8 max-w-xl text-body-lg text-muted-on-ink">
            Client names are left out on purpose. The sectors, the problems and the numbers are
            exactly as they happened, and where something is not deployed yet, it says so.
          </p>
        </div>
      </section>

      {work.map((item, i) => (
        <Row key={item.slug} item={item} index={i} />
      ))}

      <Section tone={closeTone} padding="default">
        <div className="max-w-2xl">
          <p className={`text-label uppercase ${closeDark ? 'text-muted-on-ink' : 'text-muted'}`}>
            What ties them together
          </p>
          <h2 className={`mt-4 font-display text-section ${closeDark ? 'text-cream' : 'text-ink'}`}>
            Every one of these is the <em className="italic">same three tiers.</em>
          </h2>
          <p className={`mt-5 text-body-lg ${closeDark ? 'text-muted-on-ink' : 'text-muted'}`}>
            Understand the work. Build the system. Keep it running. The order never changes, and
            you can stop after any of them.
          </p>
          <Link
            to="/services"
            className={`group mt-8 inline-flex items-center gap-2 text-button uppercase ${
              closeDark
                ? 'text-gold'
                : 'text-ink underline decoration-gold-dark underline-offset-4 hover:decoration-ink'
            }`}
          >
            How the tiers work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Section>

      <CTASection />
    </>
  )
}
