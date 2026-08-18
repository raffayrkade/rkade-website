import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

/**
 * The section transition: content passes through an arch-shaped opening as one
 * section ends and the next begins.
 *
 * This is the most literal expression of the whole idea, and it is very easy
 * to overdo. **Three uses maximum across the entire site.** Phase 3 picks
 * them. If you are reaching for a fourth, use ArchFrame instead.
 *
 * Under reduced motion it renders as a plain block with no clipping at all.
 */
export default function ArchPassage({ children, className = '', from = 55 }) {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.35'] })

  // The opening starts as a tall arch and relaxes into a straight edge, so the
  // section reads as being walked through rather than faded in.
  const clip = useTransform(scrollYProgress, [0, 1], [
    `inset(0% 0% 0% 0% round ${from}% ${from}% 0px 0px)`,
    'inset(0% 0% 0% 0% round 2px 2px 0px 0px)',
  ])

  if (reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div ref={ref} className={className} style={{ clipPath: clip, WebkitClipPath: clip }}>
      {children}
    </motion.div>
  )
}
