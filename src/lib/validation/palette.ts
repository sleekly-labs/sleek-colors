import type {
  GeneralPalette,
  HexColor,
  PaletteColor,
  WebsitePalette
} from "@/types";

export const generalPaletteMinColors = 3;
export const generalPaletteMaxColors = 8;
export const websitePaletteColorCount = 2;

export type PaletteValidationIssueCode =
  | "invalid-palette-type"
  | "invalid-status"
  | "invalid-slug"
  | "invalid-color-count"
  | "invalid-hex"
  | "missing-primary-color"
  | "missing-secondary-color"
  | "invalid-preview-support"
  | "missing-role-color";

export type PaletteValidationIssue = {
  code: PaletteValidationIssueCode;
  message: string;
  path: string;
};

export type ValidationResult<T> =
  { ok: true; value: T } | { ok: false; issues: PaletteValidationIssue[] };

const hexColorPattern = /^#[0-9A-F]{6}$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function normalizeHexColor(hex: string): HexColor {
  return hex.trim().toUpperCase() as HexColor;
}

export function isHexColor(value: string): value is HexColor {
  return hexColorPattern.test(value);
}

export function normalizePaletteColor(color: PaletteColor): PaletteColor {
  return {
    ...color,
    hex: normalizeHexColor(color.hex)
  };
}

export function normalizePaletteColors(colors: PaletteColor[]): PaletteColor[] {
  return colors.map(normalizePaletteColor);
}

export function normalizeWebsitePalette(
  palette: WebsitePalette
): WebsitePalette {
  return {
    ...palette,
    colors: normalizePaletteColors(palette.colors),
    primaryColor: normalizeHexColor(palette.primaryColor),
    secondaryColor: normalizeHexColor(palette.secondaryColor)
  };
}

export function validateGeneralPalette(
  palette: GeneralPalette
): ValidationResult<GeneralPalette> {
  const normalizedPalette: GeneralPalette = {
    ...palette,
    colors: normalizePaletteColors(palette.colors)
  };

  const issues: PaletteValidationIssue[] = [];

  if (normalizedPalette.paletteType !== "general") {
    issues.push({
      code: "invalid-palette-type",
      message: 'General palette must set `paletteType` to `"general"`.',
      path: "paletteType"
    });
  }

  if (
    normalizedPalette.status !== "draft" &&
    normalizedPalette.status !== "published"
  ) {
    issues.push({
      code: "invalid-status",
      message: 'Palette status must be `"draft"` or `"published"`.',
      path: "status"
    });
  }

  if (!slugPattern.test(normalizedPalette.slug)) {
    issues.push({
      code: "invalid-slug",
      message:
        "Palette slug must use lowercase letters, numbers, and hyphens only.",
      path: "slug"
    });
  }

  if (
    normalizedPalette.colors.length < generalPaletteMinColors ||
    normalizedPalette.colors.length > generalPaletteMaxColors
  ) {
    issues.push({
      code: "invalid-color-count",
      message: `General palettes must contain ${generalPaletteMinColors}-${generalPaletteMaxColors} colors.`,
      path: "colors"
    });
  }

  normalizedPalette.colors.forEach((color, index) => {
    if (!isHexColor(color.hex)) {
      issues.push({
        code: "invalid-hex",
        message: "Palette colors must use uppercase 6-digit HEX values.",
        path: `colors[${index}].hex`
      });
    }
  });

  if (issues.length > 0) {
    return { ok: false, issues };
  }

  return { ok: true, value: normalizedPalette };
}

export function validateWebsitePalette(
  palette: WebsitePalette
): ValidationResult<WebsitePalette> {
  const normalizedPalette = normalizeWebsitePalette(palette);
  const issues: PaletteValidationIssue[] = [];

  if (normalizedPalette.paletteType !== "website") {
    issues.push({
      code: "invalid-palette-type",
      message: 'Website palette must set `paletteType` to `"website"`.',
      path: "paletteType"
    });
  }

  if (
    normalizedPalette.status !== "draft" &&
    normalizedPalette.status !== "published"
  ) {
    issues.push({
      code: "invalid-status",
      message: 'Palette status must be `"draft"` or `"published"`.',
      path: "status"
    });
  }

  if (!slugPattern.test(normalizedPalette.slug)) {
    issues.push({
      code: "invalid-slug",
      message:
        "Palette slug must use lowercase letters, numbers, and hyphens only.",
      path: "slug"
    });
  }

  if (normalizedPalette.colors.length !== websitePaletteColorCount) {
    issues.push({
      code: "invalid-color-count",
      message: `Website palettes must contain exactly ${websitePaletteColorCount} colors.`,
      path: "colors"
    });
  }

  normalizedPalette.colors.forEach((color, index) => {
    if (!isHexColor(color.hex)) {
      issues.push({
        code: "invalid-hex",
        message: "Palette colors must use uppercase 6-digit HEX values.",
        path: `colors[${index}].hex`
      });
    }
  });

  if (!normalizedPalette.primaryColor) {
    issues.push({
      code: "missing-primary-color",
      message: "Website palettes must define `primaryColor`.",
      path: "primaryColor"
    });
  } else if (!isHexColor(normalizedPalette.primaryColor)) {
    issues.push({
      code: "invalid-hex",
      message:
        "Website palette `primaryColor` must use an uppercase 6-digit HEX value.",
      path: "primaryColor"
    });
  }

  if (!normalizedPalette.secondaryColor) {
    issues.push({
      code: "missing-secondary-color",
      message: "Website palettes must define `secondaryColor`.",
      path: "secondaryColor"
    });
  } else if (!isHexColor(normalizedPalette.secondaryColor)) {
    issues.push({
      code: "invalid-hex",
      message:
        "Website palette `secondaryColor` must use an uppercase 6-digit HEX value.",
      path: "secondaryColor"
    });
  }

  if (normalizedPalette.supportsWebsitePreview !== true) {
    issues.push({
      code: "invalid-preview-support",
      message: "Website palettes must set `supportsWebsitePreview` to `true`.",
      path: "supportsWebsitePreview"
    });
  }

  const colorSet = new Set(normalizedPalette.colors.map((color) => color.hex));

  if (
    normalizedPalette.primaryColor &&
    !colorSet.has(normalizedPalette.primaryColor)
  ) {
    issues.push({
      code: "missing-role-color",
      message: "`primaryColor` must also exist in the main `colors` array.",
      path: "primaryColor"
    });
  }

  if (
    normalizedPalette.secondaryColor &&
    !colorSet.has(normalizedPalette.secondaryColor)
  ) {
    issues.push({
      code: "missing-role-color",
      message: "`secondaryColor` must also exist in the main `colors` array.",
      path: "secondaryColor"
    });
  }

  if (issues.length > 0) {
    return { ok: false, issues };
  }

  return { ok: true, value: normalizedPalette };
}
