import Arch from '@/components/arch/Arch'
import ArchTrio from '@/components/arch/ArchTrio'
import ArchFrame from '@/components/arch/ArchFrame'
import ArchPassage from '@/components/arch/ArchPassage'
import Section from '@/components/layout/Section'
import Reveal from '@/components/common/Reveal'
import Counter from '@/components/common/Counter'
import RuleSweep from '@/components/common/RuleSweep'
import Wordmark from '@/components/brand/Wordmark'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

/**
 * Dev-only kit route. Not linked from the nav and not in the prerendered route
 * list, so it never ships as a page. It exists so the arch primitives can be
 * seen in both tones at once, which is the only reliable way to catch a shape
 * that is subtly wrong on ink but fine on cream.
 */

function Swatch({ name, className, note }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-10 w-10 flex-none rounded border border-line-strong ${className}`} />
      <span className="text-body">
        <span className="block">{name}</span>
        {note && <span className="block text-label uppercase opacity-70">{note}</span>}
      </span>
    </div>
  )
}

function Row({ title, children }) {
  return (
    <div className="mt-14 first:mt-0">
      <RuleSweep />
      <h2 className="mt-3 font-display text-card">{title}</h2>
      <div className="mt-6">{children}</div>
    </div>
  )
}

export default function Kit() {
  const reducedMotion = usePrefersReducedMotion()
  const steps = [0, 0.25, 0.5, 0.75, 1]
  const cards = ['One', 'Two', 'Three']

  return (
    <div>
      <Section tone="ink" padding="tight">
        <p className="text-label uppercase text-muted-on-ink">Dev only, not shipped</p>
        <h1 className="mt-3 font-display text-section">The arch system</h1>
        <p className="mt-4 max-w-xl text-body-lg text-muted-on-ink">
          Every primitive that phases 3 to 5 are built from. Reduced motion is currently{' '}
          <strong className="font-medium text-cream">{reducedMotion ? 'ON' : 'OFF'}</strong>.
        </p>
      </Section>

      <Section tone="cream">
        <Row title="Arch, untapered and tapered">
          <div className="flex flex-wrap items-end gap-10 text-gold-dark">
            <Arch span={99} strokeWidth={17} className="h-32 w-auto" />
            <Arch span={99} strokeWidth={17} taper className="h-32 w-auto" />
            <Arch span={99} strokeWidth={7} className="h-32 w-auto" />
            <Arch span={99} strokeWidth={7} taper className="h-32 w-auto" />
          </div>
        </Row>

        <Row title="Draw progress, stepped">
          <div className="flex flex-wrap items-end gap-8 text-gold-dark">
            {steps.map((p) => (
              <div key={p} className="text-center">
                <ArchTrio drawProgress={p} className="h-28 w-auto" />
                <span className="mt-2 block text-label uppercase text-muted">{p}</span>
              </div>
            ))}
          </div>
        </Row>

        <Row title="Trio beside the wordmark">
          <div className="flex flex-wrap items-center gap-8">
            <ArchTrio className="h-20 w-auto text-gold-dark" />
            <Wordmark size="text-4xl" />
          </div>
        </Row>

        <Row title="Counter">
          <div className="flex flex-wrap gap-12">
            <div>
              <Counter to={28} />
              <p className="mt-1 text-label uppercase text-muted">Phases shipped</p>
            </div>
            <div>
              <Counter to={94} suffix="%" />
              <p className="mt-1 text-label uppercase text-muted">Manual steps removed</p>
            </div>
            <div>
              <Counter to={3.5} decimals={1} suffix="h" />
              <p className="mt-1 text-label uppercase text-muted">Saved per day</p>
            </div>
          </div>
        </Row>

        <Row title="Reveal, arch-masked">
          <div className="grid gap-px bg-line sm:grid-cols-3">
            {cards.map((n, i) => (
              <Reveal key={n} delay={i * 0.08}>
                <div className="h-full bg-cream p-8">
                  <h3 className="font-display text-card">{n}</h3>
                  <p className="mt-2 text-body text-muted">
                    Rises into an arch-shaped opening that relaxes to a straight edge.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Row>
      </Section>

      <Section tone="ink">
        <Row title="The same primitives on ink">
          <div className="flex flex-wrap items-end gap-10 text-gold">
            <Arch span={99} strokeWidth={17} className="h-32 w-auto" />
            <Arch span={99} strokeWidth={17} taper className="h-32 w-auto" />
            <ArchTrio className="h-32 w-auto" />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-10">
            <Counter to={12} suffix="k" className="text-cream" />
            <Wordmark tone="dark" size="text-4xl" />
            <RuleSweep tone="ink" width="w-24" />
          </div>
        </Row>
      </Section>

      <ArchPassage>
        <Section tone="ink-deep">
          <Row title="ArchPassage, three uses maximum site-wide">
            <p className="max-w-xl text-body-lg text-muted-on-ink">
              This whole section is clipped by an arch that opens as you scroll into it. It is the
              most literal expression of the idea and the easiest thing on the site to overdo.
            </p>
          </Row>
        </Section>
      </ArchPassage>

      <Section tone="cream">
        <Row title="ArchFrame">
          <ArchFrame scale={0.75} className="py-16">
            <div className="mx-auto max-w-lg text-center">
              <h3 className="font-display text-section">Framed by the motif</h3>
              <p className="mt-3 text-body-lg text-muted">
                A large, low-opacity trio drawing on behind the content as it enters.
              </p>
            </div>
          </ArchFrame>
        </Row>

        <Row title="Palette">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Swatch name="cream" className="bg-cream" />
            <Swatch name="cream-raised" className="bg-cream-raised" />
            <Swatch name="ink" className="bg-ink" />
            <Swatch name="ink-deep" className="bg-ink-deep" />
            <Swatch name="gold" className="bg-gold" note="text on ink only" />
            <Swatch name="gold-dark" className="bg-gold-dark" note="fills and rules only" />
            <Swatch name="muted" className="bg-muted" />
            <Swatch name="muted-on-ink" className="bg-muted-on-ink" />
            <Swatch name="line" className="bg-line" note="hairline inside a card" />
            <Swatch name="line-strong" className="bg-line-strong" note="component edge" />
          </div>
        </Row>

        <Row title="Type scale">
          <div className="space-y-4">
            <p className="font-display text-hero">Hero</p>
            <p className="font-display text-section">Section heading</p>
            <p className="font-display text-card">Card heading</p>
            <p className="font-display text-stat tabular-nums">1234</p>
            <p className="text-body-lg">Body large, 17px, the intro paragraph size.</p>
            <p className="text-body">Body, 15px, the default reading size.</p>
            <p className="text-label uppercase">Label and eyebrow</p>
            <p className="text-button uppercase">Button</p>
          </div>
        </Row>
      </Section>
    </div>
  )
}
