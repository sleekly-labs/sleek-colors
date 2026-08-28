import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import {
  GeneralPaletteGrid,
  PaletteDetailContent,
  WebsitePaletteGrid
} from "@/components/palette";
import { buttonLinkClassName } from "@/components/ui/button";
import { getPaletteBySlug, getPalettes, getRelatedPalettes } from "@/data";
import { createPageMetadata, siteUrl } from "@/lib/seo";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getPalettes("published").map((palette) => ({
    slug: palette.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const palette = getPaletteBySlug(slug);

  if (!palette || palette.status !== "published") {
    return {};
  }

  return createPageMetadata({
    title: palette.name,
    description:
      palette.description ?? "Explore and copy this curated color palette.",
    path: `/palette/${palette.slug}`
  });
}

export default async function PalettePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const palette = getPaletteBySlug(slug);

  if (!palette || palette.status !== "published") {
    notFound();
  }

  const relatedPalettes = getRelatedPalettes(palette);
  const relatedGeneralPalettes = relatedPalettes.filter(
    (relatedPalette) => relatedPalette.paletteType === "general"
  );
  const relatedWebsitePalettes = relatedPalettes.filter(
    (relatedPalette) => relatedPalette.paletteType === "website"
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: palette.name,
    description: palette.description,
    url: new URL(`/palette/${palette.slug}`, siteUrl).toString(),
    keywords: [...palette.categories, ...palette.moods, ...palette.tags],
    color: palette.colors.map((color) => color.hex),
    additionalProperty:
      palette.paletteType === "website"
        ? [
            {
              "@type": "PropertyValue",
              name: "Primary color",
              value: palette.primaryColor
            },
            {
              "@type": "PropertyValue",
              name: "Secondary color",
              value: palette.secondaryColor
            }
          ]
        : undefined
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageSection spacing="loose" className="border-b">
        <PageContainer className="flex flex-col gap-6">
          <SectionHeader
            eyebrow={
              palette.paletteType === "website"
                ? "Website palette"
                : "General palette"
            }
            title={palette.name}
            description={
              palette.description ??
              "Curated palette detail view with direct copy actions."
            }
            actions={
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/palettes"
                  className={buttonLinkClassName({ variant: "outline" })}
                >
                  <span>All palettes</span>
                </Link>
                <Link
                  href="/random"
                  className={buttonLinkClassName({ size: "default" })}
                >
                  <span>Random palette</span>
                  <ArrowRight />
                </Link>
              </div>
            }
          />
        </PageContainer>
      </PageSection>

      <PageSection spacing="compact">
        <PageContainer>
          <PaletteDetailContent palette={palette} />
        </PageContainer>
      </PageSection>

      {relatedGeneralPalettes.length > 0 ||
      relatedWebsitePalettes.length > 0 ? (
        <PageSection spacing="compact" className="border-t">
          <PageContainer className="flex flex-col gap-8">
            <SectionHeader
              eyebrow="Keep exploring"
              title="Related palettes"
              description="Curated by shared categories, moods, tags, and color families."
            />
            {relatedGeneralPalettes.length > 0 ? (
              <GeneralPaletteGrid palettes={relatedGeneralPalettes} />
            ) : null}
            {relatedWebsitePalettes.length > 0 ? (
              <WebsitePaletteGrid palettes={relatedWebsitePalettes} />
            ) : null}
          </PageContainer>
        </PageSection>
      ) : null}
    </>
  );
}
