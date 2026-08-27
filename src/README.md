# Sleek Colors Source Structure

This folder contains application source code. Root-level files remain for
project configuration, package management, static assets in `public/`, and
planning documents.

## Structure

- `app/`: Next.js App Router route tree and route-level metadata.
- `components/layout/`: header, footer, navigation, and page shell components.
- `components/palette/`: palette cards, grids, swatches, copy controls, and
  preview-facing palette UI.
- `components/search/`: search, sorting, filtering, pagination, empty states,
  and results summaries.
- `components/ui/`: small reusable primitives and shadcn/ui-owned components.
- `data/palettes/`: static general palettes and website color combinations.
- `data/taxonomy/`: categories, moods, color families, and style groupings.
- `lib/clipboard/`: Clipboard API helpers and copy formatting.
- `lib/colors/`: HEX normalization, contrast helpers, palette transforms, and
  color-family utilities.
- `lib/seo/`: metadata helpers, canonical URL helpers, sitemap inputs, and
  structured-data helpers.
- `lib/validation/`: static content validation for palette and taxonomy data.
- `types/`: shared TypeScript types for data and UI contracts.

## Route Policy

Only files under `app/` create public routes, and only when a route segment has
a `page.tsx` or `route.ts` file. Keep reusable implementation code outside the
route tree unless route-local colocation is clearly better.

## Component Policy

Use Server Components by default. Add `"use client"` only to small interactive
components that need event handlers, browser APIs, clipboard access, URL filter
state, or preview state.
