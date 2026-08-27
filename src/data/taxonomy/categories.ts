import type { PaletteCategory } from "@/types";

export type CategoryDefinition = {
  slug: string;
  label: PaletteCategory;
  description: string;
};

export const categoryDefinitions = [
  {
    slug: "pastel",
    label: "Pastel",
    description: "Soft, airy palettes with gentle contrast and light tonality."
  },
  {
    slug: "vibrant",
    label: "Vibrant",
    description:
      "High-energy palettes with saturated colors and strong presence."
  },
  {
    slug: "dark",
    label: "Dark",
    description:
      "Low-light palettes built around deep tones and dramatic contrast."
  },
  {
    slug: "light",
    label: "Light",
    description: "Bright palettes with lifted neutrals and open visual weight."
  },
  {
    slug: "neutral",
    label: "Neutral",
    description:
      "Balanced palettes shaped by versatile grays, creams, and muted tones."
  },
  {
    slug: "minimal",
    label: "Minimal",
    description:
      "Restrained palettes designed for clean interfaces and quiet branding."
  },
  {
    slug: "nature",
    label: "Nature",
    description:
      "Organic palettes inspired by foliage, earth, sky, and natural materials."
  },
  {
    slug: "ocean",
    label: "Ocean",
    description:
      "Blue and teal-led palettes influenced by water and coastal depth."
  },
  {
    slug: "sunset",
    label: "Sunset",
    description:
      "Warm transition palettes shaped by dusk, glow, and atmospheric fades."
  },
  {
    slug: "earthy",
    label: "Earthy",
    description:
      "Grounded palettes featuring clay, soil, stone, and natural warmth."
  },
  {
    slug: "retro",
    label: "Retro",
    description:
      "Throwback palettes with nostalgic contrast and playful combinations."
  },
  {
    slug: "vintage",
    label: "Vintage",
    description:
      "Aged, softened palettes that feel archival, classic, and worn-in."
  },
  {
    slug: "warm",
    label: "Warm",
    description:
      "Palettes centered on reds, oranges, yellows, and inviting neutrals."
  },
  {
    slug: "cool",
    label: "Cool",
    description:
      "Palettes centered on blues, teals, greens, and crisp supporting tones."
  },
  {
    slug: "monochrome",
    label: "Monochrome",
    description:
      "Single-family palettes using value shifts for structure and refinement."
  },
  {
    slug: "gradient-inspired",
    label: "Gradient-inspired",
    description:
      "Palettes selected to feel blended, luminous, and transition-friendly."
  },
  {
    slug: "website",
    label: "Website",
    description:
      "Two-color combinations curated specifically for primary and secondary UI roles."
  },
  {
    slug: "bold",
    label: "Bold",
    description:
      "Assertive palettes designed to stand out quickly in digital products."
  }
] as const satisfies readonly CategoryDefinition[];
