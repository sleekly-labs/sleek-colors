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
const ogImage = new URL("/opengraph-image.png", siteUrl).toString();
const twitterImage = new URL("/twitter-image.png", siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sleek Colors",
    template: "%s | Sleek Colors"
  },
  description: "Curated color palettes and website color combinations.",
  alternates: { canonical: siteUrl },
  keywords: [
    "color palettes",
    "website color combinations",
    "UI color palette",
    "product design colors"
  ],
  applicationName: "Sleek Colors",
  authors: [{ name: "Sleekly" }],
  creator: "Sleekly",
  publisher: "Sleekly",
  category: "Design tools",
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/images/favicon_io/favicon-32x32.png", sizes: "32x32" },
      { url: "/images/favicon_io/favicon-16x16.png", sizes: "16x16" }
    ],
    apple: "/images/favicon_io/apple-touch-icon.png"
  },
  manifest: "/images/favicon_io/site.webmanifest",
  openGraph: {
    title: "Sleek Colors",
    description: "Curated color palettes and website color combinations.",
    url: siteUrl,
    siteName: "Sleek Colors",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1280,
        height: 630,
        alt: "Sleek Colors curated color palettes"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleek Colors",
    description: "Curated color palettes and website color combinations.",
    images: [twitterImage]
  }
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
