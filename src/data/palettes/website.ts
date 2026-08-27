import type {
  ColorFamily,
  HexColor,
  PaletteCategory,
  PaletteMood,
  WebsitePalette
} from "@/types";

type WebsitePaletteVariant = {
  primaryHex: HexColor;
  primaryLabel: string;
  secondaryHex: HexColor;
  secondaryLabel: string;
  slugSuffix: string;
};

type WebsitePaletteSeries = {
  categories: readonly [PaletteCategory, PaletteCategory];
  colorFamilies: readonly [ColorFamily, ColorFamily];
  description: string;
  moods: readonly [PaletteMood, PaletteMood];
  name: string;
  slug: string;
  tags: readonly string[];
  variants: readonly [
    WebsitePaletteVariant,
    WebsitePaletteVariant,
    WebsitePaletteVariant,
    WebsitePaletteVariant,
    WebsitePaletteVariant
  ];
};

const websitePaletteSeries = [
  {
    name: "SaaS Signal",
    slug: "saas-signal",
    description: "Sharp interface pairs for product, SaaS, and dashboards.",
    categories: ["Website", "Bold"],
    moods: ["Modern", "Professional"],
    tags: ["saas", "website", "dashboard", "product"],
    colorFamilies: ["Blue", "Yellow"],
    variants: [
      {
        primaryHex: "#192BC2",
        primaryLabel: "Electric Indigo",
        secondaryHex: "#F4B942",
        secondaryLabel: "Warm Gold",
        slugSuffix: "indigo-gold"
      },
      {
        primaryHex: "#1D4ED8",
        primaryLabel: "Signal Blue",
        secondaryHex: "#F59E0B",
        secondaryLabel: "Amber",
        slugSuffix: "blue-amber"
      },
      {
        primaryHex: "#0F3D91",
        primaryLabel: "Panel Blue",
        secondaryHex: "#FFD166",
        secondaryLabel: "Soft Gold",
        slugSuffix: "panel-gold"
      },
      {
        primaryHex: "#2563EB",
        primaryLabel: "Action Blue",
        secondaryHex: "#EAB308",
        secondaryLabel: "Status Yellow",
        slugSuffix: "action-yellow"
      },
      {
        primaryHex: "#1E40AF",
        primaryLabel: "Deep Link",
        secondaryHex: "#FBBF24",
        secondaryLabel: "Highlight Gold",
        slugSuffix: "link-gold"
      }
    ]
  },
  {
    name: "Calm Studio",
    slug: "calm-studio",
    description:
      "Quiet natural pairs for wellness, hospitality, and lifestyle.",
    categories: ["Website", "Nature"],
    moods: ["Calm", "Elegant"],
    tags: ["wellness", "boutique", "clean", "lifestyle"],
    colorFamilies: ["Teal", "White"],
    variants: [
      {
        primaryHex: "#1F5D50",
        primaryLabel: "Forest Teal",
        secondaryHex: "#F6F1E9",
        secondaryLabel: "Soft Cream",
        slugSuffix: "forest-cream"
      },
      {
        primaryHex: "#256D5A",
        primaryLabel: "Juniper",
        secondaryHex: "#F8F5F0",
        secondaryLabel: "Ivory",
        slugSuffix: "juniper-ivory"
      },
      {
        primaryHex: "#2A6F62",
        primaryLabel: "Harbor Teal",
        secondaryHex: "#EDEDE9",
        secondaryLabel: "Cloud Linen",
        slugSuffix: "harbor-linen"
      },
      {
        primaryHex: "#0F766E",
        primaryLabel: "Lagoon",
        secondaryHex: "#FAF7F2",
        secondaryLabel: "Shell White",
        slugSuffix: "lagoon-shell"
      },
      {
        primaryHex: "#3B7A6B",
        primaryLabel: "Garden Teal",
        secondaryHex: "#F3EFE7",
        secondaryLabel: "Stone Cream",
        slugSuffix: "garden-cream"
      }
    ]
  },
  {
    name: "Toolframe",
    slug: "toolframe",
    description:
      "Restrained working pairs for operational tools and dense UIs.",
    categories: ["Website", "Minimal"],
    moods: ["Professional", "Fresh"],
    tags: ["tool", "minimal", "product", "operations"],
    colorFamilies: ["Black", "Green"],
    variants: [
      {
        primaryHex: "#1E293B",
        primaryLabel: "Slate Charcoal",
        secondaryHex: "#6EE7B7",
        secondaryLabel: "Signal Mint",
        slugSuffix: "charcoal-mint"
      },
      {
        primaryHex: "#111827",
        primaryLabel: "Graphite",
        secondaryHex: "#34D399",
        secondaryLabel: "Fresh Mint",
        slugSuffix: "graphite-mint"
      },
      {
        primaryHex: "#0F172A",
        primaryLabel: "Night Slate",
        secondaryHex: "#A7F3D0",
        secondaryLabel: "Pale Mint",
        slugSuffix: "night-mint"
      },
      {
        primaryHex: "#334155",
        primaryLabel: "Steel Slate",
        secondaryHex: "#4ADE80",
        secondaryLabel: "Green Signal",
        slugSuffix: "steel-green"
      },
      {
        primaryHex: "#1F2937",
        primaryLabel: "Ink Gray",
        secondaryHex: "#86EFAC",
        secondaryLabel: "Soft Lime",
        slugSuffix: "ink-lime"
      }
    ]
  },
  {
    name: "Editorial Velvet",
    slug: "editorial-velvet",
    description:
      "Fashion and beauty pairs with richer contrast and softer support.",
    categories: ["Website", "Vintage"],
    moods: ["Luxury", "Romantic"],
    tags: ["fashion", "beauty", "editorial", "luxury"],
    colorFamilies: ["Purple", "Pink"],
    variants: [
      {
        primaryHex: "#5B214A",
        primaryLabel: "Velvet Plum",
        secondaryHex: "#F5D0D8",
        secondaryLabel: "Blush Silk",
        slugSuffix: "plum-blush"
      },
      {
        primaryHex: "#6D214F",
        primaryLabel: "Mulberry",
        secondaryHex: "#F8D7DA",
        secondaryLabel: "Rose Cloud",
        slugSuffix: "mulberry-rose"
      },
      {
        primaryHex: "#7C2D6E",
        primaryLabel: "Orchid Velvet",
        secondaryHex: "#FBCFE8",
        secondaryLabel: "Petal Pink",
        slugSuffix: "orchid-petal"
      },
      {
        primaryHex: "#4C1D95",
        primaryLabel: "Violet Ink",
        secondaryHex: "#F9A8D4",
        secondaryLabel: "Cosmetic Pink",
        slugSuffix: "violet-cosmetic"
      },
      {
        primaryHex: "#701A75",
        primaryLabel: "Berry Plum",
        secondaryHex: "#F5B5CF",
        secondaryLabel: "Powder Rose",
        slugSuffix: "berry-powder"
      }
    ]
  },
  {
    name: "Civic Current",
    slug: "civic-current",
    description:
      "Dependable public-facing pairs for education, finance, and services.",
    categories: ["Website", "Cool"],
    moods: ["Professional", "Modern"],
    tags: ["finance", "education", "service", "trust"],
    colorFamilies: ["Blue", "White"],
    variants: [
      {
        primaryHex: "#1D3557",
        primaryLabel: "Civic Navy",
        secondaryHex: "#F1FAEE",
        secondaryLabel: "Paper White",
        slugSuffix: "navy-paper"
      },
      {
        primaryHex: "#1E3A8A",
        primaryLabel: "Trust Blue",
        secondaryHex: "#EFF6FF",
        secondaryLabel: "Cloud Blue",
        slugSuffix: "trust-cloud"
      },
      {
        primaryHex: "#0F4C81",
        primaryLabel: "Harbor Blue",
        secondaryHex: "#F8FAFC",
        secondaryLabel: "Mist White",
        slugSuffix: "harbor-mist"
      },
      {
        primaryHex: "#1D4ED8",
        primaryLabel: "Current Blue",
        secondaryHex: "#E0F2FE",
        secondaryLabel: "Ice Tint",
        slugSuffix: "current-ice"
      },
      {
        primaryHex: "#1F3B73",
        primaryLabel: "Policy Blue",
        secondaryHex: "#F9FAFB",
        secondaryLabel: "Signal White",
        slugSuffix: "policy-white"
      }
    ]
  },
  {
    name: "Playline",
    slug: "playline",
    description:
      "Lively startup and campaign pairs with brighter secondary energy.",
    categories: ["Website", "Vibrant"],
    moods: ["Playful", "Bold"],
    tags: ["startup", "campaign", "marketing", "bright"],
    colorFamilies: ["Pink", "Orange"],
    variants: [
      {
        primaryHex: "#DB2777",
        primaryLabel: "Punch Pink",
        secondaryHex: "#FB923C",
        secondaryLabel: "Apricot",
        slugSuffix: "pink-apricot"
      },
      {
        primaryHex: "#E11D48",
        primaryLabel: "Signal Rose",
        secondaryHex: "#F97316",
        secondaryLabel: "Bright Orange",
        slugSuffix: "rose-orange"
      },
      {
        primaryHex: "#C026D3",
        primaryLabel: "Electric Magenta",
        secondaryHex: "#FDBA74",
        secondaryLabel: "Soft Peach",
        slugSuffix: "magenta-peach"
      },
      {
        primaryHex: "#EC4899",
        primaryLabel: "Candy Pink",
        secondaryHex: "#F59E0B",
        secondaryLabel: "Sun Amber",
        slugSuffix: "candy-amber"
      },
      {
        primaryHex: "#BE185D",
        primaryLabel: "Berry Pop",
        secondaryHex: "#FF7F50",
        secondaryLabel: "Coral",
        slugSuffix: "berry-coral"
      }
    ]
  }
] as const satisfies readonly WebsitePaletteSeries[];

const websitePaletteDate = "2026-08-27";
const websitePaletteVariantCount = 5;

export const websitePalettes = websitePaletteSeries.flatMap(
  (series, seriesIndex) =>
    series.variants.map((variant, variantIndex) => ({
      id: `palette_website_${String(
        seriesIndex * websitePaletteVariantCount + variantIndex + 1
      ).padStart(3, "0")}`,
      slug: `${series.slug}-${variant.slugSuffix}`,
      name: `${series.name} ${variant.primaryLabel} & ${variant.secondaryLabel}`,
      description: `${series.description} ${variant.primaryLabel} leads while ${variant.secondaryLabel} supports.`,
      colors: [
        { hex: variant.primaryHex, name: variant.primaryLabel },
        { hex: variant.secondaryHex, name: variant.secondaryLabel }
      ],
      categories: [...series.categories],
      moods: [...series.moods],
      tags: [...series.tags, variant.slugSuffix],
      colorFamilies: [...series.colorFamilies],
      paletteType: "website",
      primaryColor: variant.primaryHex,
      secondaryColor: variant.secondaryHex,
      supportsWebsitePreview: true,
      isFeatured: seriesIndex < 3 && variantIndex < 2,
      status: "published",
      createdAt: websitePaletteDate,
      updatedAt: websitePaletteDate
    }))
) satisfies readonly WebsitePalette[];
