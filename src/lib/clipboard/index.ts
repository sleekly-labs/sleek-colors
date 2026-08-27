import { normalizeHexColor } from "@/lib/validation";

export type ClipboardCopyResult =
  { ok: true; value: string } | { ok: false; value: string; error: Error };

export async function copyHexToClipboard(
  value: string
): Promise<ClipboardCopyResult> {
  const normalizedValue = normalizeHexColor(value);

  try {
    await navigator.clipboard.writeText(normalizedValue);
    return { ok: true, value: normalizedValue };
  } catch (error) {
    return {
      ok: false,
      value: normalizedValue,
      error:
        error instanceof Error ? error : new Error("Clipboard copy failed.")
    };
  }
}

export async function copyPaletteToClipboard(
  values: readonly string[]
): Promise<ClipboardCopyResult> {
  const normalizedValue = values.map(normalizeHexColor).join("\n");

  try {
    await navigator.clipboard.writeText(normalizedValue);
    return { ok: true, value: normalizedValue };
  } catch (error) {
    return {
      ok: false,
      value: normalizedValue,
      error:
        error instanceof Error ? error : new Error("Clipboard copy failed.")
    };
  }
}
