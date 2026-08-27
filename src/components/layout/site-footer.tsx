import Link from "next/link";

import { getGeneralPalettes, getWebsitePalettes } from "@/data";
import { cn } from "@/lib/utils";

import { PageContainer } from "./primitives";

const footerGroups = [
  {
    title: "Browse",
    links: [
      { href: "/palettes", label: "All palettes" },
      { href: "/website-colors", label: "Website colors" },
      { href: "/category/pastel", label: "Categories" }
    ]
  },
  {
    title: "Discover",
    links: [
      { href: "/search", label: "Search" },
      { href: "/random", label: "Random" },
      { href: "/about", label: "About" }
    ]
  }
] as const;

type SiteFooterProps = {
  className?: string;
};

function SiteFooter({ className }: SiteFooterProps) {
  const generalCount = getGeneralPalettes("published").length;
  const websiteCount = getWebsitePalettes("published").length;

  return (
    <footer className={cn("border-t", className)}>
      <PageContainer className="flex flex-col gap-10 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="flex max-w-xl flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Link href="/" className="text-base font-semibold">
                Sleek Colors
              </Link>
              <p className="text-muted-foreground text-sm">
                Curated palette library for product, brand, editorial, and
                website color decisions.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="bg-muted text-muted-foreground rounded-full px-3 py-1.5">
                {generalCount} general palettes
              </span>
              <span className="bg-muted text-muted-foreground rounded-full px-3 py-1.5">
                {websiteCount} website combinations
              </span>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {footerGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold">{group.title}</h2>
                <nav
                  aria-label={group.title}
                  className="flex flex-col items-start gap-1"
                >
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground rounded-md py-1 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
        <div className="text-muted-foreground flex flex-col gap-2 border-t pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>Sleek Colors MVP</p>
          <p>No social or contact links until real destinations exist.</p>
        </div>
      </PageContainer>
    </footer>
  );
}

export { SiteFooter };
