import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import { PaletteExplorerPreview } from "@/components/search";
import { buttonLinkClassName } from "@/components/ui/button";
import {
  getCategoryDefinitions,
  getGeneralPalettes,
  getMoodDefinitions
} from "@/data";

export default function PalettesPage() {
  const palettes = getGeneralPalettes("published");
  const categoryCount = getCategoryDefinitions().length;
  const moodCount = getMoodDefinitions().length;
  const featuredCount = palettes.filter((palette) => palette.isFeatured).length;

  return (
    <>
      <PageSection spacing="loose" className="border-b">
        <PageContainer className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_20rem] lg:items-end">
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Palette catalog"
              title="Browse every published palette in one working surface."
              description="Search by name, tag, mood, category, color family, or HEX value, then refine without leaving the grid."
              actions={
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="#catalog"
                    className={buttonLinkClassName({ size: "lg" })}
                  >
                    <Search />
                    <span>Open catalog</span>
                  </Link>
                  <Link
                    href="/website-colors"
                    className={buttonLinkClassName({
                      variant: "outline",
                      size: "lg"
                    })}
                  >
                    <span>See website colors</span>
                    <ArrowRight />
                  </Link>
                </div>
              }
            />
          </div>

          <div className="bg-card rounded-card border-border grid gap-3 border p-5">
            {[
              {
                label: "Published palettes",
                value: palettes.length
              },
              {
                label: "Categories",
                value: categoryCount
              },
              {
                label: "Moods",
                value: moodCount
              },
              {
                label: "Featured",
                value: featuredCount
              }
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 rounded-md border px-3 py-2.5"
              >
                <span className="text-muted-foreground text-sm">
                  {item.label}
                </span>
                <span className="text-lg font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </PageContainer>
      </PageSection>

      <PageSection id="catalog" spacing="compact">
        <PageContainer className="flex flex-col gap-6">
          <SectionHeader
            eyebrow="Search and filter"
            title="Refine the full palette library."
            description="The results update in place as you search, sort, and toggle filters."
          />
          <Suspense fallback={null}>
            <PaletteExplorerPreview
              palettes={palettes}
              initialVisibleCount={12}
              loadMoreStep={12}
              searchParamKeys={{
                category: "category",
                colorFamily: "family",
                mood: "mood",
                page: "page",
                query: "q",
                sort: "sort"
              }}
            />
          </Suspense>
        </PageContainer>
      </PageSection>
    </>
  );
}
