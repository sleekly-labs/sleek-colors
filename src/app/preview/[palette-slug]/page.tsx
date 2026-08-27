import Link from "next/link";
import { notFound } from "next/navigation";

import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import { WebsitePreview } from "@/components/preview";
import { buttonLinkClassName } from "@/components/ui/button";
import { getPaletteBySlug, getWebsitePalettes } from "@/data";

export function generateStaticParams() {
  return getWebsitePalettes("published").map((palette) => ({
    "palette-slug": palette.slug
  }));
}

export default async function PreviewPage({
  params
}: {
  params: Promise<{ "palette-slug": string }>;
}) {
  const { "palette-slug": slug } = await params;
  const palette = getPaletteBySlug(slug);

  if (
    !palette ||
    palette.paletteType !== "website" ||
    !palette.supportsWebsitePreview
  ) {
    notFound();
  }

  return (
    <PageSection spacing="loose">
      <PageContainer className="space-y-8">
        <SectionHeader
          eyebrow="Try on website"
          title={palette.name}
          description="See how this Primary and Secondary pairing behaves across a realistic interface."
          actions={
            <Link
              href={`/palette/${palette.slug}`}
              className={buttonLinkClassName({ variant: "outline" })}
            >
              Back to palette
            </Link>
          }
        />
        <WebsitePreview palette={palette} />
      </PageContainer>
    </PageSection>
  );
}
