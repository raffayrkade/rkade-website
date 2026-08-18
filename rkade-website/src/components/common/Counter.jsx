import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

/**
 * Counts a real number up once, on first view, and never again.
 *
 * Never animate a number that is not real. If a figure is an estimate, say so
 * in the label rather than letting the motion imply precision.
 *
 * Tabular figures, so the layout does not jitter while it counts. Under
 * reduced motion it renders the final number immediately, with no animation.
 *
 * framer-motion's `animate` drives it, rather than a hand-rolled
 * requestAnimationFrame loop. The hand-rolled version could strand a counter
 * on its starting value: if the frame loop was cancelled once the effect had
 * already run, nothing in the dependency list changed, so the effect never
 * re-ran and the number sat at 0 for good. `onComplete` also pins the exact
 * target, so the last frame can never leave it at 27.998.
 */
export default function Counter({
  to,
  from = 0,
  duration = 1400,
  prefix = '',
  suffix = '',
  decimals = 0,
  // Optional. For large numbers that need a thousands separator.
  format,
  className = '',
}) {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  // Vertical inset only. A bare '-60px' insets all four sides, which on a
  // 390px viewport shrinks the detection root to 270px wide. A narrow element
  // sitting in the 6vw gutter then never intersects it and the counter stays
  // stranded at its starting value. Wider siblings on the same row worked,
  // which is what made it look like a race rather than a geometry bug.
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const [display, setDisplay] = useState(from)

  const render = (v) => (format ? format(Math.round(v)) : v.toFixed(decimals))

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(to)
      return
    }
    if (!inView) return

    const controls = animate(from, to, {
      duration: duration / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setDisplay,
      onComplete: () => setDisplay(to),
    })
    return () => controls.stop()
  }, [inView, reducedMotion, from, to, duration])

  return (
    <span ref={ref} className={`font-display text-stat tabular-nums ${className}`}>
      <span aria-hidden="true">
        {prefix}
        {render(display)}
        {suffix}
      </span>
      {/* `aria-label` is prohibited on a plain span (role "generic" does not
          support naming), which axe's aria-prohibited-attr audit catches.
          A visually-hidden span with the final value does the same job: the
          animated digits are hidden from assistive tech and this text,
          always the finished number, is what gets read out. */}
      <span className="sr-only">
        {prefix}
        {render(to)}
        {suffix}
      </span>
    </span>
  )
}
