import { Layers3 } from "lucide-react";
import { notFound } from "next/navigation";

import { GeneralPaletteGrid, WebsitePaletteGrid } from "@/components/palette";
import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
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
      {generalPalettes.length > 0 ? (
        <PageSection spacing="compact">
          <PageContainer width="full" className="flex flex-col gap-6">
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
          <PageContainer width="full" className="flex flex-col gap-6">
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
          <PageContainer width="full">
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
