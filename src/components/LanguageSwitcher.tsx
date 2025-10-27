'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const languages = [
  { code: 'en', name: 'English', flagUrl: 'https://flagcdn.com/us.svg' },
  { code: 'cs', name: 'Čeština', flagUrl: 'https://flagcdn.com/cz.svg' },
] as const;

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[1];

  const switchLocale = (locale: 'en' | 'cs') => {
    router.replace(pathname, { locale });
    setIsOpen(false);
  };

  return (
    <nav aria-label="Language" className="relative z-50 pointer-events-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 border border-white/20 relative z-50 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img src={currentLanguage.flagUrl} alt="" className="w-5 h-4 object-cover rounded-none" />
        <span className="text-white/90 font-medium text-sm">{currentLanguage.code.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 text-white/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white/20 backdrop-blur-xl shadow-2xl border border-white/30 overflow-hidden z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/30 transition-colors text-left ${
                  currentLocale === lang.code ? 'bg-white/40' : ''
                }`}
                aria-current={currentLocale === lang.code ? 'true' : undefined}
              >
                <img src={lang.flagUrl} alt="" className="w-6 h-4 object-cover rounded-none" />
                <div className="flex flex-col">
                  <span className="text-white font-medium text-sm drop-shadow-sm">{lang.name}</span>
                  <span className="text-white/70 text-xs">{lang.code.toUpperCase()}</span>
                </div>
                {currentLocale === lang.code && (
                  <svg
                    className="ml-auto w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </nav>
  );
}
