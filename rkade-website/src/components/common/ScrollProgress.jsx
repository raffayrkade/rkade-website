import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gold"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
