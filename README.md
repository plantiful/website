<p align="center">
  <img src="public/Plantiful.svg" alt="Plantiful Logo" height="120" />
</p>

<h2 align="center">Plantiful Website</h2>

<p align="center">
  Marketing site and interactive timeline for the Plantiful project — the award‑winning plant care platform built by high school students. This site highlights the open-source resources behind the product.
  <br />
</p>

## Project Structure

```text
src/
├── app/
│   ├── [locale]/layout.tsx        # Locale-scoped root layout + SEO metadata
│   ├── [locale]/page.tsx          # Landing page sections and timeline
│   └── api/intl/route.ts          # next-intl routing helpers
├── components/                    # Reusable UI primitives (timeline, buttons, cards)
├── data/
│   └── timelineData.tsx           # Milestones, assets and translations glue
├── i18n/                          # Locale config + message loading
├── lib/                           # Utilities (cn helper, smooth scroll setup)
└── styles/                        # Global Tailwind layers and resets

public/
├── Plantiful.svg                  # Wordmark used across the site
├── PhoneShowcase.png              # High-res hero devices
├── timeline/                      # Timeline imagery & FEKT poster
└── locale JSON catalogs live in /messages (cs.json, en.json)
```

## Getting Started

Install dependencies (Node 18+ recommended):

```sh
npm install
```

Start the dev server:

```sh
npm run dev
```

## Content & Translations

- Locale messages live in `messages/en.json` and `messages/cs.json`. Keys map to sections (hero, intro, timeline, footer, etc.). Keep both files in sync when updating copy.
- Timeline milestones are described in `src/data/timelineData.tsx` and leverage the translation helpers:
  - `toParagraphs` splits rich text into paragraphs.
  - `getHighlights` / `getLinks` pull arrays from locale JSON.
  - `TimelineMilestoneContent` handles responsive media lightboxes and resource cards.
- Decorative SVGs and phone renders reside in `public/`. When swapping imagery ensure alt text keys exist in both locales (`timeline.gallery.*`).

## Styling & Motion

- Tailwind CSS drives layout (`tailwind.config.ts`, global styles in `src/styles`).
- Smooth scrolling relies on Lenis (`src/components/SmoothScroll.tsx`).
- Ambient parallax and artifact layers live in `src/components/ui`, using Framer Motion for subtle animations.

## Internationalization

- `next-intl` powers routing and locale detection (`src/i18n/routing.ts`, `middleware.ts`).
- Locale segments (`/[locale]`) map to messages via `getMessages`.
- Add new languages by creating `messages/<lang>.json` and updating `routing.ts`.

## License

This website is open source, released under the [MIT License](LICENSE).
