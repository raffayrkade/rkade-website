/**
 * The RKade wordmark.
 *
 * Brand rules, not style choices. Any reproduction keeps all three:
 *   - Written RKade. Capital R, capital K, lowercase "ade". Never all-caps in copy.
 *   - RK is visually heavier than ade. Those are the founders' initials sitting
 *     inside a real word, and the weight split is what makes that readable.
 *   - Cormorant Garamond only. RK at 600, ade at 300. Never bold.
 */

const TONES = {
  // On cream.
  light: { lead: 'text-ink', tail: 'text-muted' },
  // On ink.
  dark: { lead: 'text-cream', tail: 'text-muted-on-ink' },
}

export default function Wordmark({ tone = 'light', size = 'text-2xl', className = '' }) {
  const { lead, tail } = TONES[tone] ?? TONES.light

  return (
    <span className={`font-display leading-none tracking-tight ${size} ${className}`}>
      <span className={`font-semibold ${lead}`}>RK</span>
      <span className={`font-light ${tail}`}>ade</span>
    </span>
  )
}
