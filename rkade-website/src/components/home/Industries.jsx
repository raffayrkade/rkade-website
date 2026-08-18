import Marquee from '@/components/common/Marquee'

/**
 * Industries. The marquee stays: it is one of the few things on the old site
 * with any motion personality.
 *
 * It is no longer its own section. It sits on the same cream surface directly
 * under Why RKade with only a hairline between them, so it reads as a footnote
 * rather than as another full-weight argument. It carries no <Section> of its
 * own for that reason: two cream sections touching is exactly what Section
 * warns about, and here the continuation is deliberate.
 */

const industries = [
  'Ecommerce',
  'Professional Services',
  'Healthcare',
  'Hospitality',
  'Real Estate',
  'Operations and Logistics',
]

export default function Industries() {
  return (
    <div className="bg-cream pb-28 md:pb-36">
      <div className="mx-auto max-w-[1400px] px-[6vw] md:px-[8vw]">
        <div className="border-t border-line-strong pt-14">
          <p className="text-label uppercase text-muted">Industries we work with</p>
          <p className="mt-4 max-w-2xl font-display text-card text-ink">
            Automation is not vertical-specific. If your team runs repetitive processes, there is a
            system to build, whatever you operate.
          </p>
        </div>
      </div>

      <Marquee className="mt-12" durationSeconds={38}>
        {industries.map((label) => (
          <span key={label} className="flex items-center whitespace-nowrap">
            <span className="font-display text-card text-ink/70">{label}</span>
            <span aria-hidden="true" className="mx-10 h-1.5 w-1.5 flex-none rounded-full bg-gold-dark" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}
