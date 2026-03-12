// app/home/components/Timeline.tsx
'use client';

import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  label: string;
  value: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mt-12"
    >
      {/* Línea de tiempo */}
      <div className="relative flex items-center justify-between max-w-3xl mx-auto">
        {/* Línea conectora */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#00F0FF] via-[#FF006E] to-[#00F0FF] -translate-y-1/2 rounded-full" />
        
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.2 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Círculo */}
            <div className="w-6 h-6 bg-[#00F0FF] rounded-full border-4 border-[#0A0A0F] shadow-[0_0_20px_rgba(0,240,255,0.5)] mb-4" />
            
            {/* Año */}
            <div className="text-2xl font-bold text-white mb-1">{item.year}</div>
            
            {/* Label */}
            <div className="text-sm text-gray-400 text-center">{item.label}</div>
            
            {/* Value */}
            <div className="text-xs text-[#00F0FF] mt-1">{item.value}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}