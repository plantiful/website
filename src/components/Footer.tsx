import Image from "next/image";
import { useTranslations } from "next-intl";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x={3} y={3} width={18} height={18} rx={4.5} />
    <circle cx={12} cy={12} r={4.5} />
    <circle cx={17.5} cy={6.5} r={1.2} fill="currentColor" stroke="none" />
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x={3} y={5} width={18} height={14} rx={2.5} />
    <path d="M4 7l7.964 6a1 1 0 001.072 0L21 7" />
  </svg>
);

export default function Footer() {
  const t = useTranslations();
  const partnerLogos = [
    {
      src: "/purkynka.png",
      alt: t("footer.partners.purkynka"),
      href: "https://purkynka.cz/",
    },
    {
      src: "/kyndryl.png",
      alt: t("footer.partners.kyndryl"),
      href: "https://www.kyndryl.com/",
    },
    {
      src: "/JA.png",
      alt: t("footer.partners.ja"),
      href: "https://jaczech.org/",
    },
    {
      src: "/plantid.png",
      alt: t("footer.partners.plantid"),
      offsetClass: "-translate-y-3.5 sm:-translate-y-[12px]",
      href: "https://plant.id/",
    },
  ];

  return (
    <footer className="w-full">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="grid grid-cols-2 gap-12 py-10 sm:grid-cols-3 md:grid-cols-4 md:gap-16 lg:gap-24 xl:gap-32 place-items-center">
          {partnerLogos.map(({ src, alt, offsetClass, href }) => (
            <div
              key={src}
              className="flex h-16 items-center justify-center sm:h-20 md:h-24 lg:h-[4.5rem]"
            >
              <a
                href={href}
                {...(href ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                className={href ? "inline-flex" : undefined}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={200}
                  height={60}
                  className={`max-h-full w-auto object-contain ${offsetClass ?? ""}`}
                  priority={src === "/purkynka.png"}
                />
              </a>
            </div>
          ))}
        </div>
        <div className="h-[2px] bg-black" />
      </div>

      <div className="mt-12 bg-[#184D44]">
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 md:px-16 lg:px-24 pt-16 pb-12 md:pb-16">
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-16">
            <div className="max-w-2xl space-y-4">
              <Image
                src="/Plantiful.svg"
                alt={t("footer.logo_alt")}
                width={150}
                height={40}
                className="h-8 w-auto md:h-10"
                priority
              />
              <p className="text-emerald-100/85 text-base md:text-lg max-w-xl">
                {t("footer.cta_description")}
              </p>
            </div>

            <div className="space-y-4 md:min-w-[220px]">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-white">
                {t("footer.contact_title")}
              </h4>
              <div className="space-y-3 text-emerald-100/85">
                <a
                  href="https://instagram.com/plantiful.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-emerald-100 transition-colors"
                >
                  <InstagramIcon className="h-5 w-5" />
                  {t("footer.instagram")}
                </a>
                <a
                  href="mailto:info@plantiful.cz"
                  className="flex items-center gap-3 hover:text-emerald-100 transition-colors"
                >
                  <MailIcon className="h-5 w-5" />
                  {t("footer.email")}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 pb-2 border-t border-emerald-800/50">
            <p className="text-center text-sm text-emerald-100/60">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
