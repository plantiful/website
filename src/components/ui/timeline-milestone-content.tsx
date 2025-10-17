"use client";

import {
  ArrowUpRight,
  BookMarked,
  CheckCircle2,
  Clapperboard,
  FlaskConical,
  Link2,
  Newspaper,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { TimelineLightboxImage, type TimelineLightboxImageProps } from "@/components/ui/timeline-lightbox-image";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MilestoneLinkType = "article" | "press" | "video" | "research" | "resource";

interface MilestoneLink {
  label: string;
  href: string;
  description?: string;
  type?: MilestoneLinkType;
}

interface TimelineMilestoneContentProps {
  descriptions: string[];
  highlights?: string[];
  media?: TimelineLightboxImageProps[];
  mediaColumns?: 1 | 2 | 3;
  links?: MilestoneLink[];
  children?: ReactNode;
}

const linkIconMap: Record<MilestoneLinkType, LucideIcon> = {
  article: FileText,
  press: Newspaper,
  video: Clapperboard,
  research: FlaskConical,
  resource: BookMarked,
};

function getLinkIcon(type?: MilestoneLinkType) {
  if (!type) {
    return Link2;
  }

  return linkIconMap[type] ?? Link2;
}

export function TimelineMilestoneContent({
  descriptions,
  highlights,
  media,
  mediaColumns,
  links,
  children,
}: TimelineMilestoneContentProps) {
  const safeLinks = (links ?? []).filter((link) => link.href);
  const safeMedia = media ?? [];
  const resolvedColumns = mediaColumns ?? Math.min(Math.max(safeMedia.length, 1), 3);

  const mediaGridClass =
    resolvedColumns === 1
      ? "grid-cols-1"
      : resolvedColumns === 2
      ? "sm:grid-cols-2"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-5">
        {descriptions.map((paragraph, index) => (
          <p
            key={index}
            className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {highlights && highlights.length > 0 && (
        <ul className="space-y-3">
          {highlights.map((highlight, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm font-medium text-neutral-700 dark:text-neutral-200 md:text-base"
            >
              <span className="mt-0.5 text-emerald-600 dark:text-emerald-300">
                <CheckCircle2 className="size-4" />
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      {safeMedia.length > 0 && (
        <div className={cn("mt-6 grid gap-4", mediaGridClass)}>
          {safeMedia.map((item, index) => (
            <TimelineLightboxImage
              key={`${item.alt ?? "media"}-${index}`}
              {...item}
              className={cn(
                "relative h-40 w-full overflow-hidden rounded-[24px] md:h-52 lg:h-64",
                item.className,
              )}
              imageClassName={cn(
                "object-cover transition-transform duration-200 ease-out",
                item.imageClassName,
              )}
            />
          ))}
        </div>
      )}

      {safeLinks.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {safeLinks.map((link) => {
            const Icon = getLinkIcon(link.type);

            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-full items-start gap-3 rounded-2xl p-2 text-left transition hover:-translate-y-0.5 hover:text-emerald-700 dark:hover:text-emerald-200"
              >
                <span className="mt-0.5 flex size-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-200">
                  <Icon className="size-4" />
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-neutral-900 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-200">
                    {link.label}
                  </p>
                  {link.description && (
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                      {link.description}
                    </p>
                  )}
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-neutral-400 transition group-hover:text-emerald-600 dark:text-neutral-500 dark:group-hover:text-emerald-200" />
              </a>
            );
          })}
        </div>
      )}

      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
