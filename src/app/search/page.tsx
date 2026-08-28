import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import {
  PaletteExplorerPreview,
  WebsitePaletteExplorer
} from "@/components/search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPageMetadata } from "@/lib/seo";
import { getGeneralPalettes, getWebsitePalettes } from "@/data";

export const metadata = createPageMetadata({
  title: "Search",
  description:
    "Search Sleek Colors palettes by name, tags, moods, categories, and HEX values.",
  path: "/search"
});

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawQuery = resolvedSearchParams.q;
  const query = Array.isArray(rawQuery)
    ? (rawQuery[0] ?? "")
    : (rawQuery ?? "");
  const normalizedQuery = query.trim();

  const generalPalettes = getGeneralPalettes("published");
  const websitePalettes = getWebsitePalettes("published");
  const normalizedNeedle = normalizedQuery.toLowerCase();
  const generalMatches = normalizedQuery
    ? generalPalettes.filter((palette) =>
        [
          palette.name,
          palette.description,
          ...palette.tags,
          ...palette.categories,
          ...palette.moods,
          ...palette.colorFamilies,
          ...palette.colors.map((color) => color.hex),
          ...palette.colors.map((color) => color.hex)
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedNeedle)
      )
    : generalPalettes;
  const websiteMatches = normalizedQuery
    ? websitePalettes.filter((palette) =>
        [
          palette.name,
          palette.description,
          ...palette.tags,
          ...palette.categories,
          ...palette.moods,
          ...palette.colorFamilies,
          ...palette.colors.map((color) => color.hex),
          palette.primaryColor,
          palette.secondaryColor
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedNeedle)
      )
    : websitePalettes;
  const hasNoResults =
    normalizedQuery.length > 0 &&
    generalMatches.length === 0 &&
    websiteMatches.length === 0;

  return (
    <>
      <PageSection spacing="loose" className="border-b">
        <PageContainer className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_20rem] lg:items-end">
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Search"
              title="Search across palettes, moods, categories, and color names."
              description="Use one query to start from names, tags, category labels, mood labels, color names, or HEX values, then refine inside each result surface."
            />
            <form action="/search" className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="search"
                name="q"
                defaultValue={normalizedQuery}
                placeholder="Search palettes, tags, moods, colors"
                aria-label="Search the palette library"
                className="h-11"
              />
              <Button type="submit" size="lg">
                <Search />
                <span>Search</span>
              </Button>
            </form>
            <div className="flex flex-wrap gap-2">
              {["Calm", "Pastel", "Professional", "Blue", "Luxury"].map(
                (term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="hover:bg-muted focus-visible:bg-muted rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                  >
                    {term}
                  </Link>
                )
              )}
            </div>
          </div>

          <div className="bg-card rounded-card border-border grid gap-3 border p-5">
            {[
              { label: "General palettes", value: generalPalettes.length },
              {
                label: "Website combinations",
                value: websitePalettes.length
              },
              {
                label: normalizedQuery ? "Active query" : "Search scope",
                value: normalizedQuery || "Names, tags, moods"
              }
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 rounded-md border px-3 py-2.5"
              >
                <span className="text-muted-foreground text-sm">
                  {item.label}
                </span>
                <span className="max-w-[11rem] text-right text-sm font-medium text-balance">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </PageContainer>
      </PageSection>

      {hasNoResults ? (
        <PageSection spacing="compact">
          <PageContainer>
            <div className="bg-card rounded-card border-border flex flex-col gap-4 border p-5">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">
                  No results for &quot;{normalizedQuery}&quot;
                </h2>
                <p className="text-muted-foreground text-sm leading-6">
                  Try a broader mood, category, color family, or HEX value. You
                  can also open the main catalogs and refine from there.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/palettes"
                  className="inline-flex items-center gap-1 text-sm font-medium"
                >
                  <span>Open palettes route</span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/website-colors"
                  className="inline-flex items-center gap-1 text-sm font-medium"
                >
                  <span>Open website colors route</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </PageContainer>
        </PageSection>
      ) : null}

      <PageSection spacing="compact">
        <PageContainer className="flex flex-col gap-6">
          <SectionHeader
            eyebrow="General palettes"
            title="Search the multi-color library."
            description="Best for broader brand systems, editorial sets, packaging directions, and full palette exploration."
            actions={
              <Link
                href="/palettes"
                className="inline-flex items-center gap-1 text-sm font-medium"
              >
                <span>Open palettes route</span>
                <ArrowRight className="size-4" />
              </Link>
            }
          />
          <Suspense fallback={null}>
            <PaletteExplorerPreview
              palettes={generalPalettes}
              initialVisibleCount={12}
              loadMoreStep={12}
              initialQuery={normalizedQuery}
            />
          </Suspense>
        </PageContainer>
      </PageSection>

      <PageSection spacing="compact">
        <PageContainer className="flex flex-col gap-6">
          <SectionHeader
            eyebrow="Website combinations"
            title="Search primary and secondary pairs."
            description="Best for landing pages, dashboards, product marketing, and interface preview work."
            actions={
              <Link
                href="/website-colors"
                className="inline-flex items-center gap-1 text-sm font-medium"
              >
                <span>Open website colors route</span>
                <ArrowRight className="size-4" />
              </Link>
            }
          />
          <Suspense fallback={null}>
            <WebsitePaletteExplorer
              palettes={websitePalettes}
              initialQuery={normalizedQuery}
            />
          </Suspense>
        </PageContainer>
      </PageSection>
    </>
  );
}
