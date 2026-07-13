import React from 'react';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

export default function Reveal({ children, delay = 0, className = '' }) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
