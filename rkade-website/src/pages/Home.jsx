import Hero from '@/components/home/Hero'
import ProofStrip from '@/components/home/ProofStrip'
import Problem from '@/components/home/Problem'
import ServiceTiers from '@/components/home/ServiceTiers'
import SelectedWork from '@/components/home/SelectedWork'
import HowItWorks from '@/components/home/HowItWorks'
import WhyRkade from '@/components/home/WhyRkade'
import CTASection from '@/components/home/CTASection'
import Seo from '@/components/common/Seo'

/**
 * The homepage, as a passage: dark, light, dark, light, deepest dark, light,
 * dark. You walk in, through, and out.
 *
 * The old page was seven sections and five of them were the same shape:
 * eyebrow, heading, description, grid of bordered cards on cream. The
 * alternation is now the structure, and no two adjacent sections share a tone.
 *
 * ProofStrip deliberately continues the hero's ink rather than breaking it,
 * because it is evidence for the section above rather than a new argument:
 * proof after the pitch.
 *
 * An Industries band used to sit under Selected work, listing six sectors
 * behind a marquee. Removed 19-08-2026: six industries with case studies in
 * two of them reads as a generalist, and the case studies already make the
 * range argument with real numbers. It is in docs/history/, not deleted.
 *
 * Why RKade sits between How it works and the close, per
 * docs/plan/phase-03.md task 3.11. The tone alternates end to end:
 * ink, ink, cream, ink, cream, ink-deep, cream, ink.
 */
export default function Home() {
  return (
    <>
      <Seo
        title="Custom AI Systems for Growing Businesses"
        description="Custom AI systems for growing businesses in Dubai. Free audit, custom build, ongoing management. Built around how you actually work."
        path="/"
      />
      <Hero />
      <ProofStrip />
      <Problem />
      <ServiceTiers />
      <SelectedWork />
      <HowItWorks />
      <WhyRkade />
      <CTASection />
    </>
  )
}
