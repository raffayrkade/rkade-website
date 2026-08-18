import Hero from '@/components/home/Hero'
import ProofStrip from '@/components/home/ProofStrip'
import Problem from '@/components/home/Problem'
import ServiceTiers from '@/components/home/ServiceTiers'
import WhyRkade from '@/components/home/WhyRkade'
import Industries from '@/components/home/Industries'
import HowItWorks from '@/components/home/HowItWorks'
import CTASection from '@/components/home/CTASection'
import { useDeclareHeaderTone } from '@/components/layout/HeaderTone'

/**
 * The homepage, as a passage: dark, light, dark, light, deepest dark, light,
 * dark. You walk in, through, and out.
 *
 * The old page was seven sections and five of them were the same shape:
 * eyebrow, heading, description, grid of bordered cards on cream. The
 * alternation is now the structure, and no two adjacent sections share a tone.
 *
 * ProofStrip deliberately continues the hero's ink rather than breaking it,
 * and Industries deliberately continues Why RKade's cream, because each is
 * evidence for the section above rather than a new argument.
 *
 * Selected work, section 5 in docs/plan/phase-03.md, is not here yet. It needs
 * the case studies from phase 4 and goes in when they exist.
 */
export default function Home() {
  // The hero is ink, so the header floats transparent over it and only becomes
  // the cream bar once you scroll past.
  useDeclareHeaderTone('ink')

  return (
    <>
      <Hero />
      <ProofStrip />
      <Problem />
      <ServiceTiers />
      <WhyRkade />
      <Industries />
      <HowItWorks />
      <CTASection />
    </>
  )
}
