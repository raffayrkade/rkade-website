import { CALENDAR_LINK } from '@/components/common/CTAButtons'
import ArchTrio from '@/components/arch/ArchTrio'
import useArchDraw from '@/hooks/useArchDraw'

/**
 * The close. On ink, and the whole section sits inside one large arch, which
 * is the decorative idea the old version already had, scaled up until it is
 * structure rather than ornament.
 *
 * One CTA, one destination. The audit is genuinely free, so the button says
 * exactly that and nothing softens it.
 *
 * Reused verbatim on /services and /about, so it takes no props and depends on
 * nothing above it.
 */
export default function CTASection() {
  const { ref, drawProgress } = useArchDraw({ mode: 'once' })

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center text-gold opacity-[0.11]"
      >
        <ArchTrio drawProgress={drawProgress} className="h-auto w-[min(140%,1500px)]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-[6vw] py-32 text-center md:px-[8vw] md:py-44">
        <h2 className="mx-auto max-w-[18ch] font-display text-section text-cream">
          Stop paying people to do <em className="italic text-gold">what a system can.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-body-lg text-muted-on-ink">
          Start with the audit. We map exactly where automation pays off, and tell you the order to
          do it in. It costs nothing and there is no pitch.
        </p>
        <div className="mt-11 flex justify-center">
          <a
            href={CALENDAR_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center rounded bg-gold px-8 text-button uppercase text-ink transition-transform duration-300 ease-passage hover:-translate-y-0.5"
          >
            Free Audit
          </a>
        </div>
      </div>
    </section>
  )
}
