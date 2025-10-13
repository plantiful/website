"use client";
import { motion, useMotionValue } from "motion/react";
import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import StickyGrowingPot from "@/components/ui/StickyGrowingPot";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  headerTitle?: string;
}

export const Timeline = ({ data, headerTitle }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [potProgress, setPotProgress] = useState(0);
  const [potOffset, setPotOffset] = useState(0);

  const heightTransform = useMotionValue(0);
  const opacityTransform = useMotionValue(0);
  const rowRefs = useMemo(() => {
    return data.map(() => createRef<HTMLDivElement>());
  }, [data]);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  useEffect(() => {
    if (height === 0) return;

    let animationFrameId: number;

    const updateProgress = () => {
      const container = containerRef.current;
      const timelineContent = ref.current;
      if (!container || !timelineContent) {
        animationFrameId = requestAnimationFrame(updateProgress);
        return;
      }

      const rect = container.getBoundingClientRect();
      const contentRect = timelineContent.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const contentTop = contentRect.top;
      const contentHeight = contentRect.height;
      const stickyTop = viewportHeight * 0.4; // top-40

      // Timeline line progress
      // Should sync with when milestones become sticky (top-40)
      // Start when content (first milestone) reaches top-40 (40vh)
      const lineStartPos = stickyTop;
      const lineEndPos = stickyTop - contentHeight;

      const lineTotalDistance = lineStartPos - lineEndPos;
      const lineTraveled = lineStartPos - contentTop;

      let progress = lineTraveled / lineTotalDistance;
      progress = Math.max(0, Math.min(1, progress));

      // Update motion values for timeline line
      heightTransform.set(progress * height);
      opacityTransform.set(Math.min(progress * 10, 1));

      // Calculate pot progress based on milestones
      // We want the pot to grow from stage 0 to 5 across all milestones
      // First milestone at top-40 should start growth, last milestone should complete it

      // Start growing when first milestone reaches sticky position
      // Complete growing when last milestone reaches sticky position
      const potStartPos = contentTop - stickyTop;
      const potEndPos = contentTop + contentHeight - stickyTop;

      const potTotalDistance = potEndPos - potStartPos;
      const potTraveled = -potStartPos;

      let potProgressValue = potTraveled / potTotalDistance;
      potProgressValue = Math.max(0, Math.min(1, potProgressValue));

      setPotProgress(potProgressValue);

      // Continue the animation loop
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    // Start the animation loop
    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [height, heightTransform, opacityTransform, rowRefs]);

  useEffect(() => {
    if (!ref.current) return;

    const updateOffset = () => {
      const containerEl = ref.current;
      const firstRow = rowRefs[0]?.current;
      if (!containerEl || !firstRow) return;

      const containerTop = containerEl.getBoundingClientRect().top;
      const firstTop = firstRow.getBoundingClientRect().top;
      setPotOffset(Math.max(0, firstTop - containerTop));
    };

    updateOffset();
    window.addEventListener("resize", updateOffset, { passive: true });

    return () => {
      window.removeEventListener("resize", updateOffset);
    };
  }, [rowRefs]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-[1600px] mx-auto flex flex-col items-center text-center py-20 px-6 sm:px-10 md:px-16 lg:px-24">
        {headerTitle && (
          <>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-[-0.01em] text-neutral-900 dark:text-white max-w-4xl">
              {headerTitle}
            </h2>
            <div className="mt-3 h-1.5 w-24 bg-emerald-800 rounded" />
          </>
        )}
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {/* Single sticky growing pot */}
        <div
          className="sticky left-8 -translate-x-1/2 top-40 w-16 h-16 md:w-20 md:h-20 z-30 pointer-events-none"
          style={{ marginTop: potOffset }}
        >
          <StickyGrowingPot
            scrollProgress={potProgress}
            className="w-full h-full"
          />
        </div>

        {data.map((item, index) => {
          const rowRef = rowRefs[index];
          const isFirst = index === 0;

          return (
            <div
              key={index}
              ref={rowRef}
              className={`relative flex justify-start ${
                isFirst ? "pt-2 md:pt-4" : "pt-10 md:pt-40"
              } md:gap-10`}
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                  {item.title}
                </h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                  {item.title}
                </h3>
                {item.content}{" "}
              </div>
            </div>
          );
        })}
        <div
          style={{
            height: height + "px",
            marginTop: potOffset,
          }}
          className="absolute md:left-3 left-3 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-emerald-200 dark:via-emerald-800 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-emerald-700 via-emerald-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
