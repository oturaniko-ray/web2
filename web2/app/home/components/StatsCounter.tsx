// app/home/components/StatsCounter.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatsCounterProps {
  start: number;
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  gradient?: string;
}

export function StatsCounter({
  start,
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  label,
  gradient = 'from-[#00F0FF] to-[#FF006E]',
}: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOut * (end - start) + start);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, start, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#1A1A2E]/60 backdrop-blur-sm border border-[#00F0FF]/30 rounded-2xl p-8 text-center hover:border-[#00F0FF]/60 transition-all hover:scale-105"
    >
      <div className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-3`}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </motion.div>
  );
}