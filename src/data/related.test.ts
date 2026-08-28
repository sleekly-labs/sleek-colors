import { describe, expect, it } from "vitest";

import { getPaletteBySlug, getRelatedPalettes } from ".";

describe("related palettes", () => {
  it("returns stable, published matches and excludes the source", () => {
    const source = getPaletteBySlug("ocean-atlas-aqua");
    expect(source).toBeDefined();

    const related = getRelatedPalettes(source!, 3);

    expect(related).toHaveLength(3);
    expect(related.every((palette) => palette.status === "published")).toBe(
      true
    );
    expect(related.some((palette) => palette.slug === source?.slug)).toBe(
      false
    );
    expect(related.map((palette) => palette.slug)).toEqual([
      "ocean-atlas-drift",
      "ocean-atlas-foam",
      "ocean-atlas-reef"
    ]);
  });
});
