import { describe, expect, it } from "vitest";

import { getPaletteBySlug, getPalettes, getWebsitePalettes } from ".";

describe("published route coverage", () => {
  it("resolves every published palette and preview slug", () => {
    const published = getPalettes("published");
    const websitePalettes = getWebsitePalettes("published");

    expect(
      published.filter((palette) => palette.paletteType === "general").length
    ).toBeGreaterThanOrEqual(100);
    expect(websitePalettes.length).toBeGreaterThanOrEqual(30);
    expect(
      published.every(
        (palette) => getPaletteBySlug(palette.slug)?.status === "published"
      )
    ).toBe(true);
    expect(
      websitePalettes.every(
        (palette) =>
          palette.supportsWebsitePreview &&
          getPaletteBySlug(palette.slug)?.paletteType === "website"
      )
    ).toBe(true);
    expect(getPalettes("draft")).toHaveLength(0);
  });

  it("includes the featured launch website combinations", () => {
    const websitePalettes = getWebsitePalettes("published");
    const requestedSlugs = [
      "cyber-grape-acid-lime",
      "raspberry-pale-sky",
      "quantum-blue-ice-glass",
      "deep-graphite-lime-compute",
      "blueberry-cream-soda",
      "cyber-teal-aqua-foam",
      "neon-orange-porcelain",
      "forest-graphite-acid-mint",
      "signal-violet-mist-gray",
      "inkberry-peach",
      "prompt-blue-ai-green",
      "clay-brown-soft-butter"
    ];

    expect(
      requestedSlugs.every((slug) =>
        websitePalettes.some(
          (palette) => palette.slug === slug && palette.isFeatured
        )
      )
    ).toBe(true);
  });
});
