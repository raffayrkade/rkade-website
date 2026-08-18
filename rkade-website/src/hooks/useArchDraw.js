import { useRef } from 'react'
import { useScroll, useTransform, useMotionValue } from 'framer-motion'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

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
 */
export default function useArchDraw({ mode = 'once', offset = ['start 0.9', 'end 0.55'] } = {}) {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset })

  const linked = useTransform(scrollYProgress, [0, 1], [0, 1])
  const highWaterMark = useRef(0)
  const onceValue = useTransform(scrollYProgress, (p) => {
    highWaterMark.current = Math.max(highWaterMark.current, p)
    return highWaterMark.current
  })

  const always = useMotionValue(1)

  const drawProgress = reducedMotion ? always : mode === 'linked' ? linked : onceValue

  return { ref, drawProgress, reducedMotion }
}
