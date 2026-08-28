import Link from "next/link";

import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import {
  getCategoryDefinitions,
  getGeneralPalettes,
  getWebsitePalettes
} from "@/data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Categories",
  description: "Browse Sleek Colors palettes by creative direction.",
  path: "/categories"
});

export default function CategoriesPage() {
  const categories = getCategoryDefinitions();
  const generalPalettes = getGeneralPalettes("published");
  const websitePalettes = getWebsitePalettes("published");

  return (
    <PageSection spacing="loose">
      <PageContainer className="flex flex-col gap-10">
        <SectionHeader
          eyebrow="Categories"
          title="Start from the kind of palette you need."
          description="Use a creative direction as your first filter, then refine the results in the palette library."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count =
              generalPalettes.filter((palette) =>
                palette.categories.includes(category.label)
              ).length +
              websitePalettes.filter((palette) =>
                palette.categories.includes(category.label)
              ).length;

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="rounded-card border-border hover:bg-muted focus-visible:bg-muted flex min-h-32 flex-col justify-between border p-4 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{category.label}</span>
                  <span className="text-muted-foreground text-xs">
                    {count} {count === 1 ? "palette" : "palettes"}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-6">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>
      </PageContainer>
    </PageSection>
  );
}
