import { useEffect, useId } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { archOutline, archCentreline, REFERENCE } from './geometry'

/**
 * Turns a 0-to-1 progress, plain number or MotionValue, into a dash offset.
 * Accepting both is what lets one component serve a static render and a
 * scroll-linked one without a second code path.
 */
function useDashOffset(drawProgress) {
  const isMotionValue = Boolean(drawProgress && typeof drawProgress.get === 'function')
  const fallback = useMotionValue(isMotionValue ? 1 : drawProgress)

  useEffect(() => {
    if (!isMotionValue) fallback.set(drawProgress)
  }, [drawProgress, isMotionValue, fallback])

  const source = isMotionValue ? drawProgress : fallback
  return useTransform(source, (p) => 1 - Math.min(1, Math.max(0, p)))
}

/**
 * One arch drawn into an SVG that already exists, around a centre the caller
 * chooses. This is what lets several arches share one coordinate system
 * instead of being nested SVGs that each fight over their own viewBox.
 */
export function ArchShape({
  span = REFERENCE.spans[0],
  strokeWidth = REFERENCE.strokeWidth,
  legHeight = REFERENCE.legHeight,
  cx,
  cy,
  taper = false,
  drawProgress = 1,
  fill = 'currentColor',
  opacity,
}) {
  const rawId = useId()
  const maskId = `arch-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`
  const dashOffset = useDashOffset(drawProgress)

  const d = archOutline({ span, strokeWidth, legHeight, cx, cy, taper })
  const centreline = archCentreline({ span, strokeWidth, legHeight, cx, cy, taper })

  return (
    <>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {/* pathLength="1" makes the dash offset a plain 0-to-1 progress
              value, so the path never has to be measured at runtime. The gap
              is longer than the dash so that at progress 0 the whole path
              sits inside the gap and nothing renders at all: a "1 1" pattern
              left a one-pixel tick at the start point. */}
          <motion.path
            d={centreline}
            pathLength="1"
            fill="none"
            stroke="#fff"
            strokeWidth={strokeWidth + 2}
            strokeDasharray="1 2"
            style={{ strokeDashoffset: dashOffset }}
          />
        </mask>
      </defs>
      <path d={d} fill={fill} opacity={opacity} mask={`url(#${maskId})`} />
    </>
  )
}

/**
 * One hairpin arch, as a standalone element.
 *
 * Two straight legs, a semicircular crown, open at the bottom, no baseline
 * bar. With `taper` on, the right leg is dropped and the crown sweeps past the
 * apex to a point at roughly one o'clock. That taper is what stops the mark
 * reading as a rainbow, and it is the outermost arch of the real logo.
 *
 * The shape is filled rather than stroked, because a tapered arch changes
 * width along its length and a stroke cannot. `drawProgress` draws it on
 * through a mask sweeping the centreline, which behaves identically for
 * tapered and untapered arches.
 */
export default function Arch({
  span = REFERENCE.spans[0],
  strokeWidth = REFERENCE.strokeWidth,
  legHeight = REFERENCE.legHeight,
  taper = false,
  drawProgress = 1,
  className = '',
  title,
  ...rest
}) {
  const outerRadius = span + strokeWidth / 2
  // A tapered arch has no right leg, so its rightmost point is the taper tip,
  // which sits inside the outer radius. Keeping the box symmetric anyway means
  // a tapered and an untapered arch of the same span line up.
  const width = outerRadius * 2
  const height = outerRadius + legHeight

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...rest}
    >
      {title && <title>{title}</title>}
      <ArchShape
        span={span}
        strokeWidth={strokeWidth}
        legHeight={legHeight}
        cx={outerRadius}
        cy={outerRadius}
        taper={taper}
        drawProgress={drawProgress}
      />
    </svg>
  )
}
