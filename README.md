# HEDAMO — Disclosure Ledger (Frontend)

A compact, institutional-grade product disclosure interface built with Next.js, React and Tailwind CSS.

## Quick start
# HEDAMO — Product Disclosure Interface

A focused frontend for producer-declared product disclosures. Designed for clarity, good DX and an institutional aesthetic — this project demonstrates a clean UI, simple client-side filtering, and a detail modal for disclosures.

## Quick Start

Prerequisites
- Node.js 18+ (recommended)
- npm 9+ (or yarn/pnpm)

Install

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build and start (production)

```bash
npm run build
npm run start
```

Lint

```bash
npm run lint
```

## Technology

- Next.js 16.x (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- lucide-react (icons)

## Project Structure (key files)

```
src/
  app/
	layout.tsx        # Root layout, global styles
	page.tsx          # Dashboard (list + filters)
	components/       # UI components (Disclosure, Layout, UI)
	lib/              # mockData.ts, constants.ts
public/              # static assets
README.md            # this file
package.json
tsconfig.json
tailwind.config.ts
```

## Key Features

- Product listing with search, category and status filters
- Client-side filtering and sorting (fast, immediate UX)
- Product detail modal with version history and contextual disclaimer
- Accessible keyboard interaction and focus management

## What HEDAMO Does

HEDAMO is a transparency-first disclosure platform for producer-declared product information. It provides a standardized structure for producers to record product attributes, evidence, and versioned disclosures so consumers, procurement teams, and researchers can compare and review producer statements.

## What HEDAMO Does Not Do

HEDAMO is not a verification, certification, or approval system. It records producer claims without endorsing or validating them — accuracy remains the producer's responsibility.

## System Flow (Producer)

1. Producer creates a product record and fills structured disclosure fields.
2. Producer attaches supporting evidence (documents, images, test reports).
3. Producer updates status from `Draft` → `Submitted` → `Published`.
4. Published disclosures are viewable by authorized audiences for review and analysis.

## Typical User Personas

- Procurement professional comparing supplier disclosures.
- Product compliance officer tracking version history and reporting.
- Sustainability researcher aggregating standardized disclosures for analysis.

## Assumptions

- Dataset size is small in this demo (client-side filtering); for large catalogs, server-side pagination is recommended.
- Timestamps are shown in the user's local timezone.
- Images come from external providers (Unsplash) and the UI includes graceful fallbacks.


## Development Notes

- Mock data: `src/app/lib/mockData.ts` (replace with API endpoints as needed)
- TypeScript paths: `@/*` -> `src/*` (configured in `tsconfig.json`)
- Restart your editor/TS server after changing `tsconfig.json` to pick up path aliases

## Scripts

- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm run start` — serve production build
- `npm run lint` — run ESLint

## License

Project includes an MIT license file.

---

This README is intentionally concise. For design rationale, implementation notes, or roadmap details, check source comments and `src/app` components.
1. Fork the repo and create a branch for your feature/bugfix.

2. Run `npm install` and `npm run dev` to test locally.
