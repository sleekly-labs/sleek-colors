# Sleek Colors

Sleek Colors is a curated color library for product designers, UI/UX designers, and frontend developers. It provides general palettes, website-ready Primary and Secondary combinations, copy actions, filtering, and realistic interface previews.

Live site: [sleek-colors.vercel.app](https://sleek-colors.vercel.app)

## Features

- Curated general palettes with HEX copy interactions.
- Website color combinations with explicit Primary and Secondary roles.
- Search, sorting, filtering, result counts, and load-more browsing.
- Category and mood discovery pages.
- Interactive website previews for supported combinations.
- Responsive layouts with keyboard-accessible controls.
- Static SEO metadata, canonical URLs, Open Graph, Twitter cards, sitemap, robots rules, and favicon assets.
- Privacy-friendly Vercel Analytics integration.

## Routes

| Route                     | Purpose                                |
| ------------------------- | -------------------------------------- |
| `/`                       | Homepage and palette discovery         |
| `/palettes`               | Search and filter general palettes     |
| `/website-colors`         | Search and filter website combinations |
| `/palette/[slug]`         | General or website palette details     |
| `/preview/[palette-slug]` | Interactive website color preview      |
| `/categories`             | Browse palette categories              |
| `/category/[slug]`        | Category-specific palette results      |
| `/random`                 | Open a random published palette        |
| `/about`                  | Product information                    |
| `/contact`                | Contact information                    |

## Tech Stack

- Next.js 16 App Router and React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui components backed by Base UI
- Vitest for automated tests
- Prettier with the Tailwind CSS plugin
- Vercel deployment and Analytics

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `NEXT_PUBLIC_SITE_URL` when deploying to a different domain. It controls canonical URLs, sitemap links, robots metadata, and social metadata. The default is `https://sleek-colors.vercel.app`.

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## Quality Checks

Run focused checks:

```bash
npm run lint
npm run typecheck
npm run format:check
npm run test
npm run build
```

Run the complete quality pipeline:

```bash
npm run quality
```

## Content Model

Palette content lives in `src/data/palettes` and is validated before it enters the catalog. Shared types are defined in `src/types`, while taxonomy definitions live in `src/data/taxonomy`.

- General palettes contain 3-8 unique HEX colors.
- Website palettes contain exactly two colors and identify `primaryColor` and `secondaryColor`.
- Only published palettes are exposed in public catalog views and generated routes.

## Project Structure

```text
src/
  app/                 App Router pages and metadata routes
  components/          Layout, palette, search, preview, and UI components
  data/                Catalog access, palette data, and taxonomy
  lib/                 Clipboard, SEO, validation, and shared utilities
  types/               Centralized TypeScript domain types
public/images/         Logo and favicon assets
```

## Deployment

The project is optimized for Vercel:

```bash
npm run build
npm run start
```

The GitHub Actions workflow runs the repository quality checks on pushes and pull requests. Configure `NEXT_PUBLIC_SITE_URL` in the deployment environment before publishing to a custom domain.
