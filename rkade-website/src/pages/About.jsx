import { Terminal, Handshake } from 'lucide-react'
import Section from '@/components/layout/Section'
import Reveal from '@/components/common/Reveal'
import RuleSweep from '@/components/common/RuleSweep'
import ArchTrio from '@/components/arch/ArchTrio'
import Wordmark from '@/components/brand/Wordmark'
import useArchDraw from '@/hooks/useArchDraw'
import CTASection from '@/components/home/CTASection'
import Seo from '@/components/common/Seo'

/**
 * About. The best writing on the old site was the "Why RKade" paragraph,
 * buried on page four beside a stock photo. It is now the top of this page:
 * the whole site is built on the arch idea, so this is where it gets said
 * properly, at full size, with the mark itself drawing alongside it.
 *
 * This also says, for the first time anywhere on the site, that RK is Raffay
 * and Kushan. The founders are named below with no photos, reversing the July
 * change on about-anonymize-founder-cards that stripped the names out: two
 * icon cards with no names read as evasive, which is the opposite of what an
 * About page is for.
 *
 * No stock imagery anywhere on this page. The base44 images that used to sit
 * here are gone.
 */

const founders = [
  {
    icon: Terminal,
    name: 'Raffay Ali',
    role: 'The build side',
    text: 'Lives in the tools, the APIs and the edge cases. Turns a scoped process into a working system.',
  },
  {
    icon: Handshake,
    name: 'Kushan Naresh',
    role: 'Operations',
    text: 'Deals and operations background: sourcing and closing acquisitions, standardising diligence process at a private equity firm. Leans into client conversations and scoping, turning a messy process into something worth automating.',
  },
]

const process = [
  {
    title: 'One phase at a time',
    text: 'Every project breaks into small phases, each one scoped before it starts.',
  },
  {
    title: 'Checked before it moves on',
    text: 'Each phase gets verified against what it was meant to do before the next one begins.',
  },
  {
    title: 'Loaded in a real browser',
    text: 'Nothing ships on the assumption that it works. It gets opened, clicked through and confirmed.',
  },
  {
    title: 'You see it first',
    text: 'A preview goes to you before anything reaches your live site or system.',
  },
]

export default function About() {
  const { ref, drawProgress } = useArchDraw({ mode: 'once', offset: ['start 1', 'end 0.3'] })

  return (
    <>
      <Seo
        title="About RKade: Raffay Ali and Kushan Naresh"
        description="RKade is built and run by Raffay Ali and Kushan Naresh. Small phases, checked before the next one starts, on every project including this site."
        path="/about"
      />
      <section ref={ref} data-header-tone="dark" className="relative isolate overflow-hidden bg-ink pt-[72px] text-cream">
        <div className="relative mx-auto max-w-[1400px] px-[6vw] py-20 md:px-[8vw] md:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <p className="text-label uppercase text-muted-on-ink">About RKade</p>
              <h1 className="mt-6 font-display text-hero text-cream">
                RKade comes from arcade, and arcade comes from the Latin for{' '}
                <em className="italic text-gold">arch.</em>
              </h1>
              <p className="mt-8 max-w-xl text-body-lg text-muted-on-ink">
                An arcade is a run of arches that holds a building up while making a way through it.
                That is the whole idea behind this site, and behind how we build: not a feature
                bolted on top, but the structure that carries the weight so your team can move
                through it faster.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5 border-l-2 border-gold py-1 pl-6">
                <Wordmark tone="dark" size="text-4xl" />
                <p className="max-w-sm text-body text-muted-on-ink">
                  Look again at the first two letters:{' '}
                  <span className="text-cream">RK is Raffay and Kushan</span>, the two founders
                  whose initials sit inside a real word.
                </p>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <ArchTrio
                drawProgress={drawProgress}
                title="The three nested arches of the RKade mark"
                className="h-auto w-full max-w-sm text-gold"
              />
            </div>
          </div>
        </div>
      </section>

      <Section tone="cream">
        <RuleSweep />
        <p className="mt-3 text-label uppercase text-muted">Who's behind it</p>
        <h2 className="mt-4 font-display text-section text-ink">
          Raffay and Kushan. <em className="italic">That's the whole team.</em>
        </h2>
        <Reveal>
          <p className="mt-5 max-w-2xl text-body-lg text-muted">
            We both build. We both sit with clients. These are just where each of us spends more
            time.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded border border-line-strong bg-line md:grid-cols-2">
          {founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.1}>
              <div className="h-full bg-cream p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded border border-gold/30 bg-gold/10">
                  <f.icon className="h-6 w-6 text-gold" />
                </div>
                <p className="mt-6 text-label uppercase text-muted">{f.role}</p>
                <h3 className="mt-2 font-display text-card text-ink">{f.name}</h3>
                <p className="mt-4 text-body-lg text-muted">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ink-deep">
        <RuleSweep tone="ink" />
        <p className="mt-3 text-label uppercase text-muted-on-ink">How the work gets done</p>
        <h2 className="mt-4 max-w-2xl font-display text-section text-cream">
          Small phases. <em className="italic text-gold">Checked before the next one starts.</em>
        </h2>
        <Reveal>
          <p className="mt-5 max-w-xl text-body-lg text-muted-on-ink">
            This is true of every RKade project, including the site you are reading this on right
            now.
          </p>
        </Reveal>

        <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {process.map((p, i) => (
            // Reveal's own div is the group wrapping one dt/dd pair, not a
            // second wrapper around it: see the matching note in
            // WhyRkade.jsx for why the extra div fails axe's dl audits.
            <Reveal key={p.title} delay={i * 0.06} className="border-l-2 border-gold/30 pl-6">
              <dt className="font-body text-base font-medium text-cream">{p.title}</dt>
              <dd className="mt-1 max-w-sm text-body text-muted-on-ink">{p.text}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      <CTASection />
    </>
  )
}
