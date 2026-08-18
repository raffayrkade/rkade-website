import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Section from '@/components/layout/Section'
import Arch from '@/components/arch/Arch'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

/**
 * How it works, as a vertical passage on the darkest surface on the site.
 *
 * `ink-deep` is used exactly once, here, which is what makes it read as the
 * deepest point of the walk rather than as another dark section. Four steps,
 * each framed by a small arch, connected by a gold rule that draws as you
 * scroll down it.
 */

const steps = [
  {
    n: '01',
    title: 'Discovery',
    text: 'We map your workflows and find where automation pays off fastest.',
  },
  {
    n: '02',
    title: 'Design',
    text: "We architect the system's inputs, logic, and outputs around your reality.",
  },
  {
    n: '03',
    title: 'Build',
    text: 'We build and ship it, integrated into the tools you already use.',
  },
  {
    n: '04',
    title: 'Manage',
    text: 'We monitor, maintain, and improve it so it keeps earning its keep.',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] })
  const railHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <Section tone="ink-deep" id="how-it-works">
      <div className="max-w-3xl">
        <p className="text-label uppercase text-muted-on-ink">How it works</p>
        <h2 className="mt-4 font-display text-section text-cream">
          A straight line from <em className="italic text-gold">problem to system.</em>
        </h2>
      </div>

      <div ref={ref} className="relative mt-16 md:mt-20">
        {/* The rail the steps hang off. It draws downward as you scroll, so the
            section is literally walked through. */}
        <div
          aria-hidden="true"
          className="absolute left-[27px] top-2 hidden h-[calc(100%-4rem)] w-px bg-cream/12 md:block"
        >
          <motion.div
            className="w-px bg-gold"
            style={{ height: reducedMotion ? '100%' : railHeight }}
          />
        </div>

        <ol className="space-y-14 md:space-y-20">
          {steps.map((s, i) => (
            <li key={s.n} className="relative md:grid md:grid-cols-[3.5rem_1fr] md:gap-x-10">
              <div className="flex items-center gap-4 md:block">
                <Arch
                  span={99}
                  strokeWidth={17}
                  taper={i === steps.length - 1}
                  className="h-10 w-auto flex-none text-gold"
                />
                <span className="text-label uppercase text-muted-on-ink md:mt-3 md:block">
                  {s.n}
                </span>
              </div>
              <div className="mt-4 md:mt-0">
                <h3 className="font-display text-card text-cream">{s.title}</h3>
                <p className="mt-2 max-w-lg text-body text-muted-on-ink">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
