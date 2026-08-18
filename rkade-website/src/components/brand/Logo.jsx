import ArchMark from './ArchMark'
import Wordmark from './Wordmark'

/**
 * The full lockup: arch mark plus wordmark.
 *
 * The arch mark is traced but NOT YET APPROVED, so `showMark` defaults to
 * false and this renders the wordmark alone. That is deliberate: the brand
 * guide forbids shipping a reproduced mark, and Raffay's approval covers
 * building the trace, not shipping an inaccurate one.
 *
 * When he signs off on docs/brand/arch-mark-trace-comparison.png, flip the
 * default to true. That is the whole change. Nothing else needs rebuilding.
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
  showMark = false,
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
