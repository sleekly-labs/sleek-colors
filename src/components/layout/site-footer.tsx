import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
  },
  {
    title: "Support",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/contact", label: "Contact" }
    ]
  }
] as const;

type SiteFooterProps = {
  className?: string;
};

function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer className={cn("border-t", className)}>
      <PageContainer className="flex flex-col gap-10 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="flex max-w-xl flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Link href="/" className="flex w-28 sm:w-32">
                <Image
                  src="/images/full-logo.png"
                  alt="Sleek Colors"
                  width={1448}
                  height={1086}
                  sizes="(min-width: 640px) 128px, 112px"
                  className="h-auto w-full"
                />
              </Link>
              <p className="text-muted-foreground text-sm">
                Curated palette library for product, brand, editorial, and
                website color decisions.
              </p>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
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
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://sleekly-tech.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground focus-visible:ring-ring rounded-sm font-medium transition-colors outline-none focus-visible:ring-3"
            >
              Sleekly
            </a>
            . All Rights Reserved.
          </p>
          <nav aria-label="Social links" className="flex items-center gap-3">
            <a
              href="https://github.com/sleekly-labs/sleek-colors"
              target="_blank"
              rel="noreferrer"
              aria-label="Sleek Colors on GitHub (opens in a new tab)"
              className="hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-2 rounded-md py-1 text-sm font-medium transition-colors outline-none focus-visible:ring-3"
            >
              <span>GitHub</span>
              <ExternalLink className="size-3.5" />
            </a>
          </nav>
        </div>
      </PageContainer>
    </footer>
  );
}

export { SiteFooter };
