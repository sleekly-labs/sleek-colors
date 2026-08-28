import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import {
  getCategoryDefinitions,
  getGeneralPalettes,
  getWebsitePalettes
} from "@/data";
import { createPageMetadata } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

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
            const categoryPalettes = [
              ...generalPalettes,
              ...websitePalettes
            ].filter((palette) => palette.categories.includes(category.label));
            const count = categoryPalettes.length;
            const swatches = Array.from(
              new Set(
                categoryPalettes.flatMap((palette) =>
                  palette.colors.map((color) => color.hex)
                )
              )
            ).slice(0, 4);

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group bg-card rounded-card border-border hover:border-primary/40 focus-visible:ring-primary relative flex min-h-56 flex-col justify-between overflow-hidden border shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:ring-2 focus-visible:outline-none"
              >
                <div className="grid h-16 grid-cols-4">
                  {(swatches.length > 0
                    ? swatches
                    : ["#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b"]
                  ).map((hex, index) => (
                    <span
                      key={`${hex}-${index}`}
                      style={{ backgroundColor: hex }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div className="flex flex-1 flex-col justify-between gap-6 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">
                        Collection
                      </p>
                      <h2 className="mt-2 text-xl font-semibold tracking-tight">
                        {category.label}
                      </h2>
                    </div>
                    <span className="bg-muted text-muted-foreground inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium">
                      {count} {count === 1 ? "palette" : "palettes"}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-muted-foreground max-w-[28ch] text-sm leading-6">
                      {category.description}
                    </p>
                    <span className="text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color] duration-200 ease-out">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </PageContainer>
    </PageSection>
  );
}
