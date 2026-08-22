import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Parallax from '@/components/common/Parallax'
import ArchTrio from '@/components/arch/ArchTrio'
import useArchDraw from '@/hooks/useArchDraw'
import FreeAuditLink from '@/components/common/FreeAuditLink'

/**
 * The hero. Dark, and the first time the site has ever used the brand's dark
 * version. You should feel like you have walked into somewhere expensive.
 *
 * The old HeroArt is gone. Its nested-arch idea was right and its execution
 * was a dark tile floating in a cream page. The whole section is ink now, so
 * the arches live full-bleed in the background where they belong, keeping the
 * three-layer parallax that was the good part.
 */

export default function Hero() {
  const { ref, drawProgress } = useArchDraw({ mode: 'once', offset: ['start 1', 'end 0.2'] })

  return (
    <section
      ref={ref}
      data-header-tone="dark"
      className="relative isolate overflow-hidden bg-ink pt-[72px] text-cream"
    >
      {/* Three depth layers, speeds 0.05 / 0.15 / 0.3, per docs/ART-DIRECTION.md. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Parallax speed={0.05} className="absolute inset-0">
          <div className="absolute -right-[18%] top-[6%] h-[125%] w-[85%] text-gold opacity-[0.07]">
            <ArchTrio drawProgress={drawProgress} className="h-full w-auto" />
          </div>
        </Parallax>
        <Parallax speed={0.15} className="absolute inset-0 hidden md:block">
          <div className="absolute -left-[22%] bottom-0 h-[95%] w-[60%] text-gold opacity-[0.06]">
            <ArchTrio drawProgress={drawProgress} className="h-full w-auto" />
          </div>
        </Parallax>
        <Parallax speed={0.3} className="absolute inset-0">
          <div className="absolute -right-[6%] bottom-[-14%] h-[70%] w-[45%] text-gold opacity-[0.13]">
            <ArchTrio drawProgress={drawProgress} className="h-full w-auto" />
          </div>
        </Parallax>
        {/* A single soft pool of light at the vanishing point. Not a gradient
            fill across a surface, which the brand guide bans. `rounded-full`
            here is the shape of a radial blur, not a corner radius: at
            120px of blur the box's actual corners are invisible, only the
            ellipse silhouette reads. Exempt from the 2px corner rule for the
            same reason arches are. */}
        <div className="absolute left-1/2 top-[38%] h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.10] blur-[120px]" />
      </div>

      {/* svh, not vh: on iOS Safari vh measures the screen with the toolbars
          hidden, so the two buttons below sat under Safari's own chrome on a
          phone. svh is the toolbar-visible height, so the hero fits as drawn
          and does not resize as the toolbar slides away.

          76svh, down from 86svh, and py-20/24 down from py-24/32. Audit pass 2
          measured 571px of empty space in an 880px hero holding 309px of
          content, the worst ratio on the page. It still opens on a near-full
          screen with both CTAs above the fold, which is the only thing the
          height was ever protecting. */}
      <div className="relative mx-auto flex min-h-[76svh] max-w-[1400px] flex-col justify-center px-[6vw] py-20 md:px-[8vw] md:py-24">
        <p className="text-label uppercase text-muted-on-ink">
          AI Consultants <span className="text-gold">·</span> Dubai
        </p>

        <h1 className="mt-6 max-w-[16ch] font-display text-hero text-cream">
          We build the systems your business <em className="italic text-gold">runs on.</em>
        </h1>

        <p className="mt-7 max-w-xl text-body-lg text-muted-on-ink">
          Custom systems built around how your business actually operates. Less time lost to
          repetitive work, more time on what grows revenue.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <FreeAuditLink
        className="inline-flex min-h-[52px] items-center rounded bg-gold px-7 text-button uppercase text-ink transition-transform duration-300 ease-passage hover:-translate-y-0.5"
      >
            Free Audit
          </FreeAuditLink>
          <Link
            to="/work"
            className="group inline-flex min-h-[52px] items-center gap-2 rounded border border-cream/25 px-7 text-button uppercase text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            See the work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
