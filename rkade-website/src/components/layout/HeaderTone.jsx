import { createContext, useContext, useEffect, useState } from 'react'

/**
 * What the header is currently sitting on top of.
 *
 * The header is fixed, so it floats over whatever the page's first section
 * happens to be. On the old site every section was cream and `bg-cream/70` was
 * always right. Once a hero is ink, a cream bar over it reads as a mistake.
 *
 * The state lives in SiteLayout, above both the header and the page, because
 * the page cannot hand context upward to its own parent. A page declares its
 * hero tone with `useDeclareHeaderTone('ink')` and the header reads it. A page
 * that declares nothing gets cream, which is the old behaviour and is correct
 * for every page that opens light.
 */

const HeaderToneContext = createContext({ tone: 'cream', setTone: () => {} })

export function HeaderToneProvider({ children }) {
  const [tone, setTone] = useState('cream')
  return <HeaderToneContext.Provider value={{ tone, setTone }}>{children}</HeaderToneContext.Provider>
}

/**
 * Called by a page to say what its hero sits on. Resets to cream on unmount so
 * navigating away never leaves the header painted for the previous page.
 */
export function useDeclareHeaderTone(tone) {
  const { setTone } = useContext(HeaderToneContext)

  useEffect(() => {
    setTone(tone)
    return () => setTone('cream')
  }, [tone, setTone])
}

/**
 * Resolves what the header should actually paint right now.
 *
 * Over a dark hero it is transparent with cream text. Past the hero boundary
 * it becomes the solid cream bar, because from there down the page is light
 * again. The threshold is deliberately small so the bar commits early rather
 * than hovering in a half state.
 */
export function useHeaderTone(threshold = 72) {
  const { tone } = useContext(HeaderToneContext)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Guarded because vite-react-ssg prerenders this with no window at all.
    if (typeof window === 'undefined') return

    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  const overDark = tone !== 'cream' && !scrolled

  return {
    overDark,
    scrolled,
    // Gold is legal as text on ink and illegal as text on cream, so the CTA
    // stays a gold fill with ink text on both tones. Only the bar and the link
    // colours flip.
    surface: overDark
      ? 'border-transparent bg-transparent'
      : 'border-line-strong bg-cream/70 backdrop-blur-xl',
    link: overDark ? 'text-muted-on-ink hover:text-cream' : 'text-muted hover:text-ink',
    icon: overDark ? 'text-cream' : 'text-ink',
    wordmark: overDark ? 'dark' : 'light',
  }
}

export default HeaderToneContext
