import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { TimelineDemo } from "@/components/ui/timeline-demo";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="relative w-full bg-white">
      {/* Hero section with background image only here */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background image */}
        <Image
          src="/bg_us.png"
          alt="Botanical garden background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Left-to-right emerald overlay, matching the reference tint */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-900/70 via-emerald-900/55 to-transparent" />

        {/* Header */}
        <header className="absolute inset-x-0 top-0 z-40">
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
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-start gap-8 px-6 sm:px-10 md:grid-cols-[1fr_auto] md:px-16 lg:px-24">
            <div className="max-w-[820px]">
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
              <p className="mt-6 text-white/85 text-xl md:text-2xl">
                {t("hero.subtitle")
                  .split("\n")
                  .map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < t("hero.subtitle").split("\n").length - 1 && <br />}
                    </span>
                  ))}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://github.com/plantiful/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-black hover:bg-neutral-900 text-white font-semibold rounded-lg transition-colors shadow-lg"
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
                  See on GitHub
                </a>

                <a
                  href="#journey"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#184D44] hover:bg-[#143d36] text-white font-semibold rounded-lg transition-colors shadow-lg"
                >
                  See our journey
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
              </div>
            </div>
            <div className="justify-self-start md:justify-self-end">
              <HeroVideoDialog
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/zZ-SUUvdznc?autoplay=1&rel=0"
                thumbnailSrc="https://img.youtube.com/vi/zZ-SUUvdznc/maxresdefault.jpg"
                thumbnailAlt="Watch an example demo video"
                className="w-[360px] sm:w-[480px] md:w-[600px] lg:w-[720px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction section */}
      <section className="relative z-10 w-full bg-white min-h-screen flex items-center">
        {/* scattered background artifacts */}
        <div className="pointer-events-none select-none absolute -left-28 top-20 opacity-100">
          <Image
            src="/bg_artifact.svg"
            alt="decorative cloud"
            width={352}
            height={194}
          />
        </div>
        <div className="pointer-events-none select-none absolute right-20 top-1/3 opacity-100">
          <Image
            src="/bg_artifact.svg"
            alt="decorative cloud"
            width={352}
            height={194}
          />
        </div>
        <div className="pointer-events-none select-none absolute left-1/3 -top-40 opacity-100">
          <Image
            src="/bg_artifact.svg"
            alt="decorative cloud"
            width={352}
            height={194}
          />
        </div>
        <div className="pointer-events-none select-none absolute left-24 bottom-20 opacity-100">
          <Image
            src="/bg_artifact.svg"
            alt="decorative cloud"
            width={352}
            height={194}
          />
        </div>

        <div className="mx-auto grid w-fit max-w-[1600px] grid-cols-1 items-center justify-center gap-0 md:gap-2 py-24 px-6 sm:px-10 md:px-16 lg:px-24 md:grid-cols-[auto_auto]">
          <div className="max-w-[540px] md:pr-0 lg:pr-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-[-0.01em] text-neutral-900">
              {t("intro.title")}
            </h2>
            <p className="mt-6 text-lg md:text-xl text-neutral-700">
              {t("intro.subtitle")}
            </p>
          </div>
          <div className="relative flex justify-center md:justify-end">
            {/* Phone showcase */}
            <Image
              src="/PhoneShowcase.svg"
              alt="Plantiful app screens on phones"
              width={800}
              height={600}
              className="w-[620px] md:w-[820px] lg:w-[920px] xl:w-[1000px] h-auto drop-shadow-xl max-w-none"
            />
          </div>
        </div>
      </section>

      {/* Timeline section (Aceternity UI demo with artifacts handled inside) */}
      <section id="journey" className="relative w-full">
        <TimelineDemo />
      </section>
    </main>
  );
}
