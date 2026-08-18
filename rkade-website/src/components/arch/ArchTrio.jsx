import { ArchShape } from './Arch'
import { REFERENCE } from './geometry'

/**
 * Three concentric arches, stepping in by one pitch each. The geometry of the
 * real mark, expressed as a system component for layout and animation.
 *
 * This is NOT the logo and must never be used as one. It does not go in the
 * header or the footer. The logo lives in src/components/brand/, carries the
 * traced mark, and is gated on Raffay's sign-off. If this and that ever look
 * different, raise it as a bug rather than quietly reconciling them.
 *
 * Named ArchTrio rather than ArchMark on purpose. docs/plan/phase-02.md asked
 * for src/components/arch/ArchMark.jsx, but src/components/brand/ArchMark.jsx
 * already exists, and two components sharing one name is an import footgun
 * that would eventually put an unapproved mark in the header. Logged in
 * docs/DECISIONS.md.
 *
 * Five legs at the baseline, not six: the outermost arch is tapered, so it has
 * a left leg only.
 */
export default function ArchTrio({
  spans = REFERENCE.spans,
  strokeWidth = REFERENCE.strokeWidth,
  legHeight = REFERENCE.legHeight,
  drawProgress = 1,
  stagger = 0.15,
  className = '',
  style,
  title,
}) {
  const outerRadius = spans[0] + strokeWidth / 2
  const cx = outerRadius
  const cy = outerRadius

  // The tapered outer arch has no right leg, so the mark is asymmetric: the
  // rightmost thing is the middle arch's outer edge. This is why the reference
  // is 182 wide rather than 215.
  const width = cx + spans[1] + strokeWidth / 2
  const height = outerRadius + legHeight

  const isMotionValue = Boolean(drawProgress && typeof drawProgress.get === 'function')

  // Outermost first, so the mark builds inward as it draws. A MotionValue is
  // passed straight through: staggering it would need one derived value per
  // arch, and the scroll-linked case reads better drawing in unison anyway.
  const progressFor = (i) => {
    if (isMotionValue) return drawProgress
    const window = 1 - stagger * (spans.length - 1)
    return Math.min(1, Math.max(0, (drawProgress - i * stagger) / window))
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      style={style}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      {spans.map((span, i) => (
        <ArchShape
          key={span}
          span={span}
          strokeWidth={strokeWidth}
          legHeight={legHeight}
          cx={cx}
          cy={cy}
          taper={i === 0}
          drawProgress={progressFor(i)}
        />
      ))}
    </svg>
  )
}

/** Width-to-height ratio of the trio, for callers sizing a container. */
export function trioAspect(
  spans = REFERENCE.spans,
  strokeWidth = REFERENCE.strokeWidth,
  legHeight = REFERENCE.legHeight,
) {
  const outerRadius = spans[0] + strokeWidth / 2
  return (outerRadius + spans[1] + strokeWidth / 2) / (outerRadius + legHeight)
}
