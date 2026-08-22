import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ArchShape } from '@/components/arch/Arch'
import { REFERENCE } from '@/components/arch/geometry'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import useMediaQuery, { MD_UP } from '@/hooks/useMediaQuery'

/**
 * The centrepiece.
 *
 * The arch mark is three nested arches. The service model is three tiers. They
 * are the same object. Scroll through this section and the logo builds itself
 * one arch at a time, each arch labelling one tier. By the end a visitor has
 * been told what RKade sells, in what order, and why the logo looks like that,
 * without a sentence of explanation.
 *
 * Only the arch column is sticky. The copy flows normally past it.
 *
 * The first attempt pinned the whole two-column block and centred it in a
 * min-h-screen box. At 1440x900 the copy was taller than the viewport, so the
 * heading went under the fixed header and "Manage" was cut off the bottom.
 * That is precisely the failure metro-jewellers-website hit in its round 9
 * client feedback: a 664px pinned section holding 903px of content, clipped,
 * on a phone, in front of a client. A sticky visual beside flowing text cannot
 * clip, at any height, on any device.
 *
 * Mobile was designed first. Below `lg` there is no sticky at all: the trio
 * draws once on entry above the list, and the tiers stack underneath.
 */

const tiers = [
  {
    tag: 'Tier 1',
    name: 'Audit',
    price: 'Free',
    line: 'The widest view.',
    text: 'We map everything: where the time goes, what gets touched twice, what a system could take off your plate. You get a concrete report with the order to do it in. It costs nothing.',
  },
  {
    tag: 'Tier 2',
    name: 'Build',
    line: 'Narrower. The systems that actually get made.',
    text: 'CRMs, websites, outreach engines, internal tools. Built around how you already operate rather than around a template, then shipped and handed over working.',
  },
  {
    tag: 'Tier 3',
    name: 'Manage',
    // No client example anywhere on the site. Nobody is on an ongoing
    // arrangement yet, so this is written as an offer, never as a record.
    line: 'Closest in. We keep it running.',
    text: 'Monitoring, iteration and maintenance of what we built, so it keeps working and keeps improving. You never have to touch the technical side.',
  },
]

/** Each arch owns one third of the section's scroll. */
const WINDOWS = [
  [0.02, 0.34],
  [0.3, 0.62],
  [0.58, 0.9],
]

export default function ServiceTiers() {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  // Below md this section behaves exactly as it does under reduced motion:
  // the mark arrives drawn and all three tiers are simply readable. The
  // scroll-scrubbed version is desktop's, where there is room for the sticky
  // column beside the copy and the budget to repaint it.
  const wideEnough = useMediaQuery(MD_UP)
  const stillMark = reducedMotion || !wideEnough
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const outerRadius = REFERENCE.spans[0] + REFERENCE.strokeWidth / 2
  const width = outerRadius + REFERENCE.spans[1] + REFERENCE.strokeWidth / 2
  const height = outerRadius + REFERENCE.legHeight

  // Written out rather than mapped, because hooks must not be called in a loop.
  // Reduced motion gets the finished composition immediately and the copy fully
  // visible: the section still reads top to bottom, it just does not move.
  const drawOuter = useTransform(scrollYProgress, WINDOWS[0], [0, 1], { clamp: true })
  const drawMiddle = useTransform(scrollYProgress, WINDOWS[1], [0, 1], { clamp: true })
  const drawInner = useTransform(scrollYProgress, WINDOWS[2], [0, 1], { clamp: true })
  const draw = [drawOuter, drawMiddle, drawInner]

  const fadeOuter = useTransform(scrollYProgress, [WINDOWS[0][0], WINDOWS[0][1] * 0.92], [0, 1], { clamp: true })
  const fadeMiddle = useTransform(scrollYProgress, [WINDOWS[1][0], WINDOWS[1][1] * 0.92], [0, 1], { clamp: true })
  const fadeInner = useTransform(scrollYProgress, [WINDOWS[2][0], WINDOWS[2][1] * 0.92], [0, 1], { clamp: true })
  const fade = [fadeOuter, fadeMiddle, fadeInner]

  return (
    <section id="services" ref={ref} data-header-tone="dark" className="bg-ink text-cream">
      <div className="mx-auto max-w-[1400px] px-[6vw] py-20 md:px-[8vw] md:py-24">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          {/* The mark, building. Sticky on desktop so it stays beside whichever
              tier you are reading, and deliberately shorter than the viewport:
              a sticky element only stays pinned for parentHeight minus its own
              height, so a full-height column released halfway down the copy. */}
          <div className="lg:sticky lg:top-[16vh] lg:flex lg:h-[68vh] lg:items-center">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              fill="none"
              aria-hidden="true"
              className="mx-auto h-auto w-[min(70%,320px)] text-gold lg:w-full"
            >
              {REFERENCE.spans.map((span, i) => (
                <ArchShape
                  key={span}
                  span={span}
                  strokeWidth={REFERENCE.strokeWidth}
                  legHeight={REFERENCE.legHeight}
                  cx={outerRadius}
                  cy={outerRadius}
                  taper={i === 0}
                  drawProgress={stillMark ? 1 : draw[i]}
                />
              ))}
            </svg>
          </div>

          <div className="mt-16 lg:mt-0 lg:pb-[4vh] lg:pt-[4vh]">
            <p className="text-label uppercase text-muted-on-ink">What we do</p>
            <h2 className="mt-3 font-display text-section text-cream">
              Three arches. <em className="italic text-gold">Three tiers.</em>
            </h2>
            <p className="mt-4 max-w-md text-body-lg text-muted-on-ink">
              The mark is three nested arches. So is the way we work. Start at the widest and come
              inward, or take only the part you need.
            </p>

            <ol className="mt-12 space-y-[6vh]">
              {tiers.map((t, i) => (
                <motion.li
                  key={t.name}
                  // An explicit 1 here, not `undefined`. `fade[i]` is a
                  // MotionValue that framer-motion applies straight to the
                  // DOM node outside of React's own reconciliation; simply
                  // removing it from `style` on the next render does not
                  // clear whatever opacity it last set. Under reduced
                  // motion, mount can briefly still see `fade[i]` at 0
                  // (scrolled-to-top, section not yet entered) before the
                  // reduced-motion state resolves, and that 0 stuck
                  // permanently, hiding all three tiers' copy. Found
                  // 18-08-2026 by walking the page in reduced motion end to
                  // end rather than trusting the token.
                  style={{ opacity: stillMark ? 1 : fade[i] }}
                  className="border-l-2 border-gold/30 pl-6"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-label uppercase text-muted-on-ink">{t.tag}</span>
                    <h3 className="font-display text-card text-cream">{t.name}</h3>
                    {t.price && (
                      <span className="rounded bg-gold px-2 py-0.5 text-label uppercase text-ink">
                        {t.price}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 font-display text-card text-gold">{t.line}</p>
                  <p className="mt-3 max-w-md text-body text-muted-on-ink">{t.text}</p>
                </motion.li>
              ))}
            </ol>

            <Link
              to="/services"
              className="group mt-14 inline-flex items-center gap-2 py-2 text-button uppercase text-gold"
            >
              Full services breakdown
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
