import Link from "next/link";
import { ArrowRight, Sparkles, SwatchBook } from "lucide-react";

import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import { buttonLinkClassName } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo";
import { getGeneralPalettes, getWebsitePalettes } from "@/data";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn how Sleek Colors helps teams find and evaluate useful color palettes.",
  path: "/about"
});

const specimenColors = [
  "#192BC2",
  "#7F56D9",
  "#F79009",
  "#12B76A",
  "#101828"
] as const;

const principles = [
  {
    title: "Curated for decisions",
    description:
      "Every set is organized around a usable direction, not a random pile of attractive hex values."
  },
  {
    title: "Clear enough to compare",
    description:
      "Categories, moods, families, and consistent card layouts make the right direction easier to spot."
  },
  {
    title: "Ready for interface work",
    description:
      "Website pairs keep Primary and Secondary roles explicit so hierarchy can be tested before implementation."
  }
] as const;

const workflow = [
  "Start with the catalog when you want to scan broad directions.",
  "Use category, mood, family, or HEX search to narrow the field.",
  "Open a detail page to copy values and keep a permanent reference.",
  "Switch to website combinations when roles and hierarchy matter most."
] as const;

export default function AboutPage() {
  const generalCount = getGeneralPalettes("published").length;
  const websiteCount = getWebsitePalettes("published").length;

  return (
    <>
      <PageSection
        spacing="loose"
        className="bg-muted/30 mx-3 my-4 w-auto overflow-hidden rounded-[1.5rem] border shadow-sm sm:mx-5 lg:mx-8"
      >
        <PageContainer
          width="wide"
          className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.85fr)] lg:items-center"
        >
          <div className="flex flex-col gap-7">
            <span className="text-muted-foreground inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-sm">
              <Sparkles className="text-primary size-4" />A working library for
              color decisions
            </span>
            <div className="space-y-5">
              <h1 className="max-w-2xl text-5xl leading-[1.05] font-semibold tracking-tight text-balance md:text-6xl">
                Color direction, without the detour.
              </h1>
              <p className="text-muted-foreground max-w-xl text-base leading-7 text-pretty md:text-lg">
                Sleek Colors helps product, brand, and editorial teams move from
                a vague visual instinct to a palette they can actually use.
              </p>
            </div>
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
            <div className="text-muted-foreground flex flex-wrap gap-x-6 gap-y-2 border-t pt-5 text-sm">
              <span>
                <strong className="text-foreground mr-1">{generalCount}</strong>{" "}
                general palettes
              </span>
              <span>
                <strong className="text-foreground mr-1">{websiteCount}</strong>{" "}
                website pairs
              </span>
              <span>Static, focused, shareable</span>
            </div>
          </div>
          <div className="bg-card border-border grid gap-4 rounded-2xl border p-3 shadow-sm sm:p-4">
            <div className="grid grid-cols-5 overflow-hidden rounded-xl">
              {specimenColors.map((color) => (
                <span
                  key={color}
                  className="min-h-48 sm:min-h-64"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="grid gap-2 px-1 pb-1">
              <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                The point of view
              </p>
              <p className="text-foreground text-lg font-medium">
                Useful color beats endless choice.
              </p>
              <p className="text-muted-foreground text-sm leading-6">
                A smaller, clearer starting point makes the rest of the design
                work move faster.
              </p>
            </div>
          </div>
        </PageContainer>
      </PageSection>

      <PageSection spacing="compact">
        <PageContainer
          width="full"
          className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <SectionHeader
            eyebrow="What we value"
            title="Less hunting. Better decisions."
            description="The library is designed for the moment before a color system becomes code."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {principles.map((principle, index) => (
              <article key={principle.title} className="border-t pt-4">
                <span className="text-muted-foreground font-mono text-xs">
                  0{index + 1}
                </span>
                <h2 className="mt-6 text-lg font-semibold">
                  {principle.title}
                </h2>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </PageContainer>
      </PageSection>

      <PageSection spacing="compact" className="border-t">
        <PageContainer
          width="full"
          className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
        >
          <div>
            <SectionHeader
              eyebrow="A simple workflow"
              title="Start broad, then narrow."
              description="Use the surface that matches the decision in front of you, without leaving the library."
            />
            <div className="mt-7 grid gap-3">
              {workflow.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4 border-b pb-3 last:border-0"
                >
                  <span className="text-muted-foreground font-mono text-sm">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-6">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="bg-muted/40 rounded-card border-border flex flex-col gap-4 border p-5">
            <p className="text-muted-foreground text-sm">Continue exploring</p>
            <Link
              href="/palettes"
              className="hover:bg-background focus-visible:bg-background flex items-center justify-between rounded-md border px-4 py-3 text-sm font-medium transition-colors"
            >
              <span>All palettes</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/website-colors"
              className="hover:bg-background focus-visible:bg-background flex items-center justify-between rounded-md border px-4 py-3 text-sm font-medium transition-colors"
            >
              <span>Website colors</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/random"
              className="hover:bg-background focus-visible:bg-background flex items-center justify-between rounded-md border px-4 py-3 text-sm font-medium transition-colors"
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
