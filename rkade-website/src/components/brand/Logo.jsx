import ArchMark from './ArchMark'
import Wordmark from './Wordmark'

/**
 * The full lockup: arch mark plus wordmark.
 *
 * The arch mark trace was APPROVED by Raffay on 18-08-2026, against
 * docs/brand/arch-mark-trace-comparison.png. `showMark` therefore defaults to
 * true and the lockup ships complete.
 *
 * If a master AI file ever turns up it replaces the trace, no questions. A
 * supplied file always beats a reproduced one.
 *
 * Clear space is the height of the K, per the guide, which is why the gap
 * scales with the wordmark rather than being a fixed pixel value.
 */

const MARK_SIZE = {
  'text-xl': 'h-6',
  'text-2xl': 'h-7',
  'text-3xl': 'h-9',
  'text-4xl': 'h-11',
}

export default function Logo({
  tone = 'light',
  size = 'text-2xl',
  showMark = true,
  className = '',
}) {
  return (
    <span className={`inline-flex items-center gap-[0.55em] ${className}`}>
      {showMark && (
        <ArchMark
          className={`${MARK_SIZE[size] ?? 'h-7'} w-auto ${
            tone === 'dark' ? 'text-gold' : 'text-gold-dark'
          }`}
        />
      )}
      <Wordmark tone={tone} size={size} />
    </span>
  )
}
