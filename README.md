# Dummy Products

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

## Technologies Used

- Next.js 16 App Router with React 19 and TypeScript
- Radix UI Themes, Dialog primitives, and Sonner toast system
- Tailwind CSS utility classes composed with `tailwind-merge` and `clsx`
- Biome for linting/formatting plus Husky and Lint-Staged automation
- Lucide icons and Radix primitives for accessible UI widgets

## Features

- Product catalogue with loading skeletons and responsive layout
- Detailed product page featuring gallery, color/size selectors, and quantity controls
- Client-side cart sheet with add/remove actions and running totals
- Buy-now confirmation dialog that summarizes selections before checkout
- Toast feedback for successful purchases and cart operations
