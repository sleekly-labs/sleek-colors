import Link from "next/link";
import { Search, Shuffle } from "lucide-react";

import { buttonLinkClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { PageContainer } from "./primitives";

const primaryLinks = [
  { href: "/palettes", label: "Explore" },
  { href: "/category/pastel", label: "Categories" },
  { href: "/random", label: "Random" },
  { href: "/about", label: "About" }
] as const;

type SiteHeaderProps = {
  className?: string;
};

function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40 border-b backdrop-blur",
        className
      )}
    >
      <PageContainer className="flex flex-col gap-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <Link
              href="/"
              className="flex min-w-0 flex-col"
              aria-label="Sleek Colors home"
            >
              <span className="text-base font-semibold tracking-normal">
                Sleek Colors
              </span>
              <span className="text-muted-foreground text-xs">
                Curated palette library
              </span>
            </Link>
            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 lg:flex"
            >
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/random"
              className={buttonLinkClassName({
                variant: "outline",
                size: "sm"
              })}
            >
              <Shuffle />
              <span>Random</span>
            </Link>
            <Link
              href="/search"
              className={buttonLinkClassName({ size: "sm" })}
            >
              <Search />
              <span>Search</span>
            </Link>
          </div>
        </div>
        <nav
          aria-label="Mobile primary"
          className="-mx-1 flex items-center gap-1 overflow-x-auto pb-1 lg:hidden"
        >
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors"
          >
            Search
          </Link>
        </nav>
      </PageContainer>
    </header>
  );
}

export { SiteHeader };
