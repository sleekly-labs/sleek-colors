import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sleek-colors.vercel.app";
const defaultImage = new URL("/opengraph-image.png", siteUrl).toString();
const defaultTwitterImage = new URL("/twitter-image.png", siteUrl).toString();

type PageMetadataOptions = {
  description: string;
  imagePath?: string;
  path: string;
  title: string;
};

export function createPageMetadata({
  description,
  imagePath,
  path,
  title
}: PageMetadataOptions): Metadata {
  const url = new URL(path, siteUrl).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: [
      "color palettes",
      "website color combinations",
      "UI color palette",
      "product design colors"
    ],
    authors: [{ name: "Sleekly" }],
    creator: "Sleekly",
    publisher: "Sleekly",
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: "Sleek Colors",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: imagePath
            ? new URL(imagePath, siteUrl).toString()
            : defaultImage,
          width: 1280,
          height: 630,
          alt: `${title} - Sleek Colors`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultTwitterImage]
    }
  };
}

export { defaultImage, defaultTwitterImage, siteUrl };
