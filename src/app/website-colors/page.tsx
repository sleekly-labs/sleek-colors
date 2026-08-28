import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, MonitorSmartphone, Search } from "lucide-react";

import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import { WebsitePaletteExplorer } from "@/components/search";
import { buttonLinkClassName } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo";
import { getWebsitePalettes } from "@/data";

export const metadata = createPageMetadata({
  title: "Website Colors",
  description:
    "Explore Primary and Secondary color combinations for websites and products.",
  path: "/website-colors"
});

export default function WebsiteColorsPage() {
  const palettes = getWebsitePalettes("published");
  const featuredCount = palettes.filter((palette) => palette.isFeatured).length;
  const styleCount = new Set(
    palettes.flatMap((palette) =>
      palette.categories.filter((category) => category !== "Website")
    )
  ).size;
  const moodCount = new Set(palettes.flatMap((palette) => palette.moods)).size;

  return (
    <>
      <PageSection spacing="loose" className="border-b">
        <PageContainer className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_20rem] lg:items-end">
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Website color combinations"
              title="Browse interface-ready primary and secondary pairs."
              description="These combinations are curated for landing pages, dashboards, product marketing, and service websites where color roles need to stay clear."
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
                    href="/palettes"
                    className={buttonLinkClassName({
                      variant: "outline",
                      size: "lg"
                    })}
                  >
                    <span>See full palettes</span>
                    <ArrowRight />
                  </Link>
                </div>
              }
            />
          </div>

          <div className="bg-card rounded-card border-border grid gap-3 border p-5">
            <div className="flex items-center gap-3 rounded-md border px-3 py-3">
              <span className="bg-muted inline-flex size-9 items-center justify-center rounded-md">
                <MonitorSmartphone className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium">Preview-ready pairs</p>
                <p className="text-muted-foreground text-sm">
                  Every card keeps clear primary and secondary roles.
                </p>
              </div>
            </div>
            {[
              { label: "Published pairs", value: palettes.length },
              { label: "Styles", value: styleCount },
              { label: "Moods", value: moodCount },
              { label: "Featured", value: featuredCount }
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
            title="Refine the website colors catalog."
            description="Search by name, tag, mood, color family, or HEX value, then filter by style and inspect the preview actions directly from the grid."
          />
          <Suspense fallback={null}>
            <WebsitePaletteExplorer
              palettes={palettes}
              searchParamKeys={{
                colorFamily: "family",
                mood: "mood",
                page: "page",
                query: "q",
                sort: "sort",
                style: "style"
              }}
            />
          </Suspense>
        </PageContainer>
      </PageSection>
    </>
  );
}
