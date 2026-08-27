import type { PaletteMood } from "@/types";

export type MoodDefinition = {
  slug: string;
  label: PaletteMood;
  description: string;
};

export const moodDefinitions = [
  {
    slug: "calm",
    label: "Calm",
    description: "Quiet palettes that lower visual tension and feel steady."
  },
  {
    slug: "elegant",
    label: "Elegant",
    description:
      "Refined palettes with polish, balance, and deliberate restraint."
  },
  {
    slug: "playful",
    label: "Playful",
    description:
      "Lively palettes with approachable contrast and expressive color."
  },
  {
    slug: "energetic",
    label: "Energetic",
    description:
      "Fast, high-contrast palettes that create movement and urgency."
  },
  {
    slug: "romantic",
    label: "Romantic",
    description: "Soft, emotive palettes with warmth and gentle saturation."
  },
  {
    slug: "modern",
    label: "Modern",
    description:
      "Current palettes with clean contrast and product-friendly clarity."
  },
  {
    slug: "luxury",
    label: "Luxury",
    description:
      "Premium palettes built with richness, depth, and controlled accenting."
  },
  {
    slug: "professional",
    label: "Professional",
    description:
      "Dependable palettes suited to business, SaaS, and operational interfaces."
  },
  {
    slug: "cozy",
    label: "Cozy",
    description:
      "Comforting palettes with warmth, softness, and intimate contrast."
  },
  {
    slug: "fresh",
    label: "Fresh",
    description: "Clean palettes that feel airy, crisp, and newly composed."
  },
  {
    slug: "bold",
    label: "Bold",
    description:
      "Confident palettes with distinct hierarchy and visible visual punch."
  },
  {
    slug: "soft",
    label: "Soft",
    description:
      "Gentle palettes with lowered intensity and smooth transitions."
  },
  {
    slug: "moody",
    label: "Moody",
    description:
      "Atmospheric palettes with shadow, depth, and emotionally heavy tones."
  },
  {
    slug: "futuristic",
    label: "Futuristic",
    description:
      "Forward-looking palettes with sharp contrast and synthetic brightness."
  }
] as const satisfies readonly MoodDefinition[];
