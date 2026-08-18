import { motion } from 'framer-motion'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

/**
 * A gold hairline that draws left to right as a section enters. One line of
 * motion that gives every section heading the same signature, without another
 * card grid.
 *
 * Decorative, so aria-hidden. Under reduced motion it renders at full width
 * with no animation.
 */
export default function RuleSweep({ width = 'w-10', tone = 'cream', className = '', delay = 0 }) {
  const reducedMotion = usePrefersReducedMotion()
  // Gold is legal as a rule on both tones. As text it is ink-only.
  const colour = tone === 'cream' ? 'bg-gold-dark' : 'bg-gold'

  if (reducedMotion) {
    return <span aria-hidden="true" className={`block h-px ${width} ${colour} ${className}`} />
  }

  return (
    <motion.span
      aria-hidden="true"
      className={`block h-px ${width} origin-left ${colour} ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-60px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}
