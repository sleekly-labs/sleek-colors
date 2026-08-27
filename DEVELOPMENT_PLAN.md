# Sleek Colors Development Plan

This file is the execution checklist for the MVP described in `PRD.md`. Update it as work is completed so the current phase, next task, decisions, and deferred scope remain clear.

## How to Use This Plan

- Complete one focused checklist item at a time unless a larger batch is explicitly approved.
- Mark an item complete only after its implementation and relevant verification pass.
- Do not start the next phase until the current phase exit criteria are satisfied, unless the exception is recorded in the decision log.
- Read the relevant local Next.js guide in `node_modules/next/dist/docs/` before changing framework APIs, conventions, or file structure.
- Keep version 1 frontend-only. Do not add a backend, database, ORM, CMS, admin panel, authentication, payments, or user-generated content.

## Current Status

- **Current phase:** Phase 1 - Foundation and architecture
- **Next task:** Configure shadcn/ui using the repository's Tailwind CSS version and project conventions.
- **MVP status:** Not started
- **Last updated:** 2026-08-27

## Phase 1 - Foundation and Architecture

Goal: establish a maintainable frontend foundation before building product features.

- [x] Audit the generated project, dependencies, scripts, and existing routes against the PRD.
- [x] Read the relevant Next.js 16.3.3 local documentation before making framework-specific changes.
- [x] Define the target `src/` structure for app routes, components, data, color utilities, SEO utilities, and shared types.
- [ ] Configure shadcn/ui using the repository's Tailwind CSS version and project conventions.
- [ ] Establish neutral design tokens for color, typography, spacing, borders, focus states, and restrained shadows.
- [ ] Add shared layout primitives and responsive page-width conventions.
- [ ] Define quality commands for linting, type checking, formatting, tests, and production builds.
- [ ] Decide whether dark mode is included in MVP and record the decision below.

### Phase 1 Exit Criteria

- [ ] The project structure and UI foundations support all planned MVP routes.
- [ ] The application passes the agreed baseline quality commands.
- [ ] No backend or runtime content infrastructure has been introduced.

## Phase 2 - Static Content Model and Seed Data

Goal: create a validated, replaceable static data layer for all palette content.

- [ ] Define centralized TypeScript types for palettes, colors, categories, moods, color families, and website palette roles.
- [ ] Enforce general palette rules: 3-8 colors, unique slug, published status, and normalized uppercase HEX values.
- [ ] Enforce website palette rules: exactly two colors, explicit Primary and Secondary values, `paletteType: "website"`, and website preview enabled.
- [ ] Create static data modules for general palettes, website palettes, categories, and moods.
- [ ] Add a small data access layer so UI components do not depend on the physical data-file layout.
- [ ] Add validation for duplicate IDs/slugs, invalid HEX values, missing taxonomy values, and website palette invariants.
- [ ] Assign dominant color families manually for version 1 filtering.
- [ ] Seed representative development data covering every planned category, mood, color family, and palette type.
- [ ] Expand launch content to at least 100 curated general palettes.
- [ ] Expand launch content to at least 30 curated website color combinations.
- [ ] Review seed data for quality and remove near-duplicate palettes.

### Phase 2 Exit Criteria

- [ ] Static data is type-safe, validated, and independent from presentation components.
- [ ] Both palette types have enough representative data to build and test every MVP flow.
- [ ] The launch content targets are tracked and can be verified automatically.

## Phase 3 - Shared Product Components and Interactions

Goal: build the reusable UI and interaction layer used across palette experiences.

- [ ] Build the site header with Explore, Categories, Random, About, Search, and optional theme controls.
- [ ] Build the footer with product links and only verified contact or social destinations.
- [ ] Build the general palette card with accessible color-copy interactions and a separate detail-page link target.
- [ ] Build the two-color website palette card with clear Primary and Secondary labels, copy controls, and Try on Website action.
- [ ] Build reusable palette grids with stable responsive layouts for desktop, tablet, and mobile.
- [ ] Implement a shared Clipboard API utility that consistently copies uppercase HEX values.
- [ ] Add lightweight, accessible copy confirmation for individual colors.
- [ ] Add full-palette copying in the PRD's newline-separated HEX format.
- [ ] Build shared search, sorting, filter, pagination or load-more, empty-state, and results-summary controls.
- [ ] Verify all controls work with keyboard, pointer, and touch input without relying on hover.

### Phase 3 Exit Criteria

- [ ] Shared components cover both general and website palettes without duplicating core behavior.
- [ ] Copy actions provide immediate, accessible feedback.
- [ ] Components remain usable and stable at common mobile and desktop widths.

## Phase 4 - Homepage and Discovery Routes

Goal: deliver the main browsing, search, filtering, and discovery journeys.

- [ ] Build the homepage with a concise hero, search, featured palettes, category or mood shortcuts, and main palette grid.
- [ ] Add the homepage Website Color Combinations section with a curated subset and View All Website Colors action.
- [ ] Build `/palettes` with published palettes, search, sorting, filters, and pagination or load more.
- [ ] Build `/website-colors` with two-color cards, search, sorting, style/mood/color-family filters, and preview actions.
- [ ] Build `/category/[slug]` pages from the data-driven taxonomy.
- [ ] Build `/search` with query support for palette names, tags, categories, moods, and color names.
- [ ] Reflect search, filter, sort, and pagination state in shareable URLs where appropriate.
- [ ] Build `/random` to redirect to a random published palette.
- [ ] Build a concise `/about` page.
- [ ] Add appropriate not-found and no-results experiences.

### Phase 4 Exit Criteria

- [ ] Visitors can browse all published content and reach any palette from the primary discovery routes.
- [ ] Search and filters combine reliably and produce shareable URLs.
- [ ] Discovery routes are responsive, keyboard accessible, and useful without an account.

## Phase 5 - Palette Detail and Website Preview

Goal: complete the high-value palette evaluation, copying, sharing, and website-preview flows.

- [ ] Build statically generated `/palette/[slug]` pages for every published palette.
- [ ] Show palette name, large preview, interactive swatches, HEX values, category, moods, tags, and optional dates.
- [ ] Add individual-copy, full-palette-copy, and share actions with lightweight feedback.
- [ ] Add related palettes based on explicit, deterministic category, mood, tag, or color-family signals.
- [ ] Clearly identify Primary and Secondary roles on website palette detail pages.
- [ ] Add Try on Website actions only to palettes that support the preview.
- [ ] Build `/preview/[palette-slug]` with a realistic sample landing page and small dashboard/stat section.
- [ ] Apply Primary to major actions, links, selected states, and key accents.
- [ ] Apply Secondary to supporting actions, badges, highlights, and complementary elements.
- [ ] Keep text and background neutrals controlled by the preview template for legibility.
- [ ] Display and copy the active Primary and Secondary HEX values in the preview.
- [ ] Implement temporary Swap Colors and Reset actions without mutating source data.
- [ ] Verify the preview updates immediately and works at desktop and mobile widths.

### Phase 5 Exit Criteria

- [ ] Every published palette has a permanent detail URL and complete copy interactions.
- [ ] Website palettes open in a realistic preview with correct, clearly labeled color roles.
- [ ] Swap and Reset are deterministic, accessible, and do not change static palette data.

## Phase 6 - SEO, Sharing, Analytics, and Supporting Pages

Goal: make palette pages indexable and product behavior measurable without excessive tracking.

- [ ] Generate unique titles, descriptions, canonical URLs, and social metadata for core and palette routes.
- [ ] Add appropriate structured data for palette detail pages.
- [ ] Generate sitemap and robots configuration for all indexable routes.
- [ ] Define a future-compatible strategy for palette-specific Open Graph images without blocking MVP launch.
- [ ] Add privacy-conscious analytics using one approved provider.
- [ ] Track the PRD's core discovery, copy, share, random, website-palette, preview, and swap events.
- [ ] Avoid collecting unnecessary personal data or sensitive search content.
- [ ] Add Privacy, Terms, and Contact destinations before exposing those links in the footer.

### Phase 6 Exit Criteria

- [ ] All indexable pages have valid route-specific metadata and canonical URLs.
- [ ] Analytics events are documented, verified, and limited to useful product behavior.
- [ ] Sitemap, robots rules, and supporting footer destinations are production-ready.

## Phase 7 - Quality, Accessibility, and Performance Hardening

Goal: verify the complete MVP across behavior, viewports, accessibility, and production builds.

- [ ] Add focused automated tests for data validation, search/filter composition, copy formatting, related palettes, and preview state.
- [ ] Run lint, type checking, formatting checks, automated tests, and a production build.
- [ ] Test core journeys at representative desktop, tablet, and mobile viewports.
- [ ] Test core journeys with keyboard-only navigation and visible focus states.
- [ ] Verify semantic structure, accessible names, status announcements, contrast, and non-color state indicators.
- [ ] Verify touch interactions do not depend on hover and interactive targets are appropriately sized.
- [ ] Audit client-side JavaScript and move non-interactive rendering to server components where appropriate.
- [ ] Optimize fonts, below-the-fold rendering, and any visual assets.
- [ ] Resolve layout shifts, overflow, clipped text, and overlapping controls.
- [ ] Run Lighthouse against production-like builds and address material regressions in Performance, Accessibility, Best Practices, and SEO.
- [ ] Verify there are no broken internal links or unpublished palette URLs.

### Phase 7 Exit Criteria

- [ ] All agreed quality commands pass.
- [ ] Core workflows have no major accessibility, responsive-layout, or navigation issues.
- [ ] Lighthouse scores are ideally above 90 in all four PRD target categories, with exceptions documented.

## Phase 8 - Launch and Production Verification

Goal: deploy the frontend-only MVP and verify the real production experience.

- [ ] Confirm the Definition of Done checklist below is complete.
- [ ] Confirm launch content includes at least 100 general palettes and 30 website combinations.
- [ ] Configure the production site URL and environment-specific analytics settings.
- [ ] Deploy the production build to Vercel over HTTPS.
- [ ] Verify canonical URLs, sitemap, robots rules, social metadata, and analytics on the production domain.
- [ ] Smoke-test homepage, discovery, search, filters, random, detail, copy, share, and preview flows in production.
- [ ] Re-run Lighthouse against the production deployment and record results.
- [ ] Record launch date, deployed revision, known limitations, and rollback path.

### Phase 8 Exit Criteria

- [ ] The production site satisfies the MVP Definition of Done.
- [ ] Production monitoring and analytics show no launch-blocking errors.
- [ ] Known limitations and post-MVP priorities are documented.

## MVP Definition of Done

- [ ] The application runs without a backend, database, CMS, admin panel, or authentication.
- [ ] All palette content comes from static, type-safe frontend data.
- [ ] Users can browse at least 100 curated general palettes and at least 30 website combinations.
- [ ] Every published palette has a unique, indexable URL.
- [ ] Individual uppercase HEX values can be copied in one interaction with confirmation.
- [ ] Complete palettes can be copied in the default newline-separated format.
- [ ] Website palettes clearly distinguish Primary and Secondary colors.
- [ ] Website palettes work in the realistic sample preview, including Swap and Reset.
- [ ] Search, category, mood, color-family, and color-count filtering work reliably.
- [ ] Random palette discovery works.
- [ ] Core routes are responsive and accessible across common devices and input methods.
- [ ] Core pages include appropriate SEO metadata.
- [ ] Privacy-conscious analytics covers the agreed product events.
- [ ] The site is deployed over HTTPS with strong production Lighthouse results.
- [ ] There are no major accessibility, navigation, or content-quality issues.

## Explicitly Deferred Beyond MVP

- Admin panel, backend API, database, ORM, CMS, and runtime content editing
- User accounts, social login, favorites, personal collections, and recently viewed history
- Payments and premium features
- User submissions, voting, likes, and public API access
- AI/image palette generation and advanced color tools
- RGB, HSL, OKLCH, CSS variable, Tailwind, JSON, and array export formats
- Automatic dominant-color calculation and approximate color or HEX search
- User-site URL previews, browser extensions, embed scripts, and additional preview templates
- Dynamic palette Open Graph image generation, unless approved during Phase 6

## Decision Log

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-08-27 | Use `DEVELOPMENT_PLAN.md` as the phased execution tracker. | Keeps progress separate from the product requirements in `PRD.md`. |
| 2026-08-27 | Keep version 1 frontend-only with static TypeScript or JSON content. | This is an explicit PRD constraint and keeps the first release lightweight. |
| 2026-08-27 | Treat website palettes as exactly two colors with explicit Primary and Secondary roles. | This invariant drives cards, detail pages, filters, and the preview experience. |

## Progress Log

| Date | Phase | Update | Verification |
| --- | --- | --- | --- |
| 2026-08-27 | Planning | Created the initial PRD-derived development plan. | Reviewed against `PRD.md`; no product code changed. |
| 2026-08-27 | Phase 1 | Audited the generated Next.js starter, dependencies, scripts, existing routes, PRD route gaps, target structure, and baseline quality commands in `DEVELOPMENT_AUDIT.md`. | `npm.cmd run lint` passed; `npx.cmd tsc --noEmit` passed; `npm.cmd run build` failed because `next/font/google` could not fetch Geist fonts from Google Fonts in this environment. |
| 2026-08-27 | Phase 1 | Read and recorded local Next.js 16.3.3 documentation implications for App Router structure, pages, layouts, dynamic routes, static params, metadata, Server and Client Components, CSS, fonts, `src/`, and TypeScript. | Updated `DEVELOPMENT_AUDIT.md`; no application code changed. |
| 2026-08-27 | Phase 1 | Adopted `src/` source layout by moving the App Router to `src/app`, mapping `@/*` to `./src/*`, and adding source-structure README files for app routes, components, static data, color utilities, SEO utilities, validation, clipboard, and shared types. | `npm.cmd run lint` passed; `npx.cmd next typegen` passed; `npx.cmd tsc --noEmit` passed after route type generation; `npm.cmd run build` still fails on the known `next/font/google` network fetch for Geist fonts. |
