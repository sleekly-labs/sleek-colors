import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sleek-colors.vercel.app";

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
    openGraph: {
      title,
      description,
      url,
      siteName: "Sleek Colors",
      type: "website",
      ...(imagePath
        ? { images: [{ url: new URL(imagePath, siteUrl).toString() }] }
        : {})
    },
    twitter: { card: "summary" }
  };
}

export { siteUrl };
