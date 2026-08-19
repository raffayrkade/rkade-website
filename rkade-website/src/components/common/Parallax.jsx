import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import useMediaQuery, { MD_UP } from '@/hooks/useMediaQuery';

/**
 * Depth, on anything big enough to show it.
 *
 * Off below `md`. Three of these run at once behind the hero, each one an
 * element framer-motion writes a new transform onto on every scroll frame, and
 * on a 390px screen the layers overlap so heavily that the depth they are
 * meant to create is not readable anyway. Measured 19-08-2026 on an emulated
 * iPhone at 4x CPU throttle: freezing these took frames below 30fps from 34 of
 * 139 to 25 of 132, on top of the larger win from the header's blur.
 *
 * The children still render, at their resting position. This only removes the
 * movement, never the artwork.
 */
export default function Parallax({ children, speed = 0.15, className = '' }) {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const wideEnough = useMediaQuery(MD_UP);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const range = 100 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  if (reducedMotion || !wideEnough) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
