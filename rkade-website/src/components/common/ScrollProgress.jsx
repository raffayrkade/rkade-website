import { motion, useScroll, useSpring } from 'framer-motion'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

/**
 * The gold hairline across the bottom of the header showing read progress.
 *
 * Under reduced motion it still tracks the scroll, because that is
 * information rather than decoration, but the spring is dropped so it follows
 * the scroll exactly instead of easing and overshooting.
 */
export default function ScrollProgress() {
  const reducedMotion = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll()
  const smoothed = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gold"
      style={{ scaleX: reducedMotion ? scrollYProgress : smoothed }}
      aria-hidden="true"
    />
  )
}
