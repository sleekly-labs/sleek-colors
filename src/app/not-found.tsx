import Link from "next/link";
import { ArrowLeft, Search, Shuffle } from "lucide-react";

import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import { buttonLinkClassName } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageSection spacing="loose">
      <PageContainer className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
        <div className="flex flex-col gap-6">
          <SectionHeader
            eyebrow="Not found"
            title="This page does not exist in the palette library."
            description="The link may be wrong, the palette may no longer be published, or the route has no matching content."
            actions={
              <div className="flex flex-wrap gap-3">
                <Link href="/" className={buttonLinkClassName({ size: "lg" })}>
                  <ArrowLeft />
                  <span>Back to home</span>
                </Link>
                <Link
                  href="/search"
                  className={buttonLinkClassName({
                    variant: "outline",
                    size: "lg"
                  })}
                >
                  <Search />
                  <span>Search palettes</span>
                </Link>
              </div>
            }
          />
        </div>

        <div className="bg-card rounded-card border-border grid gap-3 border p-5">
          <div className="flex items-center gap-3 rounded-md border px-3 py-3">
            <span className="bg-muted inline-flex size-9 items-center justify-center rounded-md">
              <Shuffle className="size-4" />
            </span>
            <div>
              <p className="text-sm font-medium">Try another route</p>
              <p className="text-muted-foreground text-sm">
                Open the catalog, search directly, or jump to a random palette.
              </p>
            </div>
          </div>
          {[
            { href: "/palettes", label: "All palettes" },
            { href: "/website-colors", label: "Website colors" },
            { href: "/random", label: "Random palette" }
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:bg-muted focus-visible:bg-muted flex items-center justify-between rounded-md border px-4 py-3 text-sm font-medium transition-colors"
            >
              <span>{item.label}</span>
              <ArrowLeft className="size-4 rotate-180" />
            </Link>
          ))}
        </div>
      </PageContainer>
    </PageSection>
  );
}
