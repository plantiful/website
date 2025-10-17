"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useState,
  type CSSProperties,
  type MouseEventHandler,
} from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Timeline } from "@/components/ui/timeline";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { getTimelineData } from "@/data/timelineData";
import { cn } from "@/lib/utils";
import type Lenis from "lenis";

type BackgroundArtifactProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style: CSSProperties;
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

export default function Home() {
  const t = useTranslations();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
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
        className="inline-flex flex-1 items-center justify-center gap-3 px-4 py-2.5 text-sm md:flex-none md:px-6 md:py-3 md:text-base bg-[#184D44] hover:bg-[#143d36] text-white font-semibold rounded-lg transition-colors shadow-lg"
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
        {/* scattered background artifacts */}
        <BackgroundArtifact
          src="/big_bg_artifact.svg"
          alt={t("common.decorative_alt")}
          width={1024}
          height={1024}
          className="rotate-90 opacity-100"
          style={{
            left: "clamp(-32rem, -26vw, -18rem)",
            top: "clamp(-30rem, -28vh, -16rem)",
            width: "min(70vw, 42rem)",
          }}
        />
        <BackgroundArtifact
          src="/big_bg_artifact.svg"
          alt={t("common.decorative_alt")}
          width={1024}
          height={1024}
          className="opacity-100"
          style={{
            top: "clamp(8rem, 24vh, 20rem)",
            right: "clamp(-20rem, -10vw, -6rem)",
            width: "min(66vw, 38rem)",
          }}
        />
        <BackgroundArtifact
          src="/bg_artifact.svg"
          alt={t("common.decorative_alt")}
          width={352}
          height={194}
          className="opacity-100"
          style={{
            top: "clamp(-10rem, -6vh, -2rem)",
            left: "clamp(6rem, 18vw, 26rem)",
            width: "min(32vw, 18rem)",
          }}
        />

        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center justify-center gap-0 md:gap-2 py-24 px-6 sm:px-10 md:px-16 lg:px-24 md:pl-24 lg:pl-54 md:grid-cols-[auto_auto]">
          <div className="max-w-[540px] md:pr-0 lg:pr-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-[-0.01em] text-neutral-900">
              {t("intro.title")}
            </h2>
            <p className="mt-6 text-lg md:text-xl text-neutral-700">
              {t("intro.subtitle")}
            </p>
          </div>
          <div className="relative flex justify-center md:justify-end md:-ml-24 lg:-ml-34">
            {/* Phone showcase */}
            <Image
              src="/PhoneShowcase.svg"
              alt={t("intro.phones_alt")}
              width={800}
              height={600}
              className="w-full max-w-[620px] sm:max-w-[820px] md:max-w-[920px] lg:max-w-[1000px] h-auto drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Timeline section (Aceternity UI demo with artifacts handled inside) */}
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

        {/* background artifacts - full-section overlay to avoid horizontal overflow */}
        <div className="pointer-events-none absolute inset-0 overflow-x-hidden">
          <BackgroundArtifact
            key="bg-artifact-1"
            src="/big_bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={1024}
            height={1024}
            className="z-0 -translate-y-1/2"
            style={{
              left: "clamp(-30rem, -22vw, -16rem)",
              top: "50%",
              width: "min(74vw, 44rem)",
            }}
          />
          <BackgroundArtifact
            key="bg-artifact-2"
            src="/big_bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={1024}
            height={1024}
            className="z-0"
            style={{
              top: "clamp(6rem, 22vh, 20rem)",
              right: "clamp(-24rem, -16vw, -10rem)",
              width: "min(70vw, 42rem)",
            }}
          />

          <BackgroundArtifact
            key="bg-artifact-3"
            src="/big_bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={1024}
            height={1024}
            className="z-0 rotate-180"
            style={{
              bottom: "clamp(-16rem, -12vh, -4rem)",
              right: "clamp(-26rem, -18vw, -12rem)",
              width: "min(72vw, 42rem)",
            }}
          />

          <BackgroundArtifact
            key="bg-artifact-4"
            src="/bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={352}
            height={194}
            className="z-0"
            style={{
              top: "clamp(8rem, 26vh, 20rem)",
              right: "clamp(2rem, 10vw, 12rem)",
              width: "min(30vw, 18rem)",
            }}
          />
          <BackgroundArtifact
            key="bg-artifact-5"
            src="/bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={352}
            height={194}
            className="z-0"
            style={{
              top: "clamp(20rem, 62vh, 34rem)",
              left: "clamp(1rem, 12vw, 14rem)",
              width: "min(30vw, 18rem)",
            }}
          />
          <BackgroundArtifact
            key="bg-artifact-6"
            src="/bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={352}
            height={194}
            className="z-0 -translate-y-1/2"
            style={{
              top: "50%",
              right: "clamp(-10rem, 0vw, 10rem)",
              width: "min(28vw, 16rem)",
            }}
          />
          <BackgroundArtifact
            key="bg-artifact-7"
            src="/bg_artifact.svg"
            alt={t("common.decorative_alt")}
            width={352}
            height={194}
            className="z-0"
            style={{
              bottom: "clamp(1rem, 10vh, 6rem)",
              right: "clamp(1rem, 6vw, 5rem)",
              width: "min(26vw, 15rem)",
            }}
          />
        </div>
      </section>

      {/* Acknowledgements section */}
      <section
        id="acknowledgements"
        className="relative w-full bg-white overflow-hidden py-20"
      >
        {/* background accents */}
        <BackgroundArtifact
          src="/big_bg_artifact.svg"
          alt={t("common.decorative_alt")}
          width={1024}
          height={1024}
          className="rotate-45 opacity-100"
          style={{
            left: "clamp(-28rem, -20vw, -12rem)",
            top: "clamp(-12rem, -8vh, -4rem)",
            width: "min(74vw, 44rem)",
          }}
        />
        <BackgroundArtifact
          src="/big_bg_artifact.svg"
          alt={t("common.decorative_alt")}
          width={1024}
          height={1024}
          className="opacity-100"
          style={{
            right: "clamp(-20rem, -12vw, -4rem)",
            bottom: "clamp(-8rem, -6vh, -1rem)",
            width: "min(72vw, 42rem)",
          }}
        />

        <div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center gap-10 px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="text-center max-w-4xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-[-0.01em] text-neutral-900">
              {t("acks.title")}
            </h2>
            <div className="mx-auto mt-3 h-1.5 w-24 bg-emerald-800 rounded" />
          </div>

          <Image
            src="/timeline/team_phone.png"
            alt={t("acks.image_alt")}
            width={1606}
            height={768}
            priority
            className="w-full max-w-[920px] h-auto drop-shadow-2xl"
            sizes="(min-width: 1600px) 920px, (min-width: 1024px) 75vw, 100vw"
          />

          <div className="max-w-[820px] text-center">
            {t("acks.description")
              .split("\n\n")
              .map((paragraph, idx) => (
                <p
                  key={idx}
                  className={`text-lg md:text-xl text-neutral-700 ${
                    idx === 0 ? "mt-8" : "mt-6"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
