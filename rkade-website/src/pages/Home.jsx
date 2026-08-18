import Hero from '@/components/home/Hero'
import ProofStrip from '@/components/home/ProofStrip'
import Problem from '@/components/home/Problem'
import ServiceTiers from '@/components/home/ServiceTiers'
import SelectedWork from '@/components/home/SelectedWork'
import Industries from '@/components/home/Industries'
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
 * and Industries deliberately continues Selected work's cream, because each
 * is evidence for the section above rather than a new argument: proof after
 * the pitch, industries as a footnote to the case studies.
 *
 * Why RKade moved to sit between How it works and the close so that Selected
 * work and Industries could sit together as one block, per
 * docs/plan/phase-03.md task 3.11. The tone still alternates end to end:
 * ink, ink, cream, ink, cream, cream, ink-deep, cream, ink.
 */
export default function Home() {
  return (
    <>
      <Seo
        title="AI Automation Systems for Growing Businesses"
        description="We build AI systems that replace manual work: a free workflow audit, a custom build, and ongoing management so it keeps running without you."
        path="/"
      />
      <Hero />
      <ProofStrip />
      <Problem />
      <ServiceTiers />
      <SelectedWork />
      <Industries />
      <HowItWorks />
      <WhyRkade />
      <CTASection />
    </>
  )
}
