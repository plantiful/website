"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";

interface StickyGrowingPotProps {
  scrollProgress: number; // 0 to 1
  className?: string;
}

export function StickyGrowingPot({
  scrollProgress,
  className,
}: StickyGrowingPotProps) {
  const prefersReducedMotion = useReducedMotion();

  // Calculate flower scale based on scroll progress
  const flowerScale = useMemo(() => {
    // Clamp between 0 and 1
    const clamped = Math.max(0, Math.min(1, scrollProgress));
    return clamped;
  }, [scrollProgress]);

  return (
    <div className={className}>
      <div className="relative w-full h-full">
        {/* Pot base - static */}
        <img
          src="/timeline/pot_0.svg"
          alt="Pot"
          className="absolute inset-0 w-full h-full select-none"
          draggable={false}
          loading="eager"
          decoding="async"
        />

        {/* Flower - animated scale, anchored at bottom center */}
        <motion.div
          className="absolute left-1/2 bottom-[84%] w-[120%] h-[120%] -translate-x-1/2"
          style={{
            transformOrigin: "bottom center",
          }}
          animate={{
            scale: flowerScale,
            opacity: flowerScale > 0 ? 1 : 0,
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  scale: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] },
                  opacity: { duration: 0.2 },
                }
          }
        >
          <img
            src="/timeline/flower.svg"
            alt="Growing flower"
            className="w-full h-full select-none"
            draggable={false}
            loading="eager"
            decoding="async"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default StickyGrowingPot;
