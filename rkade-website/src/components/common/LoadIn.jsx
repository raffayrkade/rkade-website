import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

export default function LoadIn() {
  const [visible, setVisible] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(false), 500);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}
