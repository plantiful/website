"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type SignatureConfig = {
  id: string;
  label: string;
  src: string;
  delay?: number;
};

const signatures: SignatureConfig[] = [
  {
    id: "robin-jarusek",
    label: "Robin Jarůšek",
    src: "/jarusek.svg",
    delay: 0,
  },
  {
    id: "karol-raffay",
    label: "Karol Raffay",
    src: "/raffay.svg",
    delay: 0.25,
  },
  {
    id: "valon-mavriqi",
    label: "Valon Mavriqi",
    src: "/mavriqi.svg",
    delay: 0.5,
  },
  {
    id: "jan-trunecek",
    label: "Jan Truneček",
    src: "/trunecek.svg",
    delay: 0.75,
  },
];

type AnimatedSignatureProps = SignatureConfig & {
  className?: string;
};

export function TeamSignatures({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto w-full", className)}>
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mx-auto max-w-[860px]">
        {signatures.map((signature) => (
          <AnimatedSignature key={signature.id} {...signature} />
        ))}
      </div>
    </div>
  );
}

function AnimatedSignature({
  src,
  label,
  delay = 0,
  className,
}: AnimatedSignatureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load signature: ${src}`);
        }

        return response.text();
      })
      .then((markup) => {
        if (isMounted) {
          setSvgMarkup(markup);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSvgMarkup(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [src]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgMarkup || !svgContainerRef.current) {
      return;
    }

    const svgElement = svgContainerRef.current.querySelector("svg");
    if (!svgElement) {
      return;
    }

    svgElement.removeAttribute("width");
    svgElement.removeAttribute("height");
    svgElement.setAttribute(
      "class",
      "h-24 w-auto max-w-full text-neutral-900 dark:text-neutral-50",
    );
    svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

    const pathElements = Array.from(svgElement.querySelectorAll("path"));
    if (pathElements.length === 0) {
      return;
    }

    pathElements.forEach((path) => {
      path.removeAttribute("style");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "currentColor");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      path.setAttribute("vector-effect", "non-scaling-stroke");
    });

    const viewBox = svgElement.getAttribute("viewBox");
    if (viewBox) {
      const parts = viewBox.split(/\s+/);
      const width = parseFloat(parts[2] ?? "0");
      if (!Number.isNaN(width)) {
        const strokeWidth = Math.min(6, Math.max(2, width / 260));
        pathElements.forEach((path) => {
          path.setAttribute("stroke-width", strokeWidth.toFixed(2));
        });
      }
    }

    if (!isVisible || hasAnimatedRef.current) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      pathElements.forEach((path) => {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
      });
      svgElement.style.opacity = "1";
      hasAnimatedRef.current = true;
      return;
    }

    const segmentLengths = pathElements.map((path) => {
      try {
        return Math.max(path.getTotalLength(), 0);
      } catch {
        return 0;
      }
    });

    const totalLength = segmentLengths.reduce((acc, len) => acc + len, 0);
    if (totalLength === 0) {
      svgElement.style.opacity = "1";
      hasAnimatedRef.current = true;
      return;
    }

    const baseDurationMs = 5.5 * 1000;
    const isMultiSegment = pathElements.length > 1;
    const weightExponent = isMultiSegment ? 0.62 : 0.85;
    const timeWeights = segmentLengths.map((length) =>
      Math.pow(Math.max(length, 0.001), weightExponent),
    );

    if (isMultiSegment && timeWeights.length > 0) {
      timeWeights[0] *= 0.1;
    }

    const totalWeight = timeWeights.reduce((acc, weight) => acc + weight, 0);
    const timeShares = timeWeights.map((weight) =>
      totalWeight === 0 ? 0 : weight / totalWeight,
    );
    const cumulativeTimeShares = timeShares.reduce<number[]>((acc, share, index) => {
      const previous = index === 0 ? 0 : acc[index - 1];
      acc.push(previous + share);
      return acc;
    }, []);
    if (cumulativeTimeShares.length > 0) {
      cumulativeTimeShares[cumulativeTimeShares.length - 1] = 1;
    }

    pathElements.forEach((path, index) => {
      const length = segmentLengths[index];
      path.style.transition = "none";
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.willChange = "stroke-dashoffset";
    });

    let startTime: number | null = null;
    let animationFrameId: number | null = null;

    const animate = (now: number) => {
      if (startTime === null) {
        startTime = now;
      }

      const elapsed = now - startTime;
      const effectiveElapsed = elapsed - delay * 1000;

      if (effectiveElapsed < 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(effectiveElapsed / baseDurationMs, 1);
      const easedProgress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const easedTime = Math.min(Math.max(easedProgress, 0), 1);

      let activeIndex = pathElements.length - 1;
      for (let i = 0; i < cumulativeTimeShares.length; i += 1) {
        if (easedTime <= cumulativeTimeShares[i]) {
          activeIndex = i;
          break;
        }
      }

      pathElements.forEach((path, index) => {
        const segmentLength = segmentLengths[index];
        if (segmentLength <= 0) {
          path.style.strokeDashoffset = "0";
          return;
        }

        if (index < activeIndex) {
          path.style.strokeDashoffset = "0";
          return;
        }

        if (index > activeIndex) {
          path.style.strokeDashoffset = `${segmentLength}`;
          return;
        }

        const previousShare = index === 0 ? 0 : cumulativeTimeShares[index - 1];
        const segmentShare = timeShares[index] || 1;
        const localTime =
          segmentShare === 0 ? 1 : (easedTime - previousShare) / segmentShare;
        const clampedLocal = Math.min(Math.max(localTime, 0), 1);
        const drawnWithinSegment = segmentLength * clampedLocal;
        const offset = Math.max(segmentLength - drawnWithinSegment, 0);
        path.style.strokeDashoffset = `${offset}`;
      });

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      hasAnimatedRef.current = true;
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [svgMarkup, isVisible, delay]);

  return (
    <figure
      ref={containerRef}
      className={cn(
        "flex w-full max-w-[180px] flex-1 basis-[calc(50%-1rem)] md:basis-[calc(25%-1.5rem)] flex-col items-center gap-2 text-neutral-900 dark:text-neutral-50",
        className,
      )}
    >
      <div
        ref={svgContainerRef}
        className="w-full h-28 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        {svgMarkup ? (
          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: svgMarkup }} />
        ) : (
          <div className="h-20 w-full rounded-xl bg-neutral-200/60 dark:bg-neutral-700/40" />
        )}
      </div>
      <figcaption className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
        {label}
      </figcaption>
    </figure>
  );
}
