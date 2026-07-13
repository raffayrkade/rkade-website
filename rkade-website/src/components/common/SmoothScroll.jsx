import { ReactLenis } from 'lenis/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

export default function SmoothScroll({ children }) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return children;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
