import Image from "next/image";

const imageWrapperClass =
  "relative w-full h-32 md:h-48 lg:h-64 overflow-hidden rounded-[24px] shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]";
const imageSizes =
  "(min-width: 1600px) 400px, (min-width: 1280px) 360px, (min-width: 1024px) 45vw, (min-width: 768px) 48vw, 90vw";
const descriptionClass =
  "mb-8 text-sm md:text-base lg:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300";

export const getTimelineData = (t: (key: string) => string) => [
  {
    title: t("timeline.foreword.title"),
    content: (
      <div>
        <p className={descriptionClass}>
          {t("timeline.foreword.description")}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className={imageWrapperClass}>
            <Image
              src="/timeline/team_phone.png"
              alt="Team with phone"
              fill
              className="object-cover"
              sizes={imageSizes}
              priority
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: t("timeline.kyndryl_challenge.title"),
    content: (
      <div>
        <p className={descriptionClass}>
          {t("timeline.kyndryl_challenge.description")}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className={imageWrapperClass}>
            <Image
              src="/timeline/kyndryl_challenge.jpg"
              alt="Kyndryl Challenge"
              fill
              className="object-cover"
              sizes={imageSizes}
            />
          </div>
          <div className={imageWrapperClass}>
            <Image
              src="/timeline/kyndryl_challenge_2.jpg"
              alt="Kyndryl Challenge"
              fill
              className="object-cover"
              sizes={imageSizes}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: t("timeline.kyndryl.title"),
    content: (
      <div>
        <p className={descriptionClass}>
          {t("timeline.kyndryl.description")}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className={imageWrapperClass}>
            <Image
              src="/timeline/phones.png"
              alt="Kyndryl internship"
              fill
              className="object-cover"
              sizes={imageSizes}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: t("timeline.ja_expo.title"),
    content: (
      <div>
        <p className={descriptionClass}>
          {t("timeline.ja_expo.description")}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className={imageWrapperClass}>
            <Image
              src="/timeline/JA_stanek.JPG"
              alt="JA Expo event"
              fill
              className="object-cover"
              sizes={imageSizes}
            />
          </div>
          <div className={imageWrapperClass}>
            <Image
              src="/timeline/team.png"
              alt="JA Expo team"
              fill
              className="object-cover"
              sizes={imageSizes}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: t("timeline.fekt_eeict.title"),
    content: (
      <div>
        <p className={descriptionClass}>
          {t("timeline.fekt_eeict.description")}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className={imageWrapperClass}>
            <Image
              src="/timeline/fekt.jpg"
              alt="FEKT EEICT event"
              fill
              className="object-cover"
              sizes={imageSizes}
            />
          </div>
          <div className={imageWrapperClass}>
            <Image
              src="/timeline/fekt_award.jpg"
              alt="FEKT EEICT award"
              fill
              className="object-cover"
              sizes={imageSizes}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: t("timeline.release.title"),
    content: (
      <div>
        <p className={descriptionClass}>
          {t("timeline.release.description")}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            key="release-1"
            src="https://assets.aceternity.com/templates/startup-1.webp"
            alt="Open-source release"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
        </div>
      </div>
    ),
  },
];
