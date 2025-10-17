"use client";

import { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface TimelineLightboxImageProps
  extends Omit<ImageProps, "src" | "className" | "onLoad"> {
  src: ImageProps["src"];
  className?: string;
  imageClassName?: string;
  overlayLabel?: string;
  onLoad?: ImageProps["onLoad"];
}

export function TimelineLightboxImage({
  src,
  alt,
  className,
  imageClassName,
  overlayLabel = "Expand image",
  onLoad,
  ...imageProps
}: TimelineLightboxImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const resolvedSrc = typeof src === "string" ? src : src.src;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "group relative block cursor-zoom-in overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 dark:focus-visible:ring-offset-neutral-100",
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          {...imageProps}
          className={cn(
            "object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]",
            imageClassName,
          )}
          onLoad={onLoad}
        />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-black/0 transition-opacity duration-200 ease-out group-hover:bg-black/10" />
        <span className="sr-only">{overlayLabel}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-md"
            role="dialog"
            aria-label={alt}
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              onClick={(event) => event.stopPropagation()}
              className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
            >
              <button
                type="button"
                aria-label="Close expanded image"
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 rounded-full bg-neutral-900/60 p-2 text-white backdrop-blur-md transition hover:bg-neutral-900/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900/50 dark:bg-neutral-100/60 dark:text-neutral-900 dark:hover:bg-neutral-100/80"
              >
                <XIcon className="size-5" />
              </button>
              <img
                src={resolvedSrc}
                alt={alt}
                className="max-h-[90vh] max-w-[90vw] rounded-3xl object-contain"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
