import { generalPalettes } from "@/data/palettes";
import { categoryDefinitions, moodDefinitions } from "@/data/taxonomy";
import {
  validatePaletteCatalog,
  validateGeneralPalette,
  validateWebsitePalette
} from "@/lib/validation";
import type {
  GeneralPalette,
  Palette,
  PaletteStatus,
  WebsitePalette
} from "@/types";

import { websitePalettes } from "./palettes";
import type { CategoryDefinition } from "./taxonomy/categories";
import type { MoodDefinition } from "./taxonomy/moods";

export type PaletteCatalog = {
  palettes: readonly Palette[];
  generalPalettes: readonly GeneralPalette[];
  websitePalettes: readonly WebsitePalette[];
  categories: readonly CategoryDefinition[];
  moods: readonly MoodDefinition[];
};

function assertValidGeneralPalette(palette: GeneralPalette): GeneralPalette {
  const result = validateGeneralPalette(palette);

  if (!result.ok) {
    throw new Error(
      `Invalid general palette "${palette.slug}": ${result.issues
        .map((issue) => `${issue.path} ${issue.code}`)
        .join(", ")}`
    );
  }

  return result.value;
}

function assertValidWebsitePalette(palette: WebsitePalette): WebsitePalette {
  const result = validateWebsitePalette(palette);

  if (!result.ok) {
    throw new Error(
      `Invalid website palette "${palette.slug}": ${result.issues
        .map((issue) => `${issue.path} ${issue.code}`)
        .join(", ")}`
    );
  }

  return result.value;
}

const normalizedGeneralPalettes = generalPalettes.map(
  assertValidGeneralPalette
);
const normalizedWebsitePalettes = websitePalettes.map(
  assertValidWebsitePalette
);

const catalogValidationResult = validatePaletteCatalog({
  generalPalettes: normalizedGeneralPalettes,
  websitePalettes: normalizedWebsitePalettes,
  categories: categoryDefinitions,
  moods: moodDefinitions
});

if (!catalogValidationResult.ok) {
  throw new Error(
    `Invalid palette catalog: ${catalogValidationResult.issues
      .map((issue) => `${issue.path} ${issue.code}`)
      .join(", ")}`
  );
}

const paletteCatalog = {
  palettes: catalogValidationResult.value,
  generalPalettes: normalizedGeneralPalettes,
  websitePalettes: normalizedWebsitePalettes,
  categories: categoryDefinitions,
  moods: moodDefinitions
} as const satisfies PaletteCatalog;

export function getPaletteCatalog(): PaletteCatalog {
  return paletteCatalog;
}

export function getPalettes(status?: PaletteStatus): readonly Palette[] {
  if (!status) {
    return paletteCatalog.palettes;
  }

  return paletteCatalog.palettes.filter((palette) => palette.status === status);
}

export function getGeneralPalettes(
  status?: PaletteStatus
): readonly GeneralPalette[] {
  if (!status) {
    return paletteCatalog.generalPalettes;
  }

  return paletteCatalog.generalPalettes.filter(
    (palette) => palette.status === status
  );
}

export function getWebsitePalettes(
  status?: PaletteStatus
): readonly WebsitePalette[] {
  if (!status) {
    return paletteCatalog.websitePalettes;
  }

  return paletteCatalog.websitePalettes.filter(
    (palette) => palette.status === status
  );
}

export function getFeaturedPalettes(): readonly Palette[] {
  return paletteCatalog.palettes.filter((palette) => palette.isFeatured);
}

export function getPaletteBySlug(slug: string): Palette | undefined {
  return paletteCatalog.palettes.find((palette) => palette.slug === slug);
}

export function getRelatedPalettes(
  palette: Palette,
  limit = 3
): readonly Palette[] {
  if (limit <= 0) {
    return [];
  }

  return paletteCatalog.palettes
    .filter(
      (candidate) =>
        candidate.status === "published" && candidate.slug !== palette.slug
    )
    .map((candidate) => {
      const categoryMatches = candidate.categories.filter((category) =>
        palette.categories.includes(category)
      ).length;
      const moodMatches = candidate.moods.filter((mood) =>
        palette.moods.includes(mood)
      ).length;
      const tagMatches = candidate.tags.filter((tag) =>
        palette.tags.includes(tag)
      ).length;
      const familyMatches = candidate.colorFamilies.filter((family) =>
        palette.colorFamilies.includes(family)
      ).length;

      return {
        candidate,
        score:
          categoryMatches * 4 + moodMatches * 3 + tagMatches * 2 + familyMatches
      };
    })
    .filter(({ score }) => score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.candidate.slug.localeCompare(right.candidate.slug)
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function getCategoryDefinitions(): readonly CategoryDefinition[] {
  return paletteCatalog.categories;
}

export function getMoodDefinitions(): readonly MoodDefinition[] {
  return paletteCatalog.moods;
}
