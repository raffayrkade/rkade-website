import { ReactLenis } from 'lenis/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import useMediaQuery, { POINTER_FINE } from '@/hooks/useMediaQuery';

/**
 * Lenis smooth scroll, on a mouse only.
 *
 * Lenis replaces the browser's own scrolling with a JavaScript-driven glide.
 * On a desktop wheel that is the point: a wheel tick is a blunt 109px jump and
 * the easing is what makes the passage read as one continuous move.
 *
 * On a phone it is the opposite of the point. iOS has its own momentum curve
 * and its own rubber-band at both ends, every native app uses them, and a
 * thumb notices immediately when a page does not. Running Lenis there replaces
 * something Apple tuned with something approximating it, and the approximation
 * is what "feels laggy under my thumb" actually is. Reported 19-08-2026.
 *
 * So the query is pointer type, not screen width. A small window on a laptop
 * still gets the smooth version, a large tablet does not, which is correct in
 * both cases: this is about the input device, not the viewport.
 *
 * `ReactLenis root` renders its children with no wrapper element of its own
 * (lenis/react, the `root && root !== 'asChild'` branch), so mounting or not
 * mounting it changes no DOM structure and hydration stays clean.
 */
export default function SmoothScroll({ children }) {
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useMediaQuery(POINTER_FINE);

  if (reducedMotion || !finePointer) {
    return children;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
