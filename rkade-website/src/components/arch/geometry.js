/**
 * Arch geometry, in one place, so no component re-derives it.
 *
 * Measured off docs/brand/extracted/arch-mark-icon.jpg by pixel sampling on
 * 18-08-2026. The reference has its three arches sharing a centre at
 * (328.75, 341.5) with centreline radii 33 / 66 / 99, stroke 17, legs ending
 * flat at y = 431.
 *
 * docs/plan/phase-02.md quotes 98.5 / 65.75 / 33, stroke 17, gap 15.75, pitch
 * 32.75. Those were the first pass and they are off by rounding. The measured
 * values are exactly regular: pitch 33, gap 16. Use these.
 */

// One pitch is one stroke plus one gap. Everything steps by it.
export const REFERENCE = {
  spans: [99, 66, 33], // centreline half-widths, outermost first
  strokeWidth: 17,
  gap: 16,
  pitch: 33,
  legHeight: 89.5, // from the shared centre down to the flat baseline
  // The taper arc is internally tangent to the outer edge at the apex.
  // 40.4 / 107.5 in the reference, kept as a ratio so it scales with any arch.
  taperRatio: 40.4 / 107.5,
}

/**
 * Where the tapering crown comes to a point.
 *
 * The taper is a circular arc of radius `rt`, internally tangent to the arch's
 * outer edge at the apex. It ends where it crosses the arch's inner edge, and
 * that crossing is the tip. Solving the two circles gives it in closed form,
 * so the taper stays faithful at any span or stroke width.
 */
export function taperTip(span, strokeWidth, taperRatio = REFERENCE.taperRatio) {
  const ro = span + strokeWidth / 2 // outer edge radius
  const ri = span - strokeWidth / 2 // inner edge radius
  const rt = ro * taperRatio // taper arc radius
  const d = ro - rt // distance from arch centre down to the taper centre

  // Relative to the arch centre, y positive downwards.
  const y = (rt * rt - ri * ri - d * d) / (2 * d)
  const x = Math.sqrt(Math.max(0, ri * ri - y * y))

  return { x, y, ro, ri, rt, angle: Math.atan2(x, -y) }
}

/**
 * The outline of one arch as a filled path.
 *
 * Filled rather than stroked because the tapered arch cannot be a stroke: it
 * changes width along its length. Drawing it as a stroke plus a separate
 * taper left a visible hairline seam at the apex, so both variants are filled
 * and stay consistent with each other.
 */
export function archOutline({ span, strokeWidth, legHeight, cx, cy, taper }) {
  const ro = span + strokeWidth / 2
  const ri = span - strokeWidth / 2
  const baseline = cy + legHeight

  if (!taper) {
    return [
      `M${cx - ro} ${baseline}`,
      `V${cy}`,
      `A${ro} ${ro} 0 0 1 ${cx + ro} ${cy}`,
      `V${baseline}`,
      `H${cx + ri}`,
      `V${cy}`,
      `A${ri} ${ri} 0 0 0 ${cx - ri} ${cy}`,
      `V${baseline}`,
      'Z',
    ].join(' ')
  }

  const { x, y, rt } = taperTip(span, strokeWidth)
  return [
    `M${cx - ro} ${baseline}`,
    `V${cy}`,
    `A${ro} ${ro} 0 0 1 ${cx} ${cy - ro}`,
    `A${rt} ${rt} 0 0 1 ${cx + x} ${cy + y}`,
    `A${ri} ${ri} 0 0 0 ${cx - ri} ${cy}`,
    `V${baseline}`,
    'Z',
  ].join(' ')
}

/**
 * The centreline of one arch, used as the mask path that draws it on.
 *
 * `pathLength="1"` on this path lets stroke-dashoffset be a plain 0-to-1
 * progress value, with no need to measure the path at runtime.
 */
export function archCentreline({ span, strokeWidth, legHeight, cx, cy, taper }) {
  const baseline = cy + legHeight
  const start = `M${cx - span} ${baseline} V${cy}`

  if (!taper) {
    return `${start} A${span} ${span} 0 0 1 ${cx + span} ${cy} V${baseline}`
  }

  // Follow the crown round to the taper's tip angle so the mask covers the point.
  const { angle } = taperTip(span, strokeWidth)
  const ex = cx + span * Math.sin(angle)
  const ey = cy - span * Math.cos(angle)
  return `${start} A${span} ${span} 0 0 1 ${ex} ${ey}`
}
