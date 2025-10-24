import { TimelineMilestoneContent } from "@/components/ui/timeline-milestone-content";

type TranslationFunction = ((key: string) => string) & {
  raw?: <T = unknown>(key: string) => T;
};

type LinkConfig = {
  label: string;
  description?: string;
  href: string;
  type?: "article" | "press" | "video" | "research" | "resource";
};

const imageSizes =
  "(min-width: 1600px) 400px, (min-width: 1280px) 360px, (min-width: 1024px) 45vw, (min-width: 768px) 48vw, 90vw";

const toParagraphs = (text: string) =>
  text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const getLinks = (t: TranslationFunction, key: string): LinkConfig[] => {
  const rawLinks = t.raw?.(key);
  if (!rawLinks || !Array.isArray(rawLinks)) {
    return [];
  }

  return rawLinks as LinkConfig[];
};

const getHighlights = (t: TranslationFunction, key: string): string[] => {
  const rawHighlights = t.raw?.(key);
  if (!rawHighlights || !Array.isArray(rawHighlights)) {
    return [];
  }

  return rawHighlights as string[];
};

export const getTimelineData = (t: TranslationFunction) => [
  {
    title: t("timeline.foreword.title"),
    content: (
      <TimelineMilestoneContent
        descriptions={toParagraphs(t("timeline.foreword.description"))}
        highlights={getHighlights(t, "timeline.foreword.highlights")}
        media={[
          {
            src: "/timeline/summercamp.jpg",
            alt: t("timeline.gallery.summercamp"),
            fill: true,
            sizes: imageSizes,
            priority: true,
          },
          {
            src: "/timeline/redhat.JPG",
            alt: t("timeline.gallery.summercamp_stage"),
            fill: true,
            sizes: imageSizes,
          },
        ]}
        links={getLinks(t, "timeline.foreword.links")}
        mediaColumns={2}
      />
    ),
  },
  {
    title: t("timeline.kyndryl_challenge.title"),
    content: (
      <TimelineMilestoneContent
        descriptions={toParagraphs(t("timeline.kyndryl_challenge.description"))}
        highlights={getHighlights(t, "timeline.kyndryl_challenge.highlights")}
        media={[
          {
            src: "/timeline/kyndryl_challenge.jpg",
            alt: t("timeline.gallery.kyndryl_challenge_stage"),
            fill: true,
            sizes: imageSizes,
          },
          {
            src: "/timeline/kyndryl_challenge_2.jpg",
            alt: t("timeline.gallery.kyndryl_challenge_pitch"),
            fill: true,
            sizes: imageSizes,
          },
        ]}
        links={getLinks(t, "timeline.kyndryl_challenge.links")}
        mediaColumns={2}
      />
    ),
  },
  {
    title: t("timeline.kyndryl.title"),
    content: (
      <TimelineMilestoneContent
        descriptions={toParagraphs(t("timeline.kyndryl.description"))}
        highlights={getHighlights(t, "timeline.kyndryl.highlights")}
        media={[
          {
            src: "/timeline/phones.png",
            alt: t("timeline.gallery.kyndryl_product"),
            fill: true,
            sizes: imageSizes,
          },
          {
            src: "/timeline/kyndryl_intern.JPG",
            alt: t("timeline.gallery.kyndryl_intern"),
            fill: true,
            sizes: imageSizes,
          },
        ]}
        links={getLinks(t, "timeline.kyndryl.links")}
        mediaColumns={2}
      />
    ),
  },
  {
    title: t("timeline.ja_expo.title"),
    content: (
      <TimelineMilestoneContent
        descriptions={toParagraphs(t("timeline.ja_expo.description"))}
        highlights={getHighlights(t, "timeline.ja_expo.highlights")}
        media={[
          {
            src: "/timeline/JA_stanek.JPG",
            alt: t("timeline.gallery.ja_expo_booth"),
            fill: true,
            sizes: imageSizes,
          },
          {
            src: "/timeline/team.png",
            alt: t("timeline.gallery.ja_expo_team"),
            fill: true,
            sizes: imageSizes,
          },
        ]}
        links={getLinks(t, "timeline.ja_expo.links")}
        mediaColumns={2}
      />
    ),
  },
  {
    title: t("timeline.fekt_eeict.title"),
    content: (
      <TimelineMilestoneContent
        descriptions={toParagraphs(t("timeline.fekt_eeict.description"))}
        highlights={getHighlights(t, "timeline.fekt_eeict.highlights")}
        media={[
          {
            src: "/timeline/fekt.jpg",
            alt: t("timeline.gallery.fekt_stage"),
            fill: true,
            sizes: imageSizes,
          },
          {
            src: "/timeline/fekt_award.jpg",
            alt: t("timeline.gallery.fekt_award"),
            fill: true,
            sizes: imageSizes,
          },
        ]}
        links={getLinks(t, "timeline.fekt_eeict.links")}
        mediaColumns={2}
      />
    ),
  },
  {
    title: t("timeline.release.title"),
    content: (
      <TimelineMilestoneContent
        descriptions={toParagraphs(t("timeline.release.description"))}
        highlights={getHighlights(t, "timeline.release.highlights")}
        media={[
          {
            src: "https://assets.aceternity.com/templates/startup-1.webp",
            alt: t("timeline.gallery.release_preview"),
            fill: true,
            sizes: imageSizes,
          },
        ]}
        links={getLinks(t, "timeline.release.links")}
        mediaColumns={1}
      />
    ),
  },
];
