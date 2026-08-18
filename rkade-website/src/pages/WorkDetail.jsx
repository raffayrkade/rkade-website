import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import work, { bySlug } from '@/data/work'
import Section from '@/components/layout/Section'
import Reveal from '@/components/common/Reveal'
import Counter from '@/components/common/Counter'
import StatusTag from '@/components/work/StatusTag'
import ArchFrame from '@/components/arch/ArchFrame'
import ArchTrio from '@/components/arch/ArchTrio'
import useArchDraw from '@/hooks/useArchDraw'
import CTASection from '@/components/home/CTASection'
import NotFound from '@/pages/NotFound'
import { useDeclareHeaderTone } from '@/components/layout/HeaderTone'

/**
 * One template, five instances. Sections in order: hero with sector and
 * status, the problem, what we built, the stats, the angle, then the next
 * case study.
 *
 * Everything on this page comes from src/data/work.js. Nothing is written
 * inline, so the anonymisation and sourcing rules live in exactly one file.
 */

const format = (n) => n.toLocaleString('en-GB')

export default function WorkDetail() {
  const { slug } = useParams()
  const item = bySlug(slug)
  useDeclareHeaderTone('ink')
  const { ref, drawProgress } = useArchDraw({ mode: 'once' })

  if (!item) return <NotFound />

  const hasStats = item.stats.length > 0
  // Without a stats band the angle would put two cream sections back to back,
  // so it takes the ink slot instead and the alternation survives.
  const angleTone = hasStats ? 'cream' : 'ink'
  const angleDark = angleTone !== 'cream'

  const index = work.findIndex((w) => w.slug === item.slug)
  const next = work[(index + 1) % work.length]

  return (
    <>
      <section ref={ref} className="relative overflow-hidden bg-ink pt-[72px] text-cream">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[12%] bottom-[-25%] h-[125%] w-[52%] text-gold opacity-[0.08]"
        >
          <ArchTrio drawProgress={drawProgress} className="h-full w-auto" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-[6vw] py-28 md:px-[8vw] md:py-36">
          <Link
            to="/work"
            className="text-label uppercase text-muted-on-ink transition-colors hover:text-cream"
          >
            &larr; All work
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-label uppercase text-muted-on-ink">{item.sector}</span>
            <StatusTag status={item.status} tone="ink" />
          </div>

          <h1 className="mt-5 max-w-[20ch] font-display text-hero text-cream">{item.title}</h1>
          <p className="mt-8 max-w-xl text-body-lg text-muted-on-ink">{item.summary}</p>
        </div>
      </section>

      <Section tone="cream">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-label uppercase text-muted">The problem</p>
            <p className="mt-5 font-display text-card text-ink">{item.problem}</p>
          </div>
          <div>
            <p className="text-label uppercase text-muted">What we built</p>
            <ul className="mt-6 space-y-4">
              {item.whatWeBuilt.map((b, i) => (
                <Reveal key={b} delay={i * 0.05}>
                  <li className="flex gap-3">
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 flex-none text-gold-dark" />
                    <span className="text-body text-muted">{b}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {hasStats && (
        <Section tone="ink" padding="tight">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {item.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <Counter to={s.value} format={format} className="text-cream" />
                  <span className="mt-3 block max-w-[20ch] text-label uppercase text-muted-on-ink">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <Section tone={angleTone}>
        <ArchFrame tone={angleTone} scale={0.8} opacity={0.1} className="py-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className={`text-label uppercase ${angleDark ? 'text-muted-on-ink' : 'text-muted'}`}>
              Why it mattered
            </p>
            <p className={`mt-6 font-display text-section ${angleDark ? 'text-cream' : 'text-ink'}`}>
              {item.angle}
            </p>
            <p className={`mt-8 text-label uppercase ${angleDark ? 'text-muted-on-ink' : 'text-muted'}`}>
              {item.stack}
            </p>
          </div>
        </ArchFrame>
      </Section>

      <div className="bg-ink text-cream">
        <div className="mx-auto max-w-[1400px] border-t border-cream/10 px-[6vw] py-16 md:px-[8vw] md:py-20">
          <Link to={`/work/${next.slug}`} className="group block">
          <p className="text-label uppercase text-muted-on-ink">Next case study</p>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-section text-cream transition-colors group-hover:text-gold">
              {next.title}
            </h2>
            <ArrowUpRight
              aria-hidden="true"
              className="h-6 w-6 flex-none text-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
            <p className="mt-2 text-label uppercase text-muted-on-ink">{next.sector}</p>
          </Link>
        </div>
      </div>

      <CTASection />
    </>
  )
}
