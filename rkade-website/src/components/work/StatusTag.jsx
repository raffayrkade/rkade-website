import { STATUSES } from '@/data/work'

/**
 * Live, Delivered, or Built in client review.
 *
 * This is a credibility feature, not a disclaimer. Two of the five systems are
 * not deployed, and saying so plainly is worth more than inventing a
 * deployment that falls apart the moment a prospect asks to see it.
 */
export default function StatusTag({ status, tone = 'ink' }) {
  const s = STATUSES[status]
  if (!s) return null

  const onInk = tone === 'ink'
  // Gold as text is legal on ink and illegal on cream, so the light version is
  // an ink label behind a gold rule rather than gold type.
  const styles =
    s.tone === 'gold'
      ? onInk
        ? 'text-gold border-gold/40'
        : 'text-ink border-gold-dark bg-gold/15'
      : onInk
        ? 'text-muted-on-ink border-cream/25'
        : 'text-muted border-line-strong'

  return (
    <span
      className={`inline-flex items-center rounded border px-2.5 py-1 text-label uppercase ${styles}`}
    >
      {s.label}
    </span>
  )
}
