'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  className?: string;
  delay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'scale' | 'rotate' | 'bounce';
}

export function AnimatedIcon({
  icon: Icon,
  size = 24,
  color = '#00F0FF',
  className = '',
  delay = 0,
  animation = 'fadeIn',
}: AnimatedIconProps) {
  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 1, scale: 1 },
    },
    rotate: {
      initial: { rotate: -180 },
      animate: { rotate: 0 },
    },
    bounce: {
      initial: { y: -20 },
      animate: { y: 0 },
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  return (
    <motion.div
      initial={animations[animation].initial}
      animate={animations[animation].animate}
      transition={{ 
        duration: 0.6, 
        delay,
        ...animations[animation].transition 
      }}
      className={className}
    >
      <Icon 
        size={size} 
        color={color}
        className="stroke-[1.5]"
      />
    </motion.div>
  );
}