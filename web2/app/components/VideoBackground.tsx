// app/components/VideoBackground.tsx
'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface VideoBackgroundProps {
  videoSrc: string;
  children: React.ReactNode;
  overlay?: 'dark' | 'light' | 'gradient';
  parallaxIntensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export function VideoBackground({
  videoSrc,
  children,
  overlay = 'dark',
  parallaxIntensity = 'medium',
  className = '',
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Parallax intensity levels
  const parallaxValues = {
    low: 0.1,
    medium: 0.3,
    high: 0.5,
  };

  const yVideo = useTransform(
    scrollYProgress,
    [0, 1],
    [0, parallaxValues[parallaxIntensity] * 100]
  );

  const opacityOverlay = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.6, 0.4, 0.7]
  );

  // Overlay styles
  const overlayStyles = {
    dark: 'bg-gradient-to-b from-[#0A0A0F]/80 via-[#1A1A2E]/70 to-[#0A0A0F]/90',
    light: 'bg-gradient-to-b from-white/20 via-white/10 to-white/30',
    gradient: 'bg-gradient-to-br from-[#00F0FF]/30 via-[#0A0A0F]/60 to-[#FF006E]/30',
  };

  useEffect(() => {
    // Lazy load video only when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch(() => {
              // Silent fail if autoplay blocked
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Video Layer with Parallax */}
      <motion.div
        style={{ y: yVideo }}
        className="absolute inset-0 z-0"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          poster="/images/video-poster.jpg" // Fallback image
        >
          <source src={videoSrc} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2E]" />
        </video>
      </motion.div>

      {/* Overlay Layer */}
      <motion.div
        style={{ opacity: opacityOverlay }}
        className={`absolute inset-0 z-10 ${overlayStyles[overlay]}`}
      />

      {/* Content Layer */}
      <div className="relative z-20">
        {children}
      </div>

      {/* Gradient Bottom for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0F] to-transparent pointer-events-none z-10" />
    </div>
  );
}