# HEDAMO — Disclosure Ledger (Frontend)

A compact, institutional-grade product disclosure interface built with Next.js, React and Tailwind CSS.

## Quick start

Prerequisites
- Node.js (16+ recommended)
- npm (or yarn/pnpm)

Install

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build for production

```bash
npm run build
npm run start
```

Lint

```bash
npm run lint
```

Open http://localhost:3000 (or the port reported by Next) in your browser.

## Project overview

- Framework: Next.js (16.1.3) with the App Router
- UI: React 19 + Tailwind CSS (v4)
- Icons: lucide-react
- Language: TypeScript
- Tooling: Turbopack in dev, Next React compiler enabled

Core files and folders

```
src/
	app/
		page.tsx                # Main dashboard (product list + filters)
		layout.tsx              # Root layout and global styles
		lib/
			mockData.ts           # Local mock dataset and constants
			constants.ts          # UI labels and configuration
		components/
			Disclosure/           # Detail view + history components
			Layout/               # Header (site chrome)
			UI/                   # Badge, Table, Skeleton components
```

Config and tooling

- `package.json` — scripts and deps
- `tsconfig.json` — TypeScript config (path aliases)
- `tailwind.config.ts` & `postcss.config.mjs` — Tailwind/PostCSS
- `eslint.config.mjs` — ESLint config using `eslint-config-next`

## Key features

- Product listing with search, category & status filters
- Client-side filtering + sorting with `useMemo`
- Product detail slide-in modal with version history and disclaimer
- Accessible focus and keyboard-friendly controls
- Tailwind utilities and custom color tokens for an institutional look

## Development notes

- Mock data lives at `src/app/lib/mockData.ts` and can be replaced with API calls.
- The project uses a TypeScript `paths` alias (`@/*`) mapped to `src/*` for convenience — see `tsconfig.json`.
- Dev server runs with Turbopack; if you receive a lock error, ensure no other `next dev` process is running and retry.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint

## Contributing

1. Fork the repo and create a branch for your feature/bugfix.
2. Run `npm install` and `npm run dev` to test locally.
3. Open a pull request describing your changes.

## License

This repository does not include a license file. Add a `LICENSE` if you plan to publish or open-source this project.

---

If you'd like, I can also:
- add a `start` preview script for Vite (if converting to Vite),
- pin a Node version via an `.nvmrc` or `engines` in `package.json`, or
- add a short CONTRIBUTING.md. Tell me which you'd prefer.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

