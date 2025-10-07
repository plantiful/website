# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a showcase website documenting the Plantiful team's journey creating a mobile app:
- **Purpose**: Chronicles the team's journey from initial idea through competitions, internship, whitepaper, and open-sourcing
- **Key Milestones**:
  - Idea inception and development
  - Kyndyrl Challenge competition
  - One-year internship at Kyndryl
  - JA Czech and JA Expo competitions (multiple category placements)
  - Whitepaper publication
  - Open-source release

**Technical Stack**:
This is a Next.js 15 website using:
- **Framework**: Next.js 15.5.4 with App Router
- **React**: 19.1.0
- **TypeScript**: Yes
- **Styling**: Tailwind CSS v4
- **Linting/Formatting**: Biome 2.2.0
- **Build Tool**: Turbopack (enabled for dev and build)

## Commands

### Development
```bash
pnpm dev          # Start dev server with Turbopack at localhost:3000
pnpm build        # Production build with Turbopack
pnpm start        # Start production server
```

### Code Quality
```bash
pnpm lint         # Run Biome linting (biome check)
pnpm format       # Format code with Biome (biome format --write)
```

## Architecture

- **Source Directory**: `src/`
- **App Router**: Pages and routes in `src/app/`
- **Entry Point**: `src/app/page.tsx`
- **Layout**: `src/app/layout.tsx`
- **Global Styles**: `src/app/globals.css`

This is a standard Next.js App Router structure. The project uses Turbopack for faster builds and development.
