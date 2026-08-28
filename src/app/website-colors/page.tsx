import { Suspense } from "react";

import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import { WebsitePaletteExplorer } from "@/components/search";
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

  return (
    <PageSection id="catalog" spacing="compact">
      <PageContainer width="full" className="flex flex-col gap-6">
        <SectionHeader
          eyebrow="Website color combinations"
          title="Browse interface-ready primary and secondary pairs."
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
  );
}
