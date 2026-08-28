import { Shuffle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { buttonLinkClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { PageContainer } from "./primitives";

const primaryLinks = [
  { href: "/palettes", label: "Palettes" },
  { href: "/website-colors", label: "Website colors" },
  { href: "/categories", label: "Categories" },
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
      <PageContainer width="full" className="flex flex-col gap-2 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <Link href="/" className="flex w-20 shrink-0 sm:w-24 lg:w-28">
              <Image
                src="/images/full-logo.png"
                alt="Sleek Colors"
                width={1448}
                height={1086}
                priority
                quality={85}
                sizes="(min-width: 1024px) 144px, (min-width: 640px) 128px, 112px"
                className="h-auto w-full"
              />
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
        </nav>
      </PageContainer>
    </header>
  );
}

export { SiteHeader };
