import { useEffect } from 'react'

/**
 * Every section on the site goes through this.
 *
 * It owns the background, the correct text tones for that background, the
 * gutter, the max width and the top rule. Once this exists no page component
 * picks a background by hand, which is exactly how the old site ended up with
 * seven identical cream sections in a row.
 */

const TONES = {
  cream: {
    surface: 'bg-cream text-ink',
    rule: 'border-line-strong',
    muted: 'text-muted',
  },
  ink: {
    surface: 'bg-ink text-cream',
    rule: 'border-cream/15',
    muted: 'text-muted-on-ink',
  },
  'ink-deep': {
    surface: 'bg-ink-deep text-cream',
    rule: 'border-cream/10',
    muted: 'text-muted-on-ink',
  },
}

// Tightened 22-08-2026, audit pass 2 item S1. `default` was py-28 md:py-36,
// which is 144px of padding above AND below four of the homepage's sections:
// 1,152px of a 9,306px page in section padding alone, and the single largest
// contributor to a homepage that measured 10.1 screens on desktop and 13.0 on
// mobile. 96px on desktop is still generous, and the mobile figure comes down
// with it because mobile was the worse of the two.
const PADDING = {
  none: '',
  tight: 'py-14 md:py-16',
  default: 'py-20 md:py-24',
  loose: 'py-24 md:py-32',
}

// Development-time only. Two sections of the same tone must not touch: the
// alternation IS the passage. A silent allowance is how it drifts back.
let previousTone = null

export default function Section({
  tone = 'cream',
  padding = 'default',
  id,
  rule = false,
  className = '',
  innerClassName = '',
  children,
  ...rest
}) {
  const t = TONES[tone] ?? TONES.cream

  useEffect(() => {
    if (!import.meta.env.DEV) return
    if (previousTone === tone) {
      // eslint-disable-next-line no-console
      console.warn(
        `[Section] Two "${tone}" sections in a row${id ? ` (at #${id})` : ''}. ` +
          'The palette is meant to alternate dark to light to dark, like walking ' +
          'under a colonnade. See docs/ART-DIRECTION.md.',
      )
    }
    previousTone = tone
    return () => {
      previousTone = null
    }
  }, [tone, id])

  return (
    <section
      id={id}
      // Read by the fixed header (src/components/layout/HeaderTone.jsx) to
      // decide its own tone: whichever section's rect currently sits under
      // the header wins, not just the page's first one.
      data-header-tone={tone === 'cream' ? 'light' : 'dark'}
      className={`${t.surface} ${PADDING[padding] ?? PADDING.default} ${rule ? `border-t ${t.rule}` : ''} ${className}`}
      {...rest}
    >
      <div className={`mx-auto max-w-[1400px] px-[6vw] md:px-[8vw] ${innerClassName}`}>{children}</div>
    </section>
  )
}

/** So a child can ask what reads as secondary text on its parent's tone. */
export function mutedFor(tone) {
  return (TONES[tone] ?? TONES.cream).muted
}
