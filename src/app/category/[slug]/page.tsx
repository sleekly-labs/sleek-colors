import Link from "next/link";
import { ArrowRight, Layers3, SwatchBook } from "lucide-react";
import { notFound } from "next/navigation";

import { GeneralPaletteGrid, WebsitePaletteGrid } from "@/components/palette";
import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import { buttonLinkClassName } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo";
import {
  getCategoryDefinitions,
  getGeneralPalettes,
  getWebsitePalettes
} from "@/data";

export function generateStaticParams() {
  return getCategoryDefinitions().map((category) => ({
    slug: category.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryDefinitions().find((item) => item.slug === slug);

  if (!category) {
    return {};
  }

  return createPageMetadata({
    title: `${category.label} palettes`,
    description: category.description,
    path: `/category/${category.slug}`
  });
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryDefinitions().find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const generalPalettes = getGeneralPalettes("published").filter((palette) =>
    palette.categories.includes(category.label)
  );
  const websitePalettes = getWebsitePalettes("published").filter((palette) =>
    palette.categories.includes(category.label)
  );

  return (
    <>
      <PageSection spacing="loose" className="border-b">
        <PageContainer className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_20rem] lg:items-end">
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Category"
              title={`${category.label} palettes`}
              description={category.description}
              actions={
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/palettes"
                    className={buttonLinkClassName({ size: "lg" })}
                  >
                    <span>Browse all palettes</span>
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
            <div className="flex items-center gap-3 rounded-md border px-3 py-3">
              <span className="bg-muted inline-flex size-9 items-center justify-center rounded-md">
                <SwatchBook className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium">{category.label}</p>
                <p className="text-muted-foreground text-sm">
                  Data-driven category route from the shared taxonomy.
                </p>
              </div>
            </div>
            {[
              { label: "General palettes", value: generalPalettes.length },
              { label: "Website combinations", value: websitePalettes.length },
              {
                label: "Total matches",
                value: generalPalettes.length + websitePalettes.length
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

      {generalPalettes.length > 0 ? (
        <PageSection spacing="compact">
          <PageContainer className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="General palettes"
              title={`${category.label} multi-color sets`}
              description="Curated palettes for broader brand, editorial, packaging, and interface exploration."
            />
            <GeneralPaletteGrid palettes={generalPalettes} />
          </PageContainer>
        </PageSection>
      ) : null}

      {websitePalettes.length > 0 ? (
        <PageSection spacing="compact">
          <PageContainer className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Website combinations"
              title={`${category.label} primary and secondary pairs`}
              description="Two-color combinations tuned for interface hierarchy and preview-driven website work."
            />
            <WebsitePaletteGrid palettes={websitePalettes} />
          </PageContainer>
        </PageSection>
      ) : null}

      {generalPalettes.length === 0 && websitePalettes.length === 0 ? (
        <PageSection spacing="compact">
          <PageContainer>
            <div className="bg-card rounded-card border-border flex flex-col items-center gap-4 border px-6 py-12 text-center">
              <Layers3 className="text-muted-foreground size-6" />
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">
                  No published palettes in this category yet.
                </h2>
                <p className="text-muted-foreground max-w-xl text-sm">
                  The taxonomy route exists, but the published catalog does not
                  have matching palettes for this category right now.
                </p>
              </div>
            </div>
          </PageContainer>
        </PageSection>
      ) : null}
    </>
  );
}
