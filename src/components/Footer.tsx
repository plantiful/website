import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="w-full">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="grid grid-cols-2 gap-6 py-10 sm:grid-cols-3 md:flex md:flex-wrap md:items-center md:justify-center md:gap-10 lg:gap-12">
          <Image
            src="/purkynka.png"
            alt={t("footer.partners.purkynka")}
            width={200}
            height={60}
            className="mx-auto h-12 w-auto object-contain sm:h-14 md:h-16 lg:h-[4.5rem]"
            priority
          />
          <Image
            src="/kyndryl.png"
            alt={t("footer.partners.kyndryl")}
            width={200}
            height={60}
            className="mx-auto h-12 w-auto object-contain sm:h-14 md:h-16 lg:h-[4.5rem]"
          />
          <Image
            src="/JA.png"
            alt={t("footer.partners.ja")}
            width={200}
            height={60}
            className="mx-auto h-12 w-auto object-contain sm:h-14 md:h-16 lg:h-[4.5rem]"
          />
          <Image
            src="/plantid.png"
            alt={t("footer.partners.plantid")}
            width={200}
            height={60}
            className="mx-auto h-12 w-auto object-contain sm:h-14 md:h-16 lg:h-[4.5rem]"
          />
        </div>
        <div className="h-[2px] bg-black" />
      </div>

      <div className="mt-12 bg-[#184D44]">
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t("footer.cta_title")}
              </h3>
              <p className="text-emerald-100/80 text-base md:text-lg max-w-xl">
                {t("footer.cta_description")}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-emerald-300">
                {t("footer.contact_title")}
              </h4>
              <div className="space-y-2 text-emerald-100/90">
                <a
                  href="https://instagram.com/plantiful.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-white transition-colors"
                >
                  {t("footer.instagram")}
                </a>
                <a
                  href="mailto:info@plantiful.cz"
                  className="block hover:text-white transition-colors"
                >
                  {t("footer.email")}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-emerald-800/50">
            <p className="text-center text-sm text-emerald-100/60">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
