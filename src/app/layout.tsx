import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";

import {
  MainRegion,
  PageShell,
  SiteFooter,
  SiteHeader
} from "@/components/layout";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans"
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora"
});

export const metadata: Metadata = {
  title: "Sleek Colors",
  description: "Curated color palettes and website color combinations."
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${sora.variable} h-full antialiased`}
    >
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
