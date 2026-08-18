import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import work, { bySlug, imageByRole, galleryImages } from '@/data/work'
import Section from '@/components/layout/Section'
import Reveal from '@/components/common/Reveal'
import Counter from '@/components/common/Counter'
import StatusTag from '@/components/work/StatusTag'
import WorkImage from '@/components/work/WorkImage'
import ArchFrame from '@/components/arch/ArchFrame'
import ArchTrio from '@/components/arch/ArchTrio'
import useArchDraw from '@/hooks/useArchDraw'
import CTASection from '@/components/home/CTASection'
import NotFound from '@/pages/NotFound'
import Seo from '@/components/common/Seo'

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
  const { ref, drawProgress } = useArchDraw({ mode: 'once' })

  if (!item) return <NotFound />

  const problemImage = imageByRole(item, 'problem')
  const buildImage = imageByRole(item, 'build')
  const gallery = galleryImages(item)
  const hasStats = item.stats.length > 0
  // Without a stats band the angle would put two cream sections back to back,
  // so it takes the ink slot instead and the alternation survives.
  const angleTone = hasStats ? 'cream' : 'ink'
  const angleDark = angleTone !== 'cream'

  const index = work.findIndex((w) => w.slug === item.slug)
  const next = work[(index + 1) % work.length]

  return (
    <>
      {/* Title and description come straight from item.title and item.summary
          in src/data/work.js, not hand-typed here, so they stay accurate as
          the case studies change and never drift from the anonymisation and
          sourcing rules that file enforces. */}
      <Seo
        title={item.title}
        description={item.summary}
        path={`/work/${item.slug}`}
        type="article"
        // Composited at build time from the case study's own title, over the
        // same textless background every other route falls back to. See
        // scripts/generate-og-cards.mjs. Re-run that script if a title here
        // ever changes.
        image={`/work/og/${item.slug}.webp`}
        imageAlt={`${item.title}, an RKade case study.`}
      />
      <section ref={ref} data-header-tone="dark" className="relative overflow-hidden bg-ink pt-[72px] text-cream">
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
            {problemImage && <WorkImage image={problemImage} tone="cream" className="mt-6" />}
            <p className="mt-6 font-display text-card text-ink">{item.problem}</p>
          </div>
          <div>
            <p className="text-label uppercase text-muted">What we built</p>
            {buildImage && <WorkImage image={buildImage} tone="cream" className="mt-6" />}
            <ul className="mt-6 space-y-4">
              {item.whatWeBuilt.map((b, i) => (
                // `as="li"` so Reveal's own element is the list item: a
                // wrapping div between <ul> and <li> fails axe's
                // list/listitem audits.
                <Reveal key={b} as="li" delay={i * 0.05} className="flex gap-3">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 flex-none text-gold-dark" />
                  <span className="text-body text-muted">{b}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {gallery.length > 0 && (
          <div
            className={`mt-16 grid gap-8 border-t border-line-strong pt-12 ${
              // `lg`, not `sm`. The page gutter widens to 8vw at the same
              // `sm` breakpoint the grid used to switch to two columns at,
              // and the two changes together made these screenshots render
              // narrower at 768px than they were at 390px on one column,
              // real UI screenshots turned to grey mush right at tablet
              // width. Single column all the way to `lg` keeps every
              // screenshot at least as wide as the full mobile column.
              gallery.length > 1 ? 'lg:grid-cols-2' : 'sm:max-w-md'
            }`}
          >
            {gallery.map((g) => (
              <figure key={g.src}>
                <WorkImage image={g} tone="cream" />
                <figcaption className="mt-3 text-label uppercase text-muted">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </Section>

      {hasStats && (
        <Section tone="ink" padding="tight">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {item.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <Counter to={s.value} format={format} className="text-cream" />
                  <span className="mt-3 block max-w-[28ch] text-label uppercase text-muted-on-ink">
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

      <div data-header-tone="dark" className="bg-ink text-cream">
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
