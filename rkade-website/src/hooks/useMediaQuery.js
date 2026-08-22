import { useEffect, useState } from 'react';

/**
 * One media query, as a boolean, kept live.
 *
 * Always starts `false`, deliberately. vite-react-ssg prerenders every route
 * with no `window` at all, so the first client render has to match the HTML
 * that was written at build time. Starting false and correcting in an effect
 * is the only version that hydrates cleanly. It also means every caller must
 * treat false as "not yet known", which is why the two callers here both use
 * it to switch an enhancement ON rather than to switch content off.
 *
 * Same shape as usePrefersReducedMotion, which is the query this joins.
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);

    const handleChange = (e) => setMatches(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

/**
 * A mouse, not a thumb. Anything with a real hover state and a precise
 * pointer, which on every phone and tablet is false.
 */
export const POINTER_FINE = '(hover: hover) and (pointer: fine)';

/** Tailwind's `md`. Kept as one string so it cannot drift from the config. */
export const MD_UP = '(min-width: 768px)';
