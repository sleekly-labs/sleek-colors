import { describe, expect, it } from "vitest";

import { normalizeHexColor, validateGeneralPalette } from "./palette";

describe("palette validation", () => {
  it("normalizes HEX values to uppercase", () => {
    expect(normalizeHexColor("  #a1b2c3 ")).toBe("#A1B2C3");
  });

  it("rejects general palettes outside the supported color count", () => {
    const result = validateGeneralPalette({
      id: "test",
      slug: "test",
      name: "Test",
      colors: [{ hex: "#A1B2C3" }, { hex: "#B1C2D3" }],
      categories: ["Minimal"],
      moods: ["Modern"],
      tags: [],
      colorFamilies: ["Blue"],
      isFeatured: false,
      status: "published",
      paletteType: "general",
      supportsWebsitePreview: false
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues.map((issue) => issue.code)).toContain(
        "invalid-color-count"
      );
    }
  });
});
