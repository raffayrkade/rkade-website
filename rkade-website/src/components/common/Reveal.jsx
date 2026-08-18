import { useState } from 'react'
import { motion } from 'framer-motion'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

/**
 * The site's entrance. Content rises 24px into an arch-shaped opening that
 * relaxes to a straight edge, so the reveal itself carries the motif.
 *
 * This replaces a plain opacity-plus-translate fade-up, which is the default
 * motion of every website built since 2020 and said nothing about RKade.
 *
 * The call signature is unchanged on purpose: roughly thirty call sites
 * already use `<Reveal delay={...}>` and none of them needed editing.
 *
 * Under reduced motion it renders a plain div. No clip, no transform, no
 * opacity. The site has to be completely correct with zero animation.
 */

const EASE = [0.16, 1, 0.3, 1]

export default function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const reducedMotion = usePrefersReducedMotion()
  // Once the entrance is over the clip path is dropped entirely rather than
  // left at a 2px round. A resting clip path still creates a clipping context,
  // which shifted antialiasing on images and made otherwise untouched pages
  // render very slightly differently.
  const [settled, setSettled] = useState(false)

  if (reducedMotion || settled) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      className={className}
      initial={{
        opacity: 0,
        y: 24,
        clipPath: 'inset(0% 0% 0% 0% round 42% 42% 2px 2px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0% 0% 0% round 2px 2px 2px 2px)',
      }}
      viewport={{ once: true, margin: '-80px 0px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      onAnimationComplete={() => setSettled(true)}
    >
      {children}
    </MotionTag>
  )
}
