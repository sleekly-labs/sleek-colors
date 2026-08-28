import { ArrowRight, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import { WebsitePaletteGrid } from "@/components/palette";
import { PaletteExplorerPreview } from "@/components/search";
import { buttonLinkClassName } from "@/components/ui/button";
import {
  getCategoryDefinitions,
  getGeneralPalettes,
  getWebsitePalettes
} from "@/data";

const heroPalette = ["#101828", "#7F56D9", "#D6BBFB", "#F9FAFB"] as const;

export default function Home() {
  const generalPalettes = getGeneralPalettes("published");
  const websitePalettes = getWebsitePalettes("published");
  const browsePreviewPalettes = generalPalettes.slice(0, 24);

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
                <h1 className="max-w-2xl text-4xl font-bold tracking-normal text-balance md:text-5xl">
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
                <span>Browse website colors</span>
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
                  label: "Palette categories",
                  value: getCategoryDefinitions().length,
                  note: "Ways to narrow the library"
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

      <PageSection id="browse" spacing="compact">
        <PageContainer width="full" className="flex flex-col gap-6">
          <SectionHeader
            eyebrow="Search and filter"
            title="Browse the main palette library."
            description="Search by palette name, category, mood, color family, or HEX value, then refine with shared controls."
          />
          <Suspense fallback={null}>
            <PaletteExplorerPreview
              palettes={browsePreviewPalettes}
              initialVisibleCount={12}
              loadMoreStep={6}
            />
          </Suspense>
        </PageContainer>
      </PageSection>

      <PageSection spacing="compact">
        <PageContainer width="full" className="flex flex-col gap-6">
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
          <WebsitePaletteGrid palettes={websitePalettes.slice(0, 6)} />
        </PageContainer>
      </PageSection>
    </>
  );
}
