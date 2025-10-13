"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const STAGE_COUNT = 6;
const STAGE_SOURCES = Array.from(
  { length: STAGE_COUNT },
  (_, index) => `/timeline/pot_${index}.svg`
);

interface GrowingPotProps {
  className?: string;
  targetRef?: React.RefObject<HTMLElement | null>;
  persistOnVisit?: boolean;
  activeGlow?: boolean;
}

const clampStage = (value: number) =>
  Math.max(0, Math.min(STAGE_COUNT - 1, Math.floor(value + 0.0001)));

export function GrowingPot({
  className,
  targetRef,
  persistOnVisit = true,
  activeGlow = true,
}: GrowingPotProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = targetRef ?? containerRef;

  const [stage, setStage] = useState(0);
  const [maxStage, setMaxStage] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const stageRef = useRef(0);
  const maxStageRef = useRef(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    maxStageRef.current = maxStage;
  }, [maxStage]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setStage(STAGE_COUNT - 1);
      setMaxStage(STAGE_COUNT - 1);
      return;
    }

    let animationFrameId: number;

    const updateProgress = () => {
      const target = scrollTargetRef.current;

      if (!target) {
        animationFrameId = requestAnimationFrame(updateProgress);
        return;
      }

      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Offset: ["start 75%", "end 30%"] means:
      // - Animation starts when element START (top) is at 75% of viewport
      // - Animation ends when element END (bottom) is at 30% of viewport

      const elementTop = rect.top;
      const elementHeight = rect.height;

      // When element.top = 75vh, progress = 0
      // When element.bottom = 30vh (i.e., element.top = 30vh - height), progress = 1

      const startPos = viewportHeight * 0.75;
      const endPos = viewportHeight * 0.3 - elementHeight;

      // Total distance element.top travels from start to end
      const totalDistance = startPos - endPos;
      // How far element.top has traveled from start position
      const traveled = startPos - elementTop;

      // Calculate progress (0 to 1)
      let progress = traveled / totalDistance;
      progress = Math.max(0, Math.min(1, progress));

      // Convert to stage
      const nextStage = clampStage(progress * (STAGE_COUNT - 1));

      if (nextStage !== stageRef.current) {
        setStage(nextStage);
      }

      if (persistOnVisit && nextStage > maxStageRef.current) {
        setMaxStage(nextStage);
      }

      // Continue the animation loop
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    // Start the animation loop
    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [persistOnVisit, scrollTargetRef]);

  const displayStage = useMemo(() => {
    if (!isClient) {
      return 0;
    }
    if (prefersReducedMotion) {
      return STAGE_COUNT - 1;
    }
    return persistOnVisit ? Math.max(stage, maxStage) : stage;
  }, [isClient, prefersReducedMotion, persistOnVisit, stage, maxStage]);

  return (
    <div ref={containerRef} className={className}>
      <AnimatePresence mode="wait">
        <motion.img
          key={displayStage}
          src={STAGE_SOURCES[displayStage]}
          alt="Milestone growth"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          className="h-full w-full select-none"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </AnimatePresence>
      {activeGlow &&
        displayStage === STAGE_COUNT - 1 &&
        !prefersReducedMotion &&
        isClient && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ filter: "blur(6px)" }}
            animate={{ boxShadow: "0 0 24px rgba(16,185,129,0.25)" }}
          />
        )}
    </div>
  );
}

export default GrowingPot;
