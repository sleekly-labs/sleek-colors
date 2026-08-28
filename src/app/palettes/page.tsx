import { Suspense } from "react";

import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import { PaletteExplorerPreview } from "@/components/search";
import { createPageMetadata } from "@/lib/seo";
import { getGeneralPalettes } from "@/data";

export const metadata = createPageMetadata({
  title: "Palette Catalog",
  description: "Browse, search, and copy every published Sleek Colors palette.",
  path: "/palettes"
});

export default function PalettesPage() {
  const palettes = getGeneralPalettes("published");

  return (
    <PageSection id="catalog" spacing="compact">
      <PageContainer width="full" className="flex flex-col gap-6">
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
  );
}
