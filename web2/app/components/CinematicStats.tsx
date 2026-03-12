// app/components/CinematicStats.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useTransform, useScroll } from 'framer-motion';

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  gradient: string;
}

interface CinematicStatsProps {
  stats: Stat[];
  videoBackground?: string;
}

export function CinematicStats({ stats, videoBackground }: CinematicStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Optional Video Background */}
      {videoBackground && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src={videoBackground} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/90 via-[#1A1A2E]/80 to-[#0A0A0F]/90" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={index}
              stat={stat}
              delay={index * 0.2}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedStat({
  stat,
  delay,
  isInView,
}: {
  stat: Stat;
  delay: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeOutQuart)
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOut * stat.value);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);
  }, [isInView, stat.value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay }}
      className="group relative"
    >
      <div className="relative bg-[#1A1A2E]/60 backdrop-blur-md border border-[#00F0FF]/30 rounded-3xl p-10 text-center hover:border-[#00F0FF]/60 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,240,255,0.3)]">
        {/* Gradient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/10 to-[#FF006E]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Counter */}
        <div className={`relative text-6xl md:text-7xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-4`}>
          {stat.prefix}{count.toLocaleString()}{stat.suffix}
        </div>

        {/* Label */}
        <div className="relative text-gray-300 text-lg font-medium">
          {stat.label}
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-[#00F0FF]/20 to-[#FF006E]/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
      </div>
    </motion.div>
  );
}