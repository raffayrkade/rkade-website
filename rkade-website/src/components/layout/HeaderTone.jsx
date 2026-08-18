import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * What the header is currently sitting on top of.
 *
 * The header is fixed, so it floats over whatever content happens to be
 * scrolled underneath it at any given moment. Every full-bleed block on the
 * site (every `<Section>`, plus the handful of raw `<section>`/`<div>` hero
 * and band elements that predate `<Section>`) carries a `data-header-tone`
 * attribute of `"dark"` or `"light"`, set from the same tone value that
 * already decides its background and text colour. This hook does not invent
 * a second source of truth: it reads that attribute for whichever block is
 * currently behind the header.
 *
 * Earlier this looked at the PAGE'S HERO ONLY: a page declared one tone on
 * mount (`useDeclareHeaderTone('ink')`) and the header used it until the hero
 * scrolled away, then committed to the cream bar for the rest of the page,
 * forever, even past later dark sections. On pages that alternate tone
 * repeatedly (`/work`, most of `/`) that put a washed cream/70 bar over ink
 * content for a large share of the scroll. Found 18-08-2026, screenshotted at
 * y=1500 on `/work`.
 *
 * Before that, the boundary check itself was a fixed `scrollY > 72px` guess,
 * which put nav text at 3.1:1 over a still-visible ink hero (below the 4.5:1
 * AA minimum). That is why this measures geometry, never a scroll-position
 * constant: which block's rect actually covers the header right now.
 */
export function useHeaderTone(headerHeight = 72) {
  const { pathname } = useLocation()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    // Guarded because vite-react-ssg prerenders this with no window at all.
    if (typeof window === 'undefined') return

    // The vertical midline of the fixed header. Not a scroll-position
    // threshold: it is the header's own height, used to ask "which block
    // currently spans this line", which stays correct at any scroll depth
    // and for any hero height.
    const probeY = headerHeight / 2
    let frame = null

    const measure = () => {
      frame = null
      const blocks = document.querySelectorAll('main [data-header-tone]')
      let current = null
      for (const block of blocks) {
        const rect = block.getBoundingClientRect()
        if (rect.top <= probeY && rect.bottom > probeY) {
          current = block
          break
        }
      }
      setDark(current?.getAttribute('data-header-tone') === 'dark')
    }

    const onScroll = () => {
      if (frame !== null) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // Re-measure on every route change too: a new page means a new set of
    // blocks under the header, and ScrollToTop can land on the same scrollY
    // the previous page ended on.
  }, [headerHeight, pathname])

  return {
    overDark: dark,
    // Gold is legal as text on ink and illegal as text on cream, so the CTA
    // stays a gold fill with ink text on both tones. Only the bar and the
    // link colours flip.
    surface: dark
      ? 'border-transparent bg-transparent'
      : 'border-line-strong bg-cream/70 backdrop-blur-xl',
    link: dark ? 'text-muted-on-ink hover:text-cream' : 'text-muted hover:text-ink',
    icon: dark ? 'text-cream' : 'text-ink',
    wordmark: dark ? 'dark' : 'light',
  }
}
