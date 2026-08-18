/**
 * The RKade arch mark.
 *
 * Traced from the brand guide PDF and measured against it. The geometry and
 * the reasoning live in public/brand/arch-mark.svg and docs/brand/README.md.
 *
 * The SVG is inlined here on purpose. It paints from `currentColor` so one
 * file serves both cream and ink backgrounds, and `currentColor` does not
 * cross an <img> boundary: referenced as <img src="arch-mark.svg"> it renders
 * black. Inlining is what makes the colour work.
 *
 * Not yet approved. Until Raffay signs off on the trace, Logo renders the
 * wordmark alone and nothing here reaches the site.
 */

export default function ArchMark({ className = 'h-8 w-auto', title = 'RKade' }) {
  return (
    <svg
      viewBox="0 0 182 197"
      fill="none"
      className={className}
      role="img"
      aria-label={title}
    >
      <g stroke="currentColor" strokeWidth="17" fill="none">
        <path d="M74.5 197V107.5a33 33 0 0 1 66 0V197" />
        <path d="M41.5 197V107.5a66 66 0 0 1 132 0V197" />
      </g>
      <path
        fill="currentColor"
        d="M0 197V107.5A107.5 107.5 0 0 1 107.5 0a40.4 40.4 0 0 1 37.4 25.08A90.5 90.5 0 0 0 17 107.5V197Z"
      />
    </svg>
  )
}
