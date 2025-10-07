import Image from "next/image";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Timeline } from '@/components/ui/timeline';

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
        <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 py-6 sm:py-10">
          <Image src="/Plantiful.svg" alt={t('header.logo_alt')} width={140} height={32} priority />

          <LanguageSwitcher />
        </header>

        {/* Hero copy */}
        <div className="relative z-10 flex min-h-screen items-center">
          <div className="px-6 sm:px-10 md:px-16 lg:px-24 max-w-[820px]">
          <h1 className="text-white font-bold leading-[1.05] text-5xl md:text-6xl lg:text-7xl">
            {t('hero.title').split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < t('hero.title').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="mt-6 text-white/85 text-xl md:text-2xl">
            {t('hero.subtitle').split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < t('hero.subtitle').split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
          </div>
        </div>
      </section>

      {/* Introduction section */}
      <section className="relative z-10 w-full bg-white min-h-screen flex items-center">
        {/* scattered background artifacts */}
        <Image src="/bg_artifact.svg" alt="decorative cloud" width={352} height={194} className="pointer-events-none select-none absolute -left-28 top-10 opacity-60" />
        <Image src="/bg_artifact.svg" alt="decorative cloud" width={352} height={194} className="pointer-events-none select-none absolute left-1/3 -top-10 opacity-40" />
        <Image src="/bg_artifact.svg" alt="decorative cloud" width={352} height={194} className="pointer-events-none select-none absolute right-20 top-20 opacity-50" />
        <Image src="/bg_artifact.svg" alt="decorative cloud" width={352} height={194} className="pointer-events-none select-none absolute left-24 bottom-10 opacity-40" />

        <div className="mx-auto grid w-fit max-w-[1600px] grid-cols-1 items-center justify-center gap-0 md:gap-2 py-24 px-6 sm:px-10 md:px-16 lg:px-24 md:grid-cols-[auto_auto]">
          <div className="max-w-[540px] md:pr-0 lg:pr-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-[-0.01em] text-neutral-900">
              {t('intro.title')}
            </h2>
            <p className="mt-6 text-lg md:text-xl text-neutral-700">
              {t('intro.subtitle')}
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

      {/* Timeline section (Aceternity UI-inspired) */}
      <section className="relative w-full bg-white min-h-screen">
        <Timeline
          title="Our journey"
          subTitle="A visual look at how Plantiful came to life."
          titleClassName="text-4xl md:text-5xl lg:text-6xl font-bold"
          subTitleClassName="text-base md:text-lg"
          data={[
            {
              title: 'Idea inception and development',
              content: (
                <div className="bg-neutral-100/70 border border-black/5 rounded-xl p-6">
                  <p className="text-neutral-700">
                    From a spark to a concept—shaping the core problem and the solution for plant lovers.
                  </p>
                </div>
              )
            },
            {
              title: 'Kyndyrl Challenge competition',
              content: (
                <div className="bg-neutral-100/70 border border-black/5 rounded-xl p-6">
                  <p className="text-neutral-700">
                    We tested our idea publicly and learned how to present and iterate quickly.
                  </p>
                </div>
              )
            },
            {
              title: 'One-year internship at Kyndryl',
              content: (
                <div className="bg-neutral-100/70 border border-black/5 rounded-xl p-6">
                  <p className="text-neutral-700">
                    We worked with mentors across engineering and design to sharpen the product.
                  </p>
                </div>
              )
            },
            {
              title: 'JA Czech and JA Expo competitions (multiple category placements)',
              content: (
                <div className="bg-neutral-100/70 border border-black/5 rounded-xl p-6">
                  <p className="text-neutral-700">
                    We participated in multiple categories and placed in several—validation from the community.
                  </p>
                </div>
              )
            },
            {
              title: 'Whitepaper publication',
              content: (
                <div className="bg-neutral-100/70 border border-black/5 rounded-xl p-6">
                  <p className="text-neutral-700">
                    We documented our approach and learnings in a formal whitepaper for others to build upon.
                  </p>
                </div>
              )
            },
            {
              title: 'Open-source release',
              content: (
                <div className="bg-neutral-100/70 border border-black/5 rounded-xl p-6">
                  <p className="text-neutral-700">
                    We opened the codebase and invited the community to collaborate with us.
                  </p>
                </div>
              )
            }
          ]}
        />
      </section>
    </main>
  );
}
