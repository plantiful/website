import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 md:gap-20 py-10">
          <Image
            src="/purkynka.png"
            alt="Purkynka"
            width={200}
            height={60}
            className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            priority
          />
          <Image
            src="/kyndryl.png"
            alt="Kyndryl"
            width={200}
            height={60}
            className="h-12 sm:h-14 md:h-16 w-auto object-contain"
          />
          <Image
            src="/JA.png"
            alt="JA Czech"
            width={200}
            height={60}
            className="h-12 sm:h-14 md:h-16 w-auto object-contain"
          />
          <Image
            src="/JIC.png"
            alt="JIC"
            width={200}
            height={60}
            className="h-12 sm:h-14 md:h-16 w-auto object-contain"
          />
        </div>
        <div className="h-[2px] bg-black" />
      </div>

      <div className="mt-12 bg-[#184D44]">
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Let's grow together
              </h3>
              <p className="text-emerald-100/80 text-base md:text-lg max-w-xl">
                Connect with us to learn more about Plantiful and how we're
                helping plant lovers care for their green companions.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-emerald-300">
                Contact
              </h4>
              <div className="space-y-2 text-emerald-100/90">
                <a
                  href="https://instagram.com/plantiful.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-white transition-colors"
                >
                  Instagram: plantiful.cz
                </a>
                <a
                  href="mailto:info@plantiful.cz"
                  className="block hover:text-white transition-colors"
                >
                  Email: info@plantiful.cz
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-emerald-800/50">
            <p className="text-center text-sm text-emerald-100/60">
              © 2025 Plantiful
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
