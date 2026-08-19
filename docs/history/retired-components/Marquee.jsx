import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

/**
 * The scrolling industry list.
 *
 * The content is duplicated so the loop is seamless. Under reduced motion the
 * duplicate is dropped entirely and the list renders once, static, readable
 * from the start rather than frozen mid-scroll on a torn frame.
 *
 * index.css also stops `.animate-marquee` under a reduced-motion media query,
 * which covers the moment before hydration. Both are deliberate: the CSS is
 * the safety net, this is the correct DOM.
 */
export default function Marquee({ children, className = '', durationSeconds = 30 }) {
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="flex flex-wrap">{children}</div>
      </div>
    )
  }

  return (
    <div className={`group overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        <div className="flex flex-none">{children}</div>
        <div className="flex flex-none" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
