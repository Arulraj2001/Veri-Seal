'use client';

import * as React from 'react';
import { motion, useInView } from 'framer-motion';

function useCounter(target: number, duration: number = 1800, shouldStart: boolean = false) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!shouldStart || target <= 0) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quartic
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, shouldStart]);

  return count;
}

export function StatsBar() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [totalPdfs, setTotalPdfs] = React.useState<number>(421848);

  React.useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => {
        if (data.verification_counter) {
          const parsed = parseInt(data.verification_counter, 10);
          if (!isNaN(parsed) && parsed > 0) setTotalPdfs(parsed);
        } else if (data.count && typeof data.count === 'number') {
          setTotalPdfs(data.count);
        }
      })
      .catch(() => {});
  }, []);

  const animatedPdfs = useCounter(totalPdfs, 2000, isInView);
  const animatedTools = useCounter(57, 1400, isInView);
  const animatedStates = useCounter(6, 1200, isInView);

  return (
    <section className="relative z-10 -mt-6 sm:-mt-8 mb-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="rounded-2xl sm:rounded-3xl shadow-sm border border-stone-200/90 overflow-hidden"
        style={{ backgroundColor: '#F1EFEE', color: '#2E241F' }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-300/80">
          {/* Stat 1: PDFs Verified */}
          <div className="p-5 sm:p-7 flex flex-col items-center justify-center text-center">
            <span
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
              style={{ color: '#E6570B' }}
            >
              {animatedPdfs > 0 ? animatedPdfs.toLocaleString('en-IN') : '4,21,848'}
            </span>
            <span className="text-xs sm:text-sm font-bold mt-1 tracking-wide" style={{ color: '#2E241F' }}>
              PDFs Verified
            </span>
          </div>

          {/* Stat 2: Tools Available */}
          <div className="p-5 sm:p-7 flex flex-col items-center justify-center text-center">
            <span
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
              style={{ color: '#E6570B' }}
            >
              {animatedTools > 0 ? animatedTools : 57}
            </span>
            <span className="text-xs sm:text-sm font-bold mt-1 tracking-wide" style={{ color: '#2E241F' }}>
              Free Tools
            </span>
          </div>

          {/* Stat 3: States Covered */}
          <div className="p-5 sm:p-7 flex flex-col items-center justify-center text-center">
            <span
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
              style={{ color: '#E6570B' }}
            >
              {animatedStates > 0 ? animatedStates : 6}
            </span>
            <span className="text-xs sm:text-sm font-bold mt-1 tracking-wide" style={{ color: '#2E241F' }}>
              States Covered
            </span>
          </div>

          {/* Stat 4: Always Free */}
          <div className="p-5 sm:p-7 flex flex-col items-center justify-center text-center">
            <span
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
              style={{ color: '#E6570B' }}
            >
              ₹0
            </span>
            <span className="text-xs sm:text-sm font-bold mt-1 tracking-wide" style={{ color: '#2E241F' }}>
              Always Free
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
