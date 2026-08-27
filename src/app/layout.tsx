import type { Metadata } from "next";

import {
  MainRegion,
  PageShell,
  SiteFooter,
  SiteHeader
} from "@/components/layout";

import "./globals.css";

export const metadata: Metadata = {
  title: "Sleek Colors",
  description: "Curated color palettes and website color combinations."
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body>
        <PageShell>
          <SiteHeader />
          <MainRegion>{children}</MainRegion>
          <SiteFooter />
        </PageShell>
      </body>
    </html>
  );
}
