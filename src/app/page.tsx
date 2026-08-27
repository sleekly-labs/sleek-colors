import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";

import { GeneralPaletteGrid, WebsitePaletteGrid } from "@/components/palette";
import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import { PaletteExplorerPreview } from "@/components/search";
import { buttonLinkClassName } from "@/components/ui/button";
import {
  getCategoryDefinitions,
  getFeaturedPalettes,
  getGeneralPalettes,
  getMoodDefinitions,
  getWebsitePalettes
} from "@/data";
import { cn } from "@/lib/utils";

const heroPalette = ["#101828", "#7F56D9", "#D6BBFB", "#F9FAFB"] as const;

export default function Home() {
  const generalPalettes = getGeneralPalettes("published");
  const websitePalettes = getWebsitePalettes("published");
  const featuredGeneralPalettes = getFeaturedPalettes()
    .filter((palette) => palette.paletteType === "general")
    .slice(0, 3);
  const featuredWebsitePalettes = websitePalettes.slice(0, 3);
  const categoryShortcuts = getCategoryDefinitions().slice(0, 4);
  const moodShortcuts = getMoodDefinitions().slice(0, 4);
  const browsePreviewPalettes = generalPalettes.slice(0, 18);

  return (
    <>
      <PageSection spacing="loose" className="border-b">
        <PageContainer className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_24rem] lg:items-end">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <span className="text-muted-foreground inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-sm">
                <Sparkles className="size-4" />
                Curated color library for product and brand work
              </span>
              <div className="max-w-3xl space-y-4">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-normal text-balance md:text-5xl">
                  Find a palette that already knows its job.
                </h1>
                <p className="text-muted-foreground max-w-2xl text-base leading-7 text-pretty md:text-lg">
                  Browse calm interface systems, bold campaign sets, soft
                  editorials, and launch-ready website combinations without
                  digging through generic color dumps.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#browse"
                className={buttonLinkClassName({ size: "lg" })}
              >
                <Search />
                <span>Search the library</span>
              </Link>
              <Link
                href="/palettes"
                className={buttonLinkClassName({
                  variant: "outline",
                  size: "lg"
                })}
              >
                <span>Browse all palettes</span>
                <ArrowRight />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  label: "General palettes",
                  value: generalPalettes.length,
                  note: "Curated multi-color sets"
                },
                {
                  label: "Website combinations",
                  value: websitePalettes.length,
                  note: "Primary and secondary pairs"
                },
                {
                  label: "Featured directions",
                  value: featuredGeneralPalettes.length,
                  note: "Fast starting points"
                }
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-card rounded-card border-border flex min-h-28 flex-col justify-between border px-4 py-4"
                >
                  <span className="text-muted-foreground text-sm">
                    {item.label}
                  </span>
                  <div className="space-y-1">
                    <span className="block text-3xl font-semibold">
                      {item.value}
                    </span>
                    <p className="text-muted-foreground text-sm">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-card border-border overflow-hidden border">
            <div className="grid grid-cols-4">
              {heroPalette.map((hex) => (
                <div
                  key={hex}
                  className="min-h-28"
                  style={{ backgroundColor: hex }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="grid gap-4 p-5">
              <div className="space-y-2">
                <p className="text-xs font-medium tracking-normal uppercase">
                  This week&apos;s direction
                </p>
                <h2 className="text-xl font-semibold">
                  Quiet product contrast
                </h2>
                <p className="text-muted-foreground text-sm leading-6">
                  Deep ink, controlled violet, and pale support tones suited to
                  dashboards, product launches, and editorial landing pages.
                </p>
              </div>
              <div className="grid gap-2">
                {heroPalette.map((hex, index) => (
                  <div
                    key={hex}
                    className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="size-6 rounded-md border"
                        style={{ backgroundColor: hex }}
                        aria-hidden="true"
                      />
                      <span className="font-medium">
                        {index === 0
                          ? "Base"
                          : index === 1
                            ? "Primary"
                            : index === 2
                              ? "Support"
                              : "Canvas"}
                      </span>
                    </div>
                    <span className="text-muted-foreground font-mono text-xs">
                      {hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageContainer>
      </PageSection>

      <PageSection spacing="compact">
        <PageContainer className="grid gap-6 lg:grid-cols-2">
          <section className="bg-card rounded-card border-border border p-5">
            <SectionHeader
              eyebrow="Browse by category"
              title="Start from the kind of palette you need."
              description="Use these shortcuts when the project tone is already clear."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {categoryShortcuts.map((category, index) => (
                <Link
                  key={category.slug}
                  href="#browse"
                  className={cn(
                    "rounded-card border-border hover:bg-muted focus-visible:bg-muted flex min-h-28 flex-col justify-between border p-4 transition-colors"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium">
                      {category.label}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-6">
                    {category.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-card rounded-card border-border border p-5">
            <SectionHeader
              eyebrow="Browse by mood"
              title="Narrow by the feeling on the page."
              description="A useful entry point when you know the brand tone before the category."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              {moodShortcuts.map((mood) => (
                <Link
                  key={mood.slug}
                  href="#browse"
                  className="hover:bg-muted focus-visible:bg-muted rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                >
                  {mood.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {moodShortcuts.slice(0, 3).map((mood) => (
                <div
                  key={mood.slug}
                  className="flex items-start gap-3 rounded-md border px-4 py-3"
                >
                  <span className="mt-1 size-2.5 rounded-full bg-[color:var(--foreground)]/70" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{mood.label}</p>
                    <p className="text-muted-foreground text-sm leading-6">
                      {mood.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </PageContainer>
      </PageSection>

      <PageSection spacing="compact">
        <PageContainer className="flex flex-col gap-6">
          <SectionHeader
            eyebrow="Featured palettes"
            title="A short list for fast decisions."
            description="Useful starting points when you want contrast, mood, and coverage without browsing the full catalog first."
            actions={
              <Link
                href="#browse"
                className={buttonLinkClassName({
                  variant: "outline",
                  size: "sm"
                })}
              >
                <span>Open full library</span>
              </Link>
            }
          />
          <GeneralPaletteGrid palettes={featuredGeneralPalettes} />
        </PageContainer>
      </PageSection>

      <PageSection spacing="compact">
        <PageContainer className="flex flex-col gap-6">
          <SectionHeader
            eyebrow="Website color combinations"
            title="Primary and secondary pairs for live interface work."
            description="Each pair is tuned for hierarchy, call-to-action contrast, and cleaner preview testing before you open the full website colors catalog."
            actions={
              <Link
                href="/website-colors"
                className={buttonLinkClassName({
                  variant: "outline",
                  size: "sm"
                })}
              >
                <span>View all website colors</span>
                <ArrowRight />
              </Link>
            }
          />
          <WebsitePaletteGrid palettes={featuredWebsitePalettes} />
        </PageContainer>
      </PageSection>

      <PageSection id="browse" spacing="compact">
        <PageContainer className="flex flex-col gap-6">
          <SectionHeader
            eyebrow="Search and filter"
            title="Browse the main palette library."
            description="Search by palette name, category, mood, color family, or HEX value, then refine with shared controls."
          />
          <PaletteExplorerPreview palettes={browsePreviewPalettes} />
        </PageContainer>
      </PageSection>
    </>
  );
}
