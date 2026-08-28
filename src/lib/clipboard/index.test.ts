import { describe, expect, it, vi } from "vitest";

import { copyPaletteToClipboard } from ".";

describe("clipboard formatting", () => {
  it("copies normalized HEX values as newline-separated text", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });

    const result = await copyPaletteToClipboard(["#a1b2c3", " #d4e5f6 "]);

    expect(result).toEqual({ ok: true, value: "#A1B2C3\n#D4E5F6" });
    expect(writeText).toHaveBeenCalledWith("#A1B2C3\n#D4E5F6");
  });
});
