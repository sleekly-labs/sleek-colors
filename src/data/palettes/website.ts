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

const additionalWebsitePalettes = [
  {
    id: "palette_website_031",
    slug: "cyber-grape-acid-lime",
    name: "Cyber Grape & Acid Lime",
    description:
      "A vivid digital pairing with electric contrast for bold interfaces.",
    colors: [{ hex: "#6D28D9" }, { hex: "#D7FF00" }],
    categories: ["Website", "Vibrant"],
    moods: ["Futuristic", "Bold"],
    tags: ["cyber-grape", "acid-lime", "neon", "technology"],
    colorFamilies: ["Purple", "Green"],
    paletteType: "website",
    primaryColor: "#6D28D9",
    secondaryColor: "#D7FF00",
    supportsWebsitePreview: true,
    isFeatured: true,
    status: "published",
    createdAt: websitePaletteDate,
    updatedAt: websitePaletteDate
  },
  {
    id: "palette_website_032",
    slug: "raspberry-pale-sky",
    name: "Raspberry & Pale Sky",
    description:
      "A confident berry accent softened by an airy sky support tone.",
    colors: [{ hex: "#C2185B" }, { hex: "#E0F2FE" }],
    categories: ["Website", "Vibrant"],
    moods: ["Romantic", "Fresh"],
    tags: ["raspberry", "pale-sky", "berry", "editorial"],
    colorFamilies: ["Pink", "Blue"],
    paletteType: "website",
    primaryColor: "#C2185B",
    secondaryColor: "#E0F2FE",
    supportsWebsitePreview: true,
    isFeatured: true,
    status: "published",
    createdAt: websitePaletteDate,
    updatedAt: websitePaletteDate
  },
  {
    id: "palette_website_033",
    slug: "quantum-blue-ice-glass",
    name: "Quantum Blue & Ice Glass",
    description: "A crisp blue system with a cool, luminous support color.",
    colors: [{ hex: "#2457FF" }, { hex: "#DFF7FF" }],
    categories: ["Website", "Bold"],
    moods: ["Futuristic", "Modern"],
    tags: ["quantum-blue", "ice-glass", "saas", "digital"],
    colorFamilies: ["Blue", "Teal"],
    paletteType: "website",
    primaryColor: "#2457FF",
    secondaryColor: "#DFF7FF",
    supportsWebsitePreview: true,
    isFeatured: true,
    status: "published",
    createdAt: websitePaletteDate,
    updatedAt: websitePaletteDate
  },
  {
    id: "palette_website_034",
    slug: "deep-graphite-lime-compute",
    name: "Deep Graphite & Lime Compute",
    description:
      "A dense graphite base energized by a high-visibility lime signal.",
    colors: [{ hex: "#1F2329" }, { hex: "#B6FF2E" }],
    categories: ["Website", "Minimal"],
    moods: ["Futuristic", "Bold"],
    tags: ["deep-graphite", "lime-compute", "developer", "dark-ui"],
    colorFamilies: ["Black", "Green"],
    paletteType: "website",
    primaryColor: "#1F2329",
    secondaryColor: "#B6FF2E",
    supportsWebsitePreview: true,
    isFeatured: true,
    status: "published",
    createdAt: websitePaletteDate,
    updatedAt: websitePaletteDate
  },
  {
    id: "palette_website_035",
    slug: "blueberry-cream-soda",
    name: "Blueberry & Cream Soda",
    description:
      "A grounded blueberry anchor paired with a warm, inviting cream.",
    colors: [{ hex: "#243B8F" }, { hex: "#FFF0C9" }],
    categories: ["Website", "Minimal"],
    moods: ["Calm", "Elegant"],
    tags: ["blueberry", "cream-soda", "hospitality", "trust"],
    colorFamilies: ["Blue", "Yellow"],
    paletteType: "website",
    primaryColor: "#243B8F",
    secondaryColor: "#FFF0C9",
    supportsWebsitePreview: true,
    isFeatured: true,
    status: "published",
    createdAt: websitePaletteDate,
    updatedAt: websitePaletteDate
  },
  {
    id: "palette_website_036",
    slug: "cyber-teal-aqua-foam",
    name: "Cyber Teal & Aqua Foam",
    description:
      "A deep teal foundation with a bright aquatic lift for modern products.",
    colors: [{ hex: "#03313A" }, { hex: "#8FFFE0" }],
    categories: ["Website", "Ocean"],
    moods: ["Fresh", "Futuristic"],
    tags: ["cyber-teal", "aqua-foam", "ocean", "product"],
    colorFamilies: ["Teal", "Green"],
    paletteType: "website",
    primaryColor: "#03313A",
    secondaryColor: "#8FFFE0",
    supportsWebsitePreview: true,
    isFeatured: true,
    status: "published",
    createdAt: websitePaletteDate,
    updatedAt: websitePaletteDate
  },
  {
    id: "palette_website_037",
    slug: "neon-orange-porcelain",
    name: "Neon Orange & Porcelain",
    description:
      "A high-energy orange signal balanced by a clean porcelain canvas.",
    colors: [{ hex: "#FF6115" }, { hex: "#FFFCF4" }],
    categories: ["Website", "Vibrant"],
    moods: ["Energetic", "Fresh"],
    tags: ["neon-orange", "porcelain", "campaign", "commerce"],
    colorFamilies: ["Orange", "White"],
    paletteType: "website",
    primaryColor: "#FF6115",
    secondaryColor: "#FFFCF4",
    supportsWebsitePreview: true,
    isFeatured: true,
    status: "published",
    createdAt: websitePaletteDate,
    updatedAt: websitePaletteDate
  },
  {
    id: "palette_website_038",
    slug: "forest-graphite-acid-mint",
    name: "Forest Graphite & Acid Mint",
    description:
      "An organic graphite pairing with a sharp mint signal for fresh brands.",
    colors: [{ hex: "#18251D" }, { hex: "#B7FF72" }],
    categories: ["Website", "Nature"],
    moods: ["Fresh", "Modern"],
    tags: ["forest-graphite", "acid-mint", "nature", "sustainable"],
    colorFamilies: ["Green", "Black"],
    paletteType: "website",
    primaryColor: "#18251D",
    secondaryColor: "#B7FF72",
    supportsWebsitePreview: true,
    isFeatured: true,
    status: "published",
    createdAt: websitePaletteDate,
    updatedAt: websitePaletteDate
  },
  {
    id: "palette_website_039",
    slug: "signal-violet-mist-gray",
    name: "Signal Violet & Mist Gray",
    description: "A saturated violet lead softened by a quiet, adaptable gray.",
    colors: [{ hex: "#7A35FF" }, { hex: "#F0F2F5" }],
    categories: ["Website", "Minimal"],
    moods: ["Modern", "Professional"],
    tags: ["signal-violet", "mist-gray", "software", "interface"],
    colorFamilies: ["Purple", "Gray"],
    paletteType: "website",
    primaryColor: "#7A35FF",
    secondaryColor: "#F0F2F5",
    supportsWebsitePreview: true,
    isFeatured: true,
    status: "published",
    createdAt: websitePaletteDate,
    updatedAt: websitePaletteDate
  },
  {
    id: "palette_website_040",
    slug: "inkberry-peach",
    name: "Inkberry & Peach",
    description: "A rich inkberry anchor with a warm peach counterpoint.",
    colors: [{ hex: "#1A0B2E" }, { hex: "#FFB7A5" }],
    categories: ["Website", "Vintage"],
    moods: ["Romantic", "Elegant"],
    tags: ["inkberry", "peach", "beauty", "editorial"],
    colorFamilies: ["Purple", "Orange"],
    paletteType: "website",
    primaryColor: "#1A0B2E",
    secondaryColor: "#FFB7A5",
    supportsWebsitePreview: true,
    isFeatured: true,
    status: "published",
    createdAt: websitePaletteDate,
    updatedAt: websitePaletteDate
  },
  {
    id: "palette_website_041",
    slug: "prompt-blue-ai-green",
    name: "Prompt Blue & AI Green",
    description:
      "A focused ink blue paired with an optimistic green signal for AI products.",
    colors: [{ hex: "#0B132B" }, { hex: "#39FF88" }],
    categories: ["Website", "Bold"],
    moods: ["Futuristic", "Bold"],
    tags: ["prompt-blue", "ai-green", "ai", "technology"],
    colorFamilies: ["Blue", "Green"],
    paletteType: "website",
    primaryColor: "#0B132B",
    secondaryColor: "#39FF88",
    supportsWebsitePreview: true,
    isFeatured: true,
    status: "published",
    createdAt: websitePaletteDate,
    updatedAt: websitePaletteDate
  },
  {
    id: "palette_website_042",
    slug: "clay-brown-soft-butter",
    name: "Clay Brown & Soft Butter",
    description:
      "A tactile clay brown grounded by a warm, optimistic butter tone.",
    colors: [{ hex: "#6B352A" }, { hex: "#FFF1A6" }],
    categories: ["Website", "Earthy"],
    moods: ["Cozy", "Elegant"],
    tags: ["clay-brown", "soft-butter", "craft", "hospitality"],
    colorFamilies: ["Brown", "Yellow"],
    paletteType: "website",
    primaryColor: "#6B352A",
    secondaryColor: "#FFF1A6",
    supportsWebsitePreview: true,
    isFeatured: true,
    status: "published",
    createdAt: websitePaletteDate,
    updatedAt: websitePaletteDate
  }
] as const satisfies readonly WebsitePalette[];

export const websitePalettes: readonly WebsitePalette[] = [
  ...additionalWebsitePalettes,
  ...websitePaletteSeries.flatMap((series, seriesIndex) =>
    series.variants.map(
      (variant, variantIndex) =>
        ({
          id: `palette_website_${String(
            seriesIndex * websitePaletteVariantCount + variantIndex + 1
          ).padStart(3, "0")}`,
          slug: `${series.slug}-${variant.slugSuffix}`,
          name: `${series.name} ${variant.primaryLabel} & ${variant.secondaryLabel}`,
          description: `${series.description} ${variant.primaryLabel} leads while ${variant.secondaryLabel} supports.`,
          colors: [{ hex: variant.primaryHex }, { hex: variant.secondaryHex }],
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
        }) satisfies WebsitePalette
    )
  )
];
