import ArchTrio from '@/components/arch/ArchTrio'
import useArchDraw from '@/hooks/useArchDraw'
import Section from '@/components/layout/Section'
import Reveal from '@/components/common/Reveal'
import TierSection from '@/components/services/TierSection'
import Faq from '@/components/services/Faq'
import CTASection from '@/components/home/CTASection'
import Seo from '@/components/common/Seo'

/**
 * The three tiers, taken apart.
 *
 * The homepage builds the arch mark one arch at a time, in one scroll-linked
 * section, to say what RKade sells in one pass. This page reverses that: one
 * full section per tier, each carrying its own arch from the same mark,
 * outermost to innermost (Audit, Build, Manage).
 *
 * Tier 1 is genuinely free, and it is written as the way in, not the cheapest
 * of three products: same section, same weight, the word "free" in its own
 * heading rather than in small print. Audit and Build each point at a real
 * case study. Manage does not: nobody is on an ongoing arrangement yet, so it
 * is written as an offer, never stretched to look like a record.
 */

// The cream-tone tiers' emphasised phrase carries no colour: gold-dark on
// cream measures 2.65:1 and fails the 3:1 large-text minimum (see
// ART-DIRECTION.md, "illegal as text on cream"). Italic alone is still the
// emphasis, same as every other <em> on the site.
const tiers = [
  {
    tone: 'cream',
    tag: 'Tier 1',
    archIndex: 0,
    heading: (
      <>
        Audit. <em className="italic">Free.</em>
      </>
    ),
    body: "We map your workflows and rank what's worth automating first. You get a written report with the order to do it in. It costs nothing: this is how you see what working with us looks like, before you spend anything.",
    deliverables: [
      'Workflow mapping across your core operations',
      'Prioritized list of automation opportunities',
      'Estimated time saved per opportunity',
      'A concrete, ranked action report',
    ],
    caseStudy: { slug: 'crm-forensic-audit', label: 'See it done: the CRM forensic audit' },
  },
  {
    tone: 'ink',
    tag: 'Tier 2',
    archIndex: 1,
    heading: (
      <>
        Build. <em className="italic text-gold">Shipped, not scoped.</em>
      </>
    ),
    body: 'CRMs, websites, outreach engines, internal tools: built around how you already operate rather than a template, then tested and handed over working. The audit tells us what to build. This is where it gets made.',
    deliverables: [
      'Systems designed around how you operate',
      'CRMs, websites, outreach engines, internal tools',
      'Integrated with the tools you already use',
      'Tested, documented, and handed over',
    ],
    caseStudy: { slug: 'jewellery-trade-crm', label: 'See it built: the jewellery trade CRM' },
  },
  {
    tone: 'cream',
    tag: 'Tier 3',
    archIndex: 2,
    heading: (
      <>
        Manage. <em className="italic">We keep it running.</em>
      </>
    ),
    body: "Once a system is live, someone has to watch it, fix what breaks and add to it as you grow. That's this tier: monitoring, iteration and maintenance, so you never have to touch the technical side yourself.",
    deliverables: [
      'Continuous monitoring and uptime checks',
      'Iterative improvements as you scale',
      'New automations added over time',
      'You never touch the technical side',
    ],
    caseStudy: null,
  },
]

const faqs = [
  {
    q: 'Do I have to start with the Audit?',
    a: "It's the fastest way to know what to automate first, but if you already know what you want built, we can start there.",
  },
  {
    q: 'What does it cost?',
    a: 'The audit is free. A build is quoted per project once the audit has shown what needs building. Ongoing management is a monthly retainer.',
  },
  {
    q: 'How long does a build take?',
    a: 'It depends on scope. Most first systems ship in weeks, not months. The audit gives you a clear timeline before anything is committed.',
  },
  {
    q: 'Which tools do you work with?',
    a: 'We build around your existing stack rather than forcing a new one. If it has an API or an interface, we can usually automate it.',
  },
  {
    q: 'What happens after a system is built?',
    a: 'You can run it yourself, or move to Manage and let us monitor and improve it so it keeps earning its keep.',
  },
  {
    q: 'Is this a fit for a small team?',
    a: "Yes. Smaller teams often get the most out of automation. It's the difference between hiring and simply getting more done.",
  },
]

export default function Services() {
  const { ref, drawProgress } = useArchDraw({ mode: 'once' })

  return (
    <>
      <Seo
        title="AI Automation Services: Audit, Build, Manage"
        description="Three tiers that stack into one system: a free workflow audit, a custom build, then ongoing management so you never have to touch the technical side yourself."
        path="/services"
      />
      <section ref={ref} data-header-tone="dark" className="relative overflow-hidden bg-ink pt-[72px] text-cream">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] bottom-[-20%] h-[120%] w-[55%] text-gold opacity-[0.09]"
        >
          <ArchTrio drawProgress={drawProgress} className="h-full w-auto" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-[6vw] py-20 md:px-[8vw] md:py-24">
          <p className="text-label uppercase text-muted-on-ink">Services</p>
          <h1 className="mt-5 max-w-[18ch] font-display text-hero text-cream">
            Map it. Build it. <em className="italic text-gold">Keep it running.</em>
          </h1>
          <p className="mt-8 max-w-xl text-body-lg text-muted-on-ink">
            Three tiers that stack into one system. Start at the widest view and come inward, or
            take only the part you need.
          </p>
        </div>
      </section>

      {tiers.map((t) => (
        <TierSection key={t.tag} {...t} />
      ))}

      <Section tone="ink-deep">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-label uppercase text-muted-on-ink">FAQ</p>
            <h2 className="mt-4 font-display text-section text-cream">
              What people ask <em className="italic text-gold">before they start.</em>
            </h2>
          </div>
          <div className="mt-14">
            <Faq items={faqs} tone="ink-deep" />
          </div>
        </Reveal>
      </Section>

      <CTASection />
    </>
  )
}
