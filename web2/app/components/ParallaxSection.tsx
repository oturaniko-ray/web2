// app/components/ParallaxSection.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ParallaxSection({
  children,
  speed = 0.3,
  className = '',
  direction = 'up',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 150 };
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [100, -100] : direction === 'down' ? [-100, 100] : [0, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' ? [100, -100] : direction === 'right' ? [-100, 100] : [0, 0]
  );

  const smoothY = useSpring(y, springConfig);
  const smoothX = useSpring(x, springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY, x: smoothX }}
      className={className}
    >
      {children}
    </motion.div>
  );
}