import { HeroColorLab } from "@/components/home/hero-color-lab";
import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import { WebsitePaletteGrid } from "@/components/palette";
import { PaletteExplorerPreview } from "@/components/search";
import { buttonLinkClassName } from "@/components/ui/button";
import { getFeaturedWebsitePalettes, getGeneralPalettes } from "@/data";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  const generalPalettes = getGeneralPalettes("published");
  const websitePalettes = getFeaturedWebsitePalettes("published");
  const browsePreviewPalettes = generalPalettes.slice(0, 24);

  return (
    <>
      <PageSection
        spacing="loose"
        className="mx-3 my-4 w-auto overflow-hidden rounded-[1.5rem] border bg-[linear-gradient(110deg,#f1f5f9_0%,#dbeafe_16%,#cffafe_30%,#ede9fe_44%,#fce7f3_58%,#ffedd5_72%,#fef9c3_86%,#dcfce7_100%)] sm:mx-5 lg:mx-8"
      >
        <PageContainer
          width="wide"
          className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(26rem,0.9fr)] lg:items-center"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <span className="text-primary bg-primary/5 border-primary/20 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-sm">
                <Sparkles className="text-primary size-4" />
                Curated color systems for real work
              </span>
              <div className="max-w-3xl space-y-5">
                <h1 className="max-w-2xl text-5xl leading-[1.05] font-semibold tracking-tight text-balance md:text-6xl">
                  Find a palette that already knows its job.
                </h1>
                <p className="text-muted-foreground max-w-xl text-base leading-7 text-pretty md:text-lg">
                  A focused library of interface systems, campaign sets, and
                  website combinations that are ready to make a decision.
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
                href="/website-colors"
                className={buttonLinkClassName({
                  variant: "outline",
                  size: "lg"
                })}
              >
                <span>Browse website colors</span>
                <ArrowRight />
              </Link>
            </div>
          </div>

          <HeroColorLab />
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
          <WebsitePaletteGrid palettes={websitePalettes} />
        </PageContainer>
      </PageSection>
    </>
  );
}
