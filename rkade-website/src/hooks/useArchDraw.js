import { useRef } from 'react'
import { useScroll, useTransform, useMotionValue } from 'framer-motion'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import useMediaQuery, { MD_UP } from '@/hooks/useMediaQuery'

/**
 * Binds an arch's draw progress to where its container sits in the viewport.
 *
 * Returns `{ ref, drawProgress }`. Put the ref on the element that should
 * trigger the draw, and hand drawProgress to <Arch> or <ArchTrio>.
 *
 *   mode="linked"  follows the scroll both ways. For the hero and the tier
 *                  section, where scrolling back up should un-draw.
 *   mode="once"    draws on first entry and stays drawn.
 *
 * Under reduced motion this returns a constant 1: fully drawn, immediately,
 * always. The site has to be completely correct with zero animation, and a
 * half-drawn arch is not correct.
 *
 * Below `md` it returns that same constant, for a different reason. The draw
 * animates an SVG mask's stroke-dashoffset, a mask cannot be GPU composited,
 * and these are full-bleed artwork, so every scroll frame repaints the lot.
 * On an emulated iPhone at 4x CPU throttle, removing these arches took frames
 * below 30fps from 47% to 34%, the biggest remaining cost after the header's
 * blur. The arch is the brand, so it stays on screen and stops moving.
 */
export default function useArchDraw({ mode = 'once', offset = ['start 0.9', 'end 0.55'] } = {}) {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const wideEnough = useMediaQuery(MD_UP)
  const static_ = reducedMotion || !wideEnough

  const { scrollYProgress } = useScroll({ target: ref, offset })

  const linked = useTransform(scrollYProgress, [0, 1], [0, 1])
  const highWaterMark = useRef(0)
  const onceValue = useTransform(scrollYProgress, (p) => {
    highWaterMark.current = Math.max(highWaterMark.current, p)
    return highWaterMark.current
  })

  const always = useMotionValue(1)

  const drawProgress = static_ ? always : mode === 'linked' ? linked : onceValue

  // `reducedMotion` stays the reduced-motion answer only. A caller asking
  // "should I animate?" wants `static`, which is the wider question.
  return { ref, drawProgress, reducedMotion, static: static_ }
}
