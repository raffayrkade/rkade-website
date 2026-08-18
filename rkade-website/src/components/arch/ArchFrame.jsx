import ArchTrio from './ArchTrio'
import useArchDraw from '@/hooks/useArchDraw'

/**
 * Wraps a block of content in an arch silhouette: a large, low-opacity trio
 * sitting behind it, drawing on as the block enters.
 *
 * Decoration, so it is aria-hidden and never carries meaning. If the content
 * needs the arch to be understood, the content is wrong.
 */
export default function ArchFrame({
  children,
  tone = 'cream',
  align = 'center',
  scale = 0.9,
  opacity = 0.14,
  mode = 'once',
  className = '',
}) {
  const { ref, drawProgress } = useArchDraw({ mode })

  const colour = tone === 'cream' ? 'text-gold-dark' : 'text-gold'
  const justify = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 flex items-end ${justify} ${colour}`}
        style={{ opacity }}
      >
        {/* Sized off height, not width. Sizing off width made the trio taller
            than its own section, so it was clipped mid-crown and bled into the
            section above. */}
        <ArchTrio drawProgress={drawProgress} className="w-auto" style={{ height: `${scale * 100}%` }} />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
