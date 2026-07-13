import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

export default function Parallax({ children, speed = 0.15, className = '' }) {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const range = 100 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
