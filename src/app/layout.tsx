import {
  MainRegion,
  PageShell,
  SiteFooter,
  SiteHeader
} from "@/components/layout";
import { PrivacyAnalytics } from "@/components/analytics/privacy-analytics";
import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import type { ReactNode } from "react";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sleek-colors.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sleek Colors",
    template: "%s | Sleek Colors"
  },
  description: "Curated color palettes and website color combinations.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Sleek Colors",
    description: "Curated color palettes and website color combinations.",
    url: siteUrl,
    siteName: "Sleek Colors",
    type: "website"
  },
  twitter: { card: "summary_large_image" }
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
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
        <PrivacyAnalytics />
      </body>
    </html>
  );
}
