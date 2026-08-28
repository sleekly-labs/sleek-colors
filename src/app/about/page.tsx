import Link from "next/link";
import { ArrowRight, SwatchBook } from "lucide-react";

import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import { buttonLinkClassName } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo";
import {
  getCategoryDefinitions,
  getGeneralPalettes,
  getMoodDefinitions,
  getWebsitePalettes
} from "@/data";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn how Sleek Colors helps teams find and evaluate useful color palettes.",
  path: "/about"
});

export default function AboutPage() {
  const generalPalettes = getGeneralPalettes("published");
  const websitePalettes = getWebsitePalettes("published");
  const categoryCount = getCategoryDefinitions().length;
  const moodCount = getMoodDefinitions().length;

  return (
    <>
      <PageSection spacing="loose" className="border-b">
        <PageContainer className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_20rem] lg:items-end">
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="About Sleek Colors"
              title="A working library for choosing palettes with intent."
              description="Sleek Colors is a curated catalog of multi-color palettes and interface-ready website combinations for product, brand, editorial, and marketing work."
              actions={
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/palettes"
                    className={buttonLinkClassName({ size: "lg" })}
                  >
                    <SwatchBook />
                    <span>Browse palettes</span>
                  </Link>
                  <Link
                    href="/website-colors"
                    className={buttonLinkClassName({
                      variant: "outline",
                      size: "lg"
                    })}
                  >
                    <span>Website colors</span>
                    <ArrowRight />
                  </Link>
                </div>
              }
            />
          </div>

          <div className="bg-card rounded-card border-border grid gap-3 border p-5">
            {[
              { label: "General palettes", value: generalPalettes.length },
              { label: "Website combinations", value: websitePalettes.length },
              { label: "Categories", value: categoryCount },
              { label: "Moods", value: moodCount }
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

      <PageSection spacing="compact">
        <PageContainer className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Curated, not generated dumps",
              description:
                "The library is organized around usable directions, clear categories, moods, and color-family signals rather than raw color lists."
            },
            {
              title: "Built for fast comparison",
              description:
                "You can scan cards, copy single HEX values, copy full palettes, and move between general sets and website pairs without leaving the product flow."
            },
            {
              title: "Made for real interface work",
              description:
                "Website combinations keep Primary and Secondary roles explicit so product and marketing teams can evaluate hierarchy faster."
            }
          ].map((item) => (
            <section
              key={item.title}
              className="bg-card rounded-card border-border border p-5"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                {item.description}
              </p>
            </section>
          ))}
        </PageContainer>
      </PageSection>

      <PageSection spacing="compact">
        <PageContainer className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <section className="bg-card rounded-card border-border border p-5">
            <SectionHeader
              eyebrow="How to use it"
              title="Start broad, then narrow."
              description="Browse by category or mood when you know the direction, search when you know a term or color family, and open detail pages when you need direct copying and a permanent link."
            />
            <div className="mt-6 grid gap-3">
              {[
                "Browse the catalog to compare broad directions.",
                "Use filters and search to narrow by tone, category, or color family.",
                "Open a palette page to copy values and share a permanent URL.",
                "Use website combinations when you need clear primary and secondary roles."
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-md border px-4 py-3"
                >
                  <span className="bg-muted inline-flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="bg-card rounded-card border-border flex flex-col gap-4 border p-5">
            <p className="text-muted-foreground text-sm">Next places to go</p>
            <Link
              href="/palettes"
              className="hover:bg-muted focus-visible:bg-muted flex items-center justify-between rounded-md border px-4 py-3 text-sm font-medium transition-colors"
            >
              <span>All palettes</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/website-colors"
              className="hover:bg-muted focus-visible:bg-muted flex items-center justify-between rounded-md border px-4 py-3 text-sm font-medium transition-colors"
            >
              <span>Website colors</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/random"
              className="hover:bg-muted focus-visible:bg-muted flex items-center justify-between rounded-md border px-4 py-3 text-sm font-medium transition-colors"
            >
              <span>Random palette</span>
              <ArrowRight className="size-4" />
            </Link>
          </aside>
        </PageContainer>
      </PageSection>
    </>
  );
}
