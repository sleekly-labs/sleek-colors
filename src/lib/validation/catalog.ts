import { colorFamilies } from "@/types";
import type {
  ColorFamily,
  GeneralPalette,
  Palette,
  PaletteCategory,
  PaletteMood,
  WebsitePalette
} from "@/types";

import type { CategoryDefinition } from "@/data/taxonomy/categories";
import type { MoodDefinition } from "@/data/taxonomy/moods";

export type CatalogValidationIssueCode =
  | "duplicate-palette-id"
  | "duplicate-palette-slug"
  | "missing-category-definition"
  | "missing-mood-definition"
  | "missing-color-family-definition"
  | "missing-website-category";

export type CatalogValidationIssue = {
  code: CatalogValidationIssueCode;
  message: string;
  path: string;
};

export type CatalogValidationInput = {
  generalPalettes: readonly GeneralPalette[];
  websitePalettes: readonly WebsitePalette[];
  categories: readonly CategoryDefinition[];
  moods: readonly MoodDefinition[];
};

export type CatalogValidationResult =
  | { ok: true; value: readonly Palette[] }
  | { ok: false; issues: CatalogValidationIssue[] };

function pushDuplicateIssues(
  values: readonly string[],
  buildIssue: (value: string, firstIndex: number, nextIndex: number) => void
) {
  const firstSeenByValue = new Map<string, number>();

  values.forEach((value, index) => {
    const firstIndex = firstSeenByValue.get(value);

    if (firstIndex === undefined) {
      firstSeenByValue.set(value, index);
      return;
    }

    buildIssue(value, firstIndex, index);
  });
}

function validatePaletteTaxonomyValues(
  palette: Palette,
  categoryLabels: ReadonlySet<PaletteCategory>,
  moodLabels: ReadonlySet<PaletteMood>,
  issues: CatalogValidationIssue[]
) {
  palette.categories.forEach((category, categoryIndex) => {
    if (!categoryLabels.has(category)) {
      issues.push({
        code: "missing-category-definition",
        message: `Palette category "${category}" is not defined in taxonomy.`,
        path: `${palette.slug}.categories[${categoryIndex}]`
      });
    }
  });

  palette.moods.forEach((mood, moodIndex) => {
    if (!moodLabels.has(mood)) {
      issues.push({
        code: "missing-mood-definition",
        message: `Palette mood "${mood}" is not defined in taxonomy.`,
        path: `${palette.slug}.moods[${moodIndex}]`
      });
    }
  });
}

function validatePaletteColorFamilies(
  palette: Palette,
  issues: CatalogValidationIssue[]
) {
  const supportedColorFamilies = new Set<ColorFamily>(colorFamilies);

  palette.colorFamilies?.forEach((colorFamily, colorFamilyIndex) => {
    if (!supportedColorFamilies.has(colorFamily)) {
      issues.push({
        code: "missing-color-family-definition",
        message: `Palette color family "${colorFamily}" is not supported.`,
        path: `${palette.slug}.colorFamilies[${colorFamilyIndex}]`
      });
    }
  });
}

function validateWebsitePaletteInvariants(
  palette: WebsitePalette,
  issues: CatalogValidationIssue[]
) {
  if (!palette.categories.includes("Website")) {
    issues.push({
      code: "missing-website-category",
      message: 'Website palettes must include the "Website" category.',
      path: `${palette.slug}.categories`
    });
  }
}

export function validatePaletteCatalog(
  input: CatalogValidationInput
): CatalogValidationResult {
  const palettes = [...input.generalPalettes, ...input.websitePalettes];
  const issues: CatalogValidationIssue[] = [];

  pushDuplicateIssues(
    palettes.map((palette) => palette.id),
    (duplicateId, firstIndex, nextIndex) => {
      issues.push({
        code: "duplicate-palette-id",
        message: `Palette id "${duplicateId}" must be unique.`,
        path: `palettes[${firstIndex}], palettes[${nextIndex}]`
      });
    }
  );

  pushDuplicateIssues(
    palettes.map((palette) => palette.slug),
    (duplicateSlug, firstIndex, nextIndex) => {
      issues.push({
        code: "duplicate-palette-slug",
        message: `Palette slug "${duplicateSlug}" must be unique.`,
        path: `palettes[${firstIndex}], palettes[${nextIndex}]`
      });
    }
  );

  const categoryLabels = new Set<PaletteCategory>(
    input.categories.map((category) => category.label)
  );
  const moodLabels = new Set<PaletteMood>(
    input.moods.map((mood) => mood.label)
  );

  palettes.forEach((palette) => {
    validatePaletteTaxonomyValues(palette, categoryLabels, moodLabels, issues);
    validatePaletteColorFamilies(palette, issues);
  });

  input.websitePalettes.forEach((palette) => {
    validateWebsitePaletteInvariants(palette, issues);
  });

  if (issues.length > 0) {
    return { ok: false, issues };
  }

  return { ok: true, value: palettes };
}
