"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useState,
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Timeline } from "@/components/ui/timeline";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { TeamSignatures } from "@/components/TeamSignatures";
import { getTimelineData } from "@/data/timelineData";
import { cn } from "@/lib/utils";
import type Lenis from "lenis";

type BackgroundArtifactProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
};

type LenisWindow = Window & { lenis?: Lenis };

function BackgroundArtifact({
  src,
  alt,
  width,
  height,
  className,
  style,
  priority = false,
}: BackgroundArtifactProps) {
  return (
    <div
      className={cn(
        "pointer-events-none select-none absolute will-change-transform",
        className,
      )}
      style={style}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
      />
    </div>
  );
}

type ArtifactLayerProps = {
  maxWidth: number | string;
  children: ReactNode;
  outerClassName?: string;
  innerClassName?: string;
};

function ArtifactLayer({
  maxWidth,
  children,
  outerClassName,
  innerClassName,
}: ArtifactLayerProps) {
  const resolvedMaxWidth =
    typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        outerClassName,
      )}
    >
      <div
        className={cn("relative mx-auto h-full w-full", innerClassName)}
        style={{ maxWidth: resolvedMaxWidth }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const t = useTranslations();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const introTitle = t("intro.title");
  const introTitleAccent = t("intro.title_accent");
  const teamMessageTitle = t("teamMessage.title");
  const handleJourneyClick = useCallback<MouseEventHandler<HTMLAnchorElement>>((event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const targetSelector = "#journey";
    const lenis = (window as LenisWindow).lenis;

    if (!lenis) {
      return;
    }

    event.preventDefault();
    lenis.scrollTo(targetSelector, {
      duration: 1.1,
      lock: true,
      onComplete: () => {
        window.history.replaceState(null, "", targetSelector);
      },
    });
  }, []);
  const CTAButtons = (
    <>
      <a
        href="https://github.com/plantiful/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-1 items-center justify-center gap-3 px-4 py-2.5 text-sm md:flex-none md:px-6 md:py-3 md:text-base bg-black hover:bg-neutral-900 text-white font-semibold rounded-lg transition-colors shadow-lg"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
        {t("hero.github_button")}
      </a>

      <a
        href="#journey"
        onClick={handleJourneyClick}
        className="inline-flex flex-1 items-center justify-center gap-3 px-4 py-2.5 text-sm md:flex-none md:px-6 md:py-3 md:text-base bg-white text-[#184D44] font-semibold rounded-lg transition-colors shadow-lg border border-[#184D44]/15 hover:bg-white/90 hover:text-[#0f352d]"
      >
        {t("hero.journey_button")}
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </a>
    </>
  );

  const appAccessTitle = t("appAccess.title");
  const appAccessInfoTitle = t("appAccess.info_title");
  const appAccessInfoDescription = t("appAccess.info_description");
  const appRepoUrl = "https://github.com/plantiful/app";
  const contactEmail = "info@plantiful.cz";
  const contactMailto = `mailto:${contactEmail}?subject=Plantiful%20demo%20request`;
  const appAccessButtons = {
    github: t("appAccess.buttons.github"),
    contact: t("appAccess.buttons.contact"),
  };
  const introSteps = [
    {
      index: "1",
      shortTitle: t("appAccess.steps.scan.short_title"),
      title: t("appAccess.steps.scan.title"),
      description: t("appAccess.steps.scan.description"),
    },
    {
      index: "2",
      shortTitle: t("appAccess.steps.organize.short_title"),
      title: t("appAccess.steps.organize.title"),
      description: t("appAccess.steps.organize.description"),
    },
    {
      index: "3",
      shortTitle: t("appAccess.steps.care.short_title"),
      title: t("appAccess.steps.care.title"),
      description: t("appAccess.steps.care.description"),
    },
  ];
  const mobileStepLabels = [
    t("appAccess.steps.scan.mobile_label"),
    t("appAccess.steps.organize.mobile_label"),
    t("appAccess.steps.care.mobile_label"),
  ];
  const appGalleryAlt = t("appAccess.gallery.primary_alt");

  return (
    <main className="relative w-full bg-white">
      {/* Hero section with background image only here */}
      <section className="relative z-20 min-h-screen overflow-hidden">
        {/* Background image */}
        <Image
          src="/bg.png"
          alt={t("hero.background_alt")}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Left-to-right emerald overlay, matching the reference tint */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(6, 78, 59, 0.78) 0%, rgba(6, 78, 59, 0.68) 40%, rgba(6, 78, 59, 0.5) 70%, rgba(6, 78, 59, 0.2) 100%)",
          }}
        />

        {/* Header */}
        <header
          className={`absolute inset-x-0 top-0 z-40 transition-all duration-300 ${
            isVideoOpen ? "blur-sm" : ""
          }`}
        >
          <div className="mx-auto w-full max-w-[1600px] flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 py-6 sm:py-10">
            <Image
              src="/Plantiful.svg"
              alt={t("header.logo_alt")}
              width={140}
              height={32}
              priority
            />
            <LanguageSwitcher />
          </div>
        </header>

        {/* Hero copy */}
        <div className="relative z-10 flex min-h-screen items-center">
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-start gap-8 px-6 sm:px-10 md:grid-cols-[1fr_auto] md:items-center md:px-16 lg:px-24">
            <div className="order-1 mx-auto w-full max-w-none text-center md:order-1 md:mx-0 md:max-w-[820px] md:text-left">
              <h1 className="text-white font-bold leading-[1.05] text-4xl md:text-5xl lg:text-6xl">
                {t("hero.title")
                  .split("\n")
                  .map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < t("hero.title").split("\n").length - 1 && <br />}
                    </span>
                  ))}
              </h1>
              <p className="mt-6 text-white/95 text-xl md:text-2xl">
                {t("hero.subtitle")
                  .split("\n")
                  .map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < t("hero.subtitle").split("\n").length - 1 && <br />}
                    </span>
                  ))}
              </p>

              <div className="mt-8 hidden flex-wrap gap-4 md:flex">{CTAButtons}</div>
            </div>
            <div className="order-2 flex w-full justify-center md:order-2 md:justify-end">
              <HeroVideoDialog
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/zZ-SUUvdznc?autoplay=1&rel=0"
                thumbnailSrc="https://img.youtube.com/vi/zZ-SUUvdznc/maxresdefault.jpg"
                thumbnailAlt={t("hero.video_alt")}
                className="w-full max-w-[360px] sm:max-w-[480px] md:max-w-[600px] lg:max-w-[720px]"
                isOpen={isVideoOpen}
                onOpenChange={setIsVideoOpen}
              />
            </div>
            <div className="order-3 mt-4 flex w-full flex-nowrap items-center justify-center gap-3 md:hidden">
              {CTAButtons}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction section */}
      <section className="relative z-10 w-full bg-white min-h-screen flex items-center overflow-x-hidden">
        <ArtifactLayer maxWidth="1600px">
          <BackgroundArtifact
            src="/big_bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={1024}
            height={1024}
            className="rotate-90 opacity-100 left-0 top-[-10rem] -translate-x-[35%] sm:top-[16rem] sm:-translate-x-[50%] md:top-[-10rem] md:-translate-x-[52%] lg:top-[-22rem] lg:-translate-x-[55%]"
            style={{
              width: "min(calc(100% * 0.7), 42rem)",
            }}
          />
          <BackgroundArtifact
            src="/big_bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={1024}
            height={1024}
            className="opacity-100 right-0 top-[35rem] translate-x-[50%] sm:top-[12rem] sm:translate-x-[45%] md:top-[14rem] md:translate-x-[48%] lg:top-[16rem] lg:translate-x-[60%]"
            style={{
              width: "min(calc(100% * 0.6), 38rem)",
            }}
          />
          <BackgroundArtifact
            src="/bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={352}
            height={194}
            className="opacity-100 left-0 top-[-2rem] -translate-x-[60%] sm:-translate-x-[55%] md:top-[-4rem] md:-translate-x-[52%]"
            style={{
              width: "min(calc(100% * 0.32), 18rem)",
            }}
          />
        </ArtifactLayer>

        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center justify-center gap-0 md:gap-2 py-24 px-6 sm:px-10 md:px-16 lg:px-24 md:pl-24 lg:pl-54 md:grid-cols-[auto_auto]">
          <div className="max-w-[540px] md:pr-0 lg:pr-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-[-0.01em] text-neutral-900">
              {introTitleAccent && introTitle.includes(introTitleAccent)
                ? (
                  <>
                    {introTitle.slice(0, introTitle.indexOf(introTitleAccent))}
                    <span className="text-emerald-800">{introTitleAccent}</span>
                    {introTitle.slice(
                      introTitle.indexOf(introTitleAccent) + introTitleAccent.length,
                    )}
                  </>
                )
                : introTitle}
            </h2>
            <p className="mt-6 text-lg md:text-xl text-neutral-700">
              {t("intro.subtitle")}
            </p>
          </div>
          <div className="relative flex justify-center md:justify-end md:-ml-24 lg:-ml-34">
            {/* Phone showcase */}
            <Image
              src="/PhoneShowcase.png"
              alt={t("intro.phones_alt")}
              width={1600}
              height={1200}
              className="w-full max-w-[620px] sm:max-w-[820px] md:max-w-[920px] lg:max-w-[1000px] h-auto drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* App access section */}
      <section className="relative z-10 w-full bg-white overflow-hidden py-24">
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-[-0.01em] text-neutral-900 dark:text-white max-w-4xl">
              {appAccessTitle}
            </h2>
            <div className="mt-3 h-1.5 w-24 bg-emerald-800 rounded" />
          </div>

          <div className="mt-16 md:hidden">
            <div className="flex w-full items-center justify-center gap-4">
              <div className="relative flex w-[128px] shrink-0 h-[360px] flex-col items-center justify-between px-6">
                <div className="pointer-events-none absolute left-1/2 inset-y-2 w-[8px] -translate-x-1/2 bg-emerald-500/30 z-0" />
                {introSteps.map((step, index) => (
                  <div key={step.index} className="relative flex justify-center">
                    <div className="relative z-10 flex h-[4.25rem] w-[4.25rem] items-center justify-center overflow-hidden rounded-full bg-emerald-600 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_20px_38px_rgba(12,83,56,0.28)]">
                      <span>{mobileStepLabels[index] ?? step.shortTitle}</span>
                      <div className="pointer-events-none absolute -bottom-7 left-1/2 h-10 w-10 -translate-x-1/2 rotate-45 rounded-[8px] bg-emerald-400/35" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex min-w-[200px] flex-1 justify-center">
                <div className="overflow-hidden rounded-none border-0 bg-transparent shadow-none w-full max-w-[320px] md:rounded-[2.5rem] md:border md:border-neutral-200 md:bg-white md:shadow-[0_25px_60px_rgba(15,23,42,0.12)]">
                  <Image
                    src="/timeline/real_app.png"
                    alt={appGalleryAlt}
                    width={1000}
                    height={2092}
                    className="h-auto w-full"
                    sizes="(min-width: 640px) 320px, 75vw"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 hidden md:grid md:grid-cols-[minmax(0,_1fr)_minmax(0,_0.85fr)] md:items-center md:gap-x-8">
            <div className="w-full max-w-[640px]">
              <div className="relative mt-12">
                <div className="absolute left-7 top-[3.35rem] bottom-[3.35rem] w-[3px] bg-emerald-500/30" />
                <div className="flex flex-col gap-12">
                  {introSteps.map((step) => (
                    <div key={step.title} className="relative pl-16 pr-4">
                      <div className="absolute left-[0.3rem] top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center">
                        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-emerald-600 text-base font-semibold text-white shadow-[0_12px_25px_rgba(12,83,56,0.28)]">
                          <span>{step.index}</span>
                          <div className="pointer-events-none absolute -bottom-5 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 rounded-[6px] bg-emerald-400/35" />
                        </div>
                      </div>
                      <div className="rounded-[2rem] bg-white px-6 py-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)] ring-1 ring-emerald-600/10">
                        <h3 className="mt-3 text-xl font-semibold text-neutral-900">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-base text-neutral-700">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.12)] w-full max-w-[340px] lg:max-w-[360px]">
                <Image
                  src="/timeline/real_app.png"
                  alt={appGalleryAlt}
                  width={1000}
                  height={2092}
                  className="h-auto w-full"
                  sizes="(min-width: 1280px) 360px, (min-width: 768px) 320px, 320px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline section */}
      <section
        id="journey"
        className="relative z-10 w-full bg-white dark:bg-neutral-950"
      >
        {/* Timeline content */}
        <div className="relative">
          <Timeline
            data={getTimelineData(t)}
            headerTitle={t("timeline.title")}
          />
        </div>

        {/* background artifacts anchored to the timeline container */}
        <ArtifactLayer
          maxWidth="1600px"
          outerClassName="overflow-x-hidden"
          innerClassName="h-full"
        >
          <BackgroundArtifact
            key="bg-artifact-1"
            src="/big_bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={1024}
            height={1024}
            className="z-0 -translate-y-1/2 left-0 top-1/2 -translate-x-[60%] sm:-translate-x-[58%] md:-translate-x-[55%]"
            style={{
              width: "min(calc(100% * 0.75), 44rem)",
            }}
          />
          <BackgroundArtifact
            key="bg-artifact-2"
            src="/big_bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={1024}
            height={1024}
            className="z-0 right-0 rotate-30 top-[26rem] translate-x-[58%] sm:top-[28rem] sm:translate-x-[50%] md:top-[30rem] md:translate-x-[52%]"
            style={{
              width: "min(calc(100% * 0.68), 42rem)",
            }}
          />

          <BackgroundArtifact
            key="bg-artifact-3"
            src="/big_bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={1024}
            height={1024}
            className="z-0 rotate-180 right-0 bottom-[-4rem] translate-x-[52%] md:bottom-[-8rem] md:translate-x-[55%]"
            style={{
              width: "min(calc(100% * 0.7), 42rem)",
            }}
          />

          <BackgroundArtifact
            key="bg-artifact-4"
            src="/bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={352}
            height={194}
            className="z-0 right-0 top-[16rem] translate-x-[38%] md:translate-x-[42%] lg:translate-x-[46%]"
            style={{
              width: "min(calc(100% * 0.28), 18rem)",
            }}
          />
          <BackgroundArtifact
            key="bg-artifact-5"
            src="/bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={352}
            height={194}
            className="z-0 left-0 top-[24rem] -translate-x-[45%] md:-translate-x-[50%] lg:-translate-x-[52%]"
            style={{
              width: "min(calc(100% * 0.3), 18rem)",
            }}
          />
          <BackgroundArtifact
            key="bg-artifact-6"
            src="/bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={352}
            height={194}
            className="z-0 -translate-y-1/2 right-0 top-1/2 translate-x-[36%] sm:translate-x-[38%] md:translate-x-[42%] lg:translate-x-[46%]"
            style={{
              width: "min(calc(100% * 0.26), 16rem)",
            }}
          />
          <BackgroundArtifact
            key="bg-artifact-7"
            src="/bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={352}
            height={194}
            className="z-0 right-0 bottom-[2rem] translate-x-[34%] md:bottom-[3rem] md:translate-x-[38%] lg:bottom-[4rem] lg:translate-x-[42%]"
            style={{
              width: "min(calc(100% * 0.24), 15rem)",
            }}
          />
        </ArtifactLayer>
      </section>

      {/* Word from our Team section */}
      <section
        id="team-message"
        className="relative w-full bg-white overflow-hidden py-20"
      >
        {/* background accents */}
        <ArtifactLayer maxWidth="1400px">
          <BackgroundArtifact
            src="/big_bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={1024}
            height={1024}
            className="lg:rotate-30 md:rotate-30 rotate-60 opacity-100 left-0 top-[-4rem] -translate-x-[65%] sm:top-[-10rem] sm:-translate-x-[54%] lg:top-[-rem] lg:-translate-x-[70%]"
            style={{
              width: "min(calc(100% * 0.7), 44rem)",
            }}
          />
          <BackgroundArtifact
            src="/big_bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={1024}
            height={1024}
            className="opacity-100 right-0 rotate-70 sm:rotate-0 md:rotate-0 lg:rotate-0 bottom-[-4rem] translate-x-[50%] sm:bottom-[-3rem] sm:translate-x-[50%] lg:bottom-[-4rem] lg:translate-x-[70%]"
            style={{
              width: "min(calc(100% * 0.68), 42rem)",
            }}
          />
        </ArtifactLayer>

        <div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center gap-5 sm:gap-7 lg:gap-7 px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="text-center max-w-4xl flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-[-0.01em] text-neutral-900">
              {teamMessageTitle}
            </h2>
            <div className="mt-3 h-1.5 w-24 bg-emerald-800 rounded" />
          </div>

          <Image
            src="/timeline/team_phone.png"
            alt={t("teamMessage.image_alt")}
            width={1606}
            height={768}
            priority
            className="w-full max-w-[920px] h-auto drop-shadow-2xl"
            sizes="(min-width: 1600px) 920px, (min-width: 1024px) 75vw, 100vw"
          />

          <div className="max-w-[820px] text-center">
            {t("teamMessage.description")
              .split("\n\n")
              .map((paragraph, idx) => {
                const trimmedParagraph = paragraph.trim();
                const isClosingParagraph =
                  trimmedParagraph.startsWith("Thank you") ||
                  trimmedParagraph.startsWith("Děkujeme");

                return (
                  <p
                    key={idx}
                    className="text-lg md:text-xl text-neutral-700 mt-3 sm:mt-4 md:mt-5"
                  >
                    {isClosingParagraph ? (
                      <strong className="font-semibold text-neutral-800">
                        {trimmedParagraph}
                      </strong>
                    ) : (
                      trimmedParagraph
                    )}
                  </p>
                );
              })}
          </div>

        </div>
      </section>

      {/* Acknowledgements section */}
      <section
        id="acknowledgements"
        className="relative w-full bg-white overflow-hidden pt-16 pb-20"
      >
        {/* background accents */}
        <ArtifactLayer maxWidth="1400px">
          <BackgroundArtifact
            src="/big_bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={1024}
            height={1024}
            className="rotate-30 lg:rotate-0 opacity-100 left-0 top-[-6rem] -translate-x-[52%] sm:top-[-10rem] sm:-translate-x-[54%] lg:top-[15rem] lg:-translate-x-[73%]"
            style={{
              width: "min(calc(100% * 0.7), 44rem)",
            }}
          />
          <BackgroundArtifact
            src="/bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={352}
            height={194}
            className="opacity-100 right-0 bottom-[6rem] translate-x-[48%] sm:bottom-[-3rem] sm:translate-x-[50%] lg:bottom-[20rem] lg:translate-x-[90%]"
            style={{
              width: "min(calc(100% * 0.68), 42rem)",
            }}
          />

        </ArtifactLayer>

        <div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center gap-0 px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="text-center max-w-4xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-[-0.01em] text-neutral-900">
              {t("acks.title")}
            </h2>
            <div className="mx-auto mt-3 h-1.5 w-24 bg-emerald-800 rounded" />
          </div>

          <Image
            src="/handshake.svg"
            alt={t("acks.image_alt")}
            width={480}
            height={320}
            priority
            className="w-full max-w-[460px] h-auto drop-shadow-2xl"
            sizes="(min-width: 1024px) 460px, 75vw"
          />

          <div className="max-w-[820px] text-center">
            {t("acks.description")
              .split("\n\n")
              .map((paragraph, idx) => {
                const trimmedParagraph = paragraph.trim();
                const isClosingParagraph = trimmedParagraph.startsWith("Thank you") || trimmedParagraph.startsWith("Děkujeme");

                return (
                  <p
                    key={idx}
                    className={`text-lg md:text-xl text-neutral-700 ${
                      idx === 0 ? "mt-8" : "mt-6"
                    }`}
                  >
                    {isClosingParagraph ? (
                      <strong className="font-semibold text-neutral-800">
                        {trimmedParagraph}
                      </strong>
                    ) : (
                      trimmedParagraph
                    )}
                  </p>
                );
              })}
          </div>

          <TeamSignatures className="mt-8 sm:mt-10 max-w-[900px]" />
        </div>
      </section>
    </main>
  );
}
