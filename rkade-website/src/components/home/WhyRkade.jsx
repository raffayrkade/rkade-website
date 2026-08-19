import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Reveal from '@/components/common/Reveal'
import RuleSweep from '@/components/common/RuleSweep'
import ArchFrame from '@/components/arch/ArchFrame'

/**
 * Why RKade. The three points are good and on-voice, so they stay.
 *
 * The base44 image is gone. It was generic AI-generated abstract art served
 * from a third-party CDN nobody at RKade controls, which is both a brand
 * problem and a dependency problem. An ArchFrame says more about the company
 * than stock nodes-on-a-grid ever did, and nothing at all would still have
 * been better than the image.
 */

const points = [
  {
    title: 'Operators, not talkers',
    text: 'We build working systems, not slide decks about them. Everything we recommend, we can build.',
  },
  {
    title: 'Built for your workflow',
    text: 'No off-the-shelf template. We design around how your business actually runs, then automate it.',
  },
  {
    title: 'Measured by output',
    text: "Success is fewer manual hours and more done. If it doesn't move that number, we don't build it.",
  },
]

export default function WhyRkade() {
  return (
    <Section tone="cream" id="why">
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <ArchFrame scale={0.85} opacity={0.1} className="order-2 min-h-[320px] py-10 lg:order-1">
          <blockquote className="max-w-md">
            <p className="font-display text-section text-ink">
              We build the system. <em className="italic">You close the clients.</em>
            </p>
            <footer className="mt-6 text-label uppercase text-muted">
              What RKade is actually for
            </footer>
          </blockquote>
        </ArchFrame>

        <div className="order-1 lg:order-2">
          <RuleSweep />
          <p className="mt-3 text-label uppercase text-muted">Why RKade</p>
          <h2 className="mt-4 font-display text-section text-ink">
            Operators who have <em className="italic">already built it.</em>
          </h2>
          <p className="mt-5 max-w-lg text-body-lg text-muted">
            We are not AI consultants who talk about automation. We understand the work first, then
            build the system that does it.
          </p>

          <dl className="mt-12 space-y-8">
            {points.map((p, i) => (
              // Reveal's own div is the group wrapping one dt/dd pair. A <dl>
              // permits a div wrapping a dt+dd group, but not a div wrapping
              // *another* div that wraps the pair, which is what a second,
              // inner wrapper produced and axe's definition-list audit caught.
              <Reveal key={p.title} delay={i * 0.07} className="border-l-2 border-gold-dark/40 pl-6">
                <dt className="font-body text-base font-medium text-ink">{p.title}</dt>
                <dd className="mt-1 max-w-lg text-body text-muted">{p.text}</dd>
              </Reveal>
            ))}
          </dl>

          <Link
            to="/about"
            className="group mt-12 inline-flex items-center gap-2 py-2 text-button uppercase text-ink underline decoration-gold-dark underline-offset-4 transition-colors hover:decoration-ink"
          >
            How we work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </Section>
  )
}
