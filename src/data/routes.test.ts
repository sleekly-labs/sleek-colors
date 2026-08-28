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
});
