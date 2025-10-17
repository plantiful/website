"use client";

import { useEffect } from "react";
import Lenis from "lenis";

type WindowWithLenis = Window & { lenis?: Lenis };

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    if (typeof window !== "undefined") {
      (window as WindowWithLenis).lenis = lenis;
    }

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      if (typeof window !== "undefined") {
        const win = window as WindowWithLenis;
        if (win.lenis === lenis) {
          delete win.lenis;
        }
      }
      lenis.destroy();
    };
  }, []);

  return null;
}
