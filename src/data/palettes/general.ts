import type {
  ColorFamily,
  GeneralPalette,
  HexColor,
  PaletteCategory,
  PaletteMood
} from "@/types";

type GeneralPaletteVariant = {
  accentHex: HexColor;
  accentLabel: string;
  slugSuffix: string;
};

type GeneralPaletteSeries = {
  baseColors: readonly [HexColor, HexColor, HexColor, HexColor];
  bridgeHexes: readonly [HexColor, HexColor, HexColor, HexColor, HexColor];
  categories: readonly PaletteCategory[];
  colorFamilies: readonly ColorFamily[];
  description: string;
  moods: readonly PaletteMood[];
  name: string;
  slug: string;
  tags: readonly string[];
  variants: readonly [
    GeneralPaletteVariant,
    GeneralPaletteVariant,
    GeneralPaletteVariant,
    GeneralPaletteVariant,
    GeneralPaletteVariant
  ];
};

const generalPaletteSeries = [
  {
    name: "Ocean Atlas",
    slug: "ocean-atlas",
    description: "Cool marine depth for editorial and interface work.",
    baseColors: ["#0B132B", "#1C2541", "#3A506B", "#5BC0BE"],
    bridgeHexes: ["#2F6690", "#3D7EA6", "#5FA8D3", "#467599", "#61C0BF"],
    categories: ["Ocean", "Cool", "Nature"],
    moods: ["Calm", "Fresh", "Modern"],
    tags: ["ocean", "marine", "editorial", "coastal"],
    colorFamilies: ["Blue", "Teal"],
    variants: [
      { accentHex: "#6FFFE9", accentLabel: "Aqua", slugSuffix: "aqua" },
      { accentHex: "#84DCC6", accentLabel: "Reef", slugSuffix: "reef" },
      { accentHex: "#C9F9FF", accentLabel: "Foam", slugSuffix: "foam" },
      { accentHex: "#4ECDC4", accentLabel: "Tide", slugSuffix: "tide" },
      { accentHex: "#98F5E1", accentLabel: "Drift", slugSuffix: "drift" }
    ]
  },
  {
    name: "Desert Library",
    slug: "desert-library",
    description: "Earth-led neutrals for grounded brands and quiet interiors.",
    baseColors: ["#402A23", "#7A4E38", "#C08B5C", "#E7D7C1"],
    bridgeHexes: ["#B08968", "#9C6644", "#D4A373", "#BC8A5F", "#DDB892"],
    categories: ["Earthy", "Warm", "Vintage"],
    moods: ["Cozy", "Elegant", "Soft"],
    tags: ["earth", "clay", "interior", "warm"],
    colorFamilies: ["Brown", "Orange", "White"],
    variants: [
      {
        accentHex: "#F5EFE6",
        accentLabel: "Porcelain",
        slugSuffix: "porcelain"
      },
      { accentHex: "#D8B08C", accentLabel: "Dune", slugSuffix: "dune" },
      { accentHex: "#A97155", accentLabel: "Clay", slugSuffix: "clay" },
      { accentHex: "#EEC9A5", accentLabel: "Oasis", slugSuffix: "oasis" },
      { accentHex: "#C67B5C", accentLabel: "Adobe", slugSuffix: "adobe" }
    ]
  },
  {
    name: "Neon Arcade",
    slug: "neon-arcade",
    description:
      "High-contrast retro tones for posters, gaming, and campaigns.",
    baseColors: ["#1A103D", "#5C2E91", "#F72585", "#4CC9F0"],
    bridgeHexes: ["#7209B7", "#B5179E", "#560BAD", "#3A0CA3", "#4361EE"],
    categories: ["Retro", "Vibrant", "Bold"],
    moods: ["Energetic", "Playful", "Futuristic"],
    tags: ["retro", "gaming", "neon", "festival"],
    colorFamilies: ["Purple", "Pink", "Blue", "Yellow"],
    variants: [
      { accentHex: "#FEE440", accentLabel: "Laser", slugSuffix: "laser" },
      { accentHex: "#FFD166", accentLabel: "Pixel", slugSuffix: "pixel" },
      { accentHex: "#00F5D4", accentLabel: "Glitch", slugSuffix: "glitch" },
      { accentHex: "#FF9F1C", accentLabel: "Turbo", slugSuffix: "turbo" },
      { accentHex: "#C77DFF", accentLabel: "Disco", slugSuffix: "disco" }
    ]
  },
  {
    name: "Rosewater Paper",
    slug: "rosewater-paper",
    description:
      "A soft pastel stack for feminine lifestyle and beauty content.",
    baseColors: ["#FDF2F8", "#FBCFE8", "#E9D5FF", "#C4B5FD"],
    bridgeHexes: ["#F5D0FE", "#E9A8F2", "#D8B4FE", "#E0C3FC", "#F0E4FF"],
    categories: ["Pastel", "Light", "Gradient-inspired"],
    moods: ["Soft", "Romantic", "Elegant"],
    tags: ["pastel", "beauty", "pink", "lifestyle"],
    colorFamilies: ["Pink", "Purple", "White"],
    variants: [
      { accentHex: "#7C3AED", accentLabel: "Orchid", slugSuffix: "orchid" },
      { accentHex: "#A855F7", accentLabel: "Lilac", slugSuffix: "lilac" },
      { accentHex: "#F9A8D4", accentLabel: "Blush", slugSuffix: "blush" },
      { accentHex: "#DDD6FE", accentLabel: "Pearl", slugSuffix: "pearl" },
      { accentHex: "#F5E1FF", accentLabel: "Veil", slugSuffix: "veil" }
    ]
  },
  {
    name: "Charcoal Studio",
    slug: "charcoal-studio",
    description:
      "Muted dark neutrals for understated products and brand systems.",
    baseColors: ["#111827", "#374151", "#6B7280", "#A3B18A"],
    bridgeHexes: ["#4B5563", "#7C8B7A", "#5F6F65", "#9CA3AF", "#70877F"],
    categories: ["Dark", "Neutral", "Minimal"],
    moods: ["Professional", "Calm", "Moody"],
    tags: ["minimal", "quiet", "brand", "studio"],
    colorFamilies: ["Black", "Gray", "Green"],
    variants: [
      { accentHex: "#E5E7EB", accentLabel: "Stone", slugSuffix: "stone" },
      { accentHex: "#B7C9A8", accentLabel: "Sage", slugSuffix: "sage" },
      { accentHex: "#7F8C8D", accentLabel: "Steel", slugSuffix: "steel" },
      { accentHex: "#D1D5DB", accentLabel: "Fog", slugSuffix: "fog" },
      { accentHex: "#8DAA91", accentLabel: "Moss", slugSuffix: "moss" }
    ]
  },
  {
    name: "Golden Hour",
    slug: "golden-hour",
    description:
      "A glowing sunset palette for travel, food, and editorial stories.",
    baseColors: ["#7C2D12", "#C2410C", "#FB923C", "#FDE68A"],
    bridgeHexes: ["#EA580C", "#FDBA74", "#F59E0B", "#FED7AA", "#FCD34D"],
    categories: ["Sunset", "Warm", "Light"],
    moods: ["Energetic", "Fresh", "Bold"],
    tags: ["sunset", "travel", "food", "glow"],
    colorFamilies: ["Orange", "Yellow", "White", "Brown"],
    variants: [
      { accentHex: "#FFF7ED", accentLabel: "Cream", slugSuffix: "cream" },
      { accentHex: "#FFBA08", accentLabel: "Citrus", slugSuffix: "citrus" },
      { accentHex: "#FFD6A5", accentLabel: "Peach", slugSuffix: "peach" },
      { accentHex: "#FF7F11", accentLabel: "Flare", slugSuffix: "flare" },
      { accentHex: "#FFE29A", accentLabel: "Glow", slugSuffix: "glow" }
    ]
  },
  {
    name: "Forest Ledger",
    slug: "forest-ledger",
    description:
      "Calm botanical structure for product dashboards and hospitality.",
    baseColors: ["#1B4332", "#2D6A4F", "#52796F", "#84A98C"],
    bridgeHexes: ["#40916C", "#74C69D", "#52B788", "#95D5B2", "#A3B18A"],
    categories: ["Nature", "Cool", "Minimal"],
    moods: ["Calm", "Professional", "Fresh"],
    tags: ["forest", "wellness", "botanical", "product"],
    colorFamilies: ["Green", "Teal", "Gray"],
    variants: [
      { accentHex: "#CAD2C5", accentLabel: "Mist", slugSuffix: "mist" },
      { accentHex: "#95D5B2", accentLabel: "Fern", slugSuffix: "fern" },
      { accentHex: "#74C69D", accentLabel: "Juniper", slugSuffix: "juniper" },
      { accentHex: "#40916C", accentLabel: "Canopy", slugSuffix: "canopy" },
      { accentHex: "#B7E4C7", accentLabel: "Sprout", slugSuffix: "sprout" }
    ]
  },
  {
    name: "Velvet Cinema",
    slug: "velvet-cinema",
    description:
      "Rich dramatic tones for luxury brands and nighttime editorials.",
    baseColors: ["#1B0A16", "#4A1942", "#893168", "#A61E4D"],
    bridgeHexes: ["#6A1B4D", "#7B2D5E", "#C9184A", "#B56576", "#7B2CBF"],
    categories: ["Dark", "Vintage", "Bold"],
    moods: ["Luxury", "Moody", "Elegant"],
    tags: ["luxury", "cinema", "night", "editorial"],
    colorFamilies: ["Red", "Purple", "Pink", "Black"],
    variants: [
      { accentHex: "#D90368", accentLabel: "Rouge", slugSuffix: "rouge" },
      { accentHex: "#C9184A", accentLabel: "Merlot", slugSuffix: "merlot" },
      { accentHex: "#FF4D6D", accentLabel: "Garnet", slugSuffix: "garnet" },
      { accentHex: "#E56B6F", accentLabel: "Cameo", slugSuffix: "cameo" },
      { accentHex: "#9D4EDD", accentLabel: "Plum", slugSuffix: "plum" }
    ]
  },
  {
    name: "Ivory Stone",
    slug: "ivory-stone",
    description:
      "Quiet neutrals for editorial layouts, studios, and interiors.",
    baseColors: ["#F8F5F0", "#E7E0D3", "#CFC5B4", "#A89F91"],
    bridgeHexes: ["#D6CCC2", "#B7B7A4", "#C9ADA7", "#DDBEA9", "#A5A58D"],
    categories: ["Neutral", "Minimal", "Light"],
    moods: ["Elegant", "Professional", "Soft"],
    tags: ["neutral", "editorial", "stone", "interior"],
    colorFamilies: ["White", "Gray", "Brown"],
    variants: [
      { accentHex: "#6B705C", accentLabel: "Olive", slugSuffix: "olive" },
      { accentHex: "#B7B7A4", accentLabel: "Oat", slugSuffix: "oat" },
      { accentHex: "#A5A58D", accentLabel: "Flax", slugSuffix: "flax" },
      { accentHex: "#DDBEA9", accentLabel: "Shell", slugSuffix: "shell" },
      { accentHex: "#8A817C", accentLabel: "Taupe", slugSuffix: "taupe" }
    ]
  },
  {
    name: "Citrus Market",
    slug: "citrus-market",
    description:
      "Bright produce-inspired tones for packaging and playful campaigns.",
    baseColors: ["#2B9348", "#55A630", "#80B918", "#F48C06"],
    bridgeHexes: ["#AACC00", "#FFB703", "#70E000", "#FAA307", "#FF7B00"],
    categories: ["Vibrant", "Warm", "Light"],
    moods: ["Playful", "Energetic", "Fresh"],
    tags: ["citrus", "fruit", "packaging", "playful"],
    colorFamilies: ["Green", "Yellow", "Orange"],
    variants: [
      { accentHex: "#FFBA08", accentLabel: "Sun", slugSuffix: "sun" },
      { accentHex: "#FAA307", accentLabel: "Mango", slugSuffix: "mango" },
      { accentHex: "#D00000", accentLabel: "Guava", slugSuffix: "guava" },
      { accentHex: "#38B000", accentLabel: "Lime", slugSuffix: "lime" },
      { accentHex: "#FF7B00", accentLabel: "Melon", slugSuffix: "melon" }
    ]
  },
  {
    name: "Monograph Ink",
    slug: "monograph-ink",
    description:
      "Monochrome contrast for publishing systems and crisp interfaces.",
    baseColors: ["#111111", "#2B2D42", "#8D99AE", "#EDF2F4"],
    bridgeHexes: ["#495057", "#6C757D", "#ADB5BD", "#CED4DA", "#343A40"],
    categories: ["Monochrome", "Minimal", "Dark"],
    moods: ["Professional", "Moody", "Modern"],
    tags: ["monochrome", "publishing", "ink", "interface"],
    colorFamilies: ["Black", "Gray", "White"],
    variants: [
      { accentHex: "#5C677D", accentLabel: "Slate", slugSuffix: "slate" },
      { accentHex: "#6C757D", accentLabel: "Carbon", slugSuffix: "carbon" },
      { accentHex: "#ADB5BD", accentLabel: "Fog", slugSuffix: "fog" },
      { accentHex: "#CED4DA", accentLabel: "Silver", slugSuffix: "silver" },
      {
        accentHex: "#343A40",
        accentLabel: "Graphite",
        slugSuffix: "graphite"
      }
    ]
  },
  {
    name: "Aurora Signal",
    slug: "aurora-signal",
    description:
      "Synthetic glow for futuristic products and motion-heavy brands.",
    baseColors: ["#10002B", "#240046", "#5A189A", "#3C096C"],
    bridgeHexes: ["#7B2CBF", "#9D4EDD", "#C77DFF", "#4CC9F0", "#00F5D4"],
    categories: ["Gradient-inspired", "Cool", "Bold"],
    moods: ["Futuristic", "Energetic", "Modern"],
    tags: ["aurora", "motion", "future", "signal"],
    colorFamilies: ["Blue", "Purple", "Pink", "Teal"],
    variants: [
      { accentHex: "#7B2CBF", accentLabel: "Nova", slugSuffix: "nova" },
      { accentHex: "#C77DFF", accentLabel: "Prism", slugSuffix: "prism" },
      { accentHex: "#00F5D4", accentLabel: "Ion", slugSuffix: "ion" },
      { accentHex: "#4CC9F0", accentLabel: "Pulse", slugSuffix: "pulse" },
      { accentHex: "#F72585", accentLabel: "Comet", slugSuffix: "comet" }
    ]
  },
  {
    name: "Terracotta Garden",
    slug: "terracotta-garden",
    description: "Botanical warmth for artisan packaging and rustic spaces.",
    baseColors: ["#582F0E", "#7F4F24", "#936639", "#B6AD90"],
    bridgeHexes: ["#A68A64", "#CB997E", "#A4AC86", "#B08968", "#656D4A"],
    categories: ["Earthy", "Nature", "Warm"],
    moods: ["Cozy", "Fresh", "Soft"],
    tags: ["garden", "artisan", "earth", "botanical"],
    colorFamilies: ["Brown", "Green", "Orange"],
    variants: [
      { accentHex: "#A4AC86", accentLabel: "Herb", slugSuffix: "herb" },
      { accentHex: "#656D4A", accentLabel: "Olive", slugSuffix: "olive" },
      { accentHex: "#DDB892", accentLabel: "Clay", slugSuffix: "clay" },
      { accentHex: "#CB997E", accentLabel: "Bloom", slugSuffix: "bloom" },
      { accentHex: "#B08968", accentLabel: "Field", slugSuffix: "field" }
    ]
  },
  {
    name: "Frost Library",
    slug: "frost-library",
    description:
      "Cool pale structure for clean dashboards and wellness brands.",
    baseColors: ["#E0FBFC", "#C2DFE3", "#9DB4C0", "#5C6B73"],
    bridgeHexes: ["#A9D6E5", "#89C2D9", "#61A5C2", "#D6EAF8", "#BDE0FE"],
    categories: ["Cool", "Light", "Minimal"],
    moods: ["Calm", "Soft", "Professional"],
    tags: ["frost", "clean", "wellness", "dashboard"],
    colorFamilies: ["Blue", "White", "Gray", "Teal"],
    variants: [
      { accentHex: "#253237", accentLabel: "Night", slugSuffix: "night" },
      { accentHex: "#A9D6E5", accentLabel: "Ice", slugSuffix: "ice" },
      { accentHex: "#61A5C2", accentLabel: "Stream", slugSuffix: "stream" },
      { accentHex: "#D9ED92", accentLabel: "Polar", slugSuffix: "polar" },
      { accentHex: "#89C2D9", accentLabel: "Glass", slugSuffix: "glass" }
    ]
  },
  {
    name: "Electric Orchard",
    slug: "electric-orchard",
    description: "Fruity contrast for bold packaging and lively campaign work.",
    baseColors: ["#2D6A4F", "#40916C", "#95D5B2", "#FFD60A"],
    bridgeHexes: ["#52B788", "#74C69D", "#FFB703", "#70E000", "#C77DFF"],
    categories: ["Vibrant", "Nature", "Bold"],
    moods: ["Playful", "Fresh", "Bold"],
    tags: ["fruit", "orchard", "campaign", "vivid"],
    colorFamilies: ["Green", "Pink", "Yellow", "Purple"],
    variants: [
      { accentHex: "#FF4D6D", accentLabel: "Berry", slugSuffix: "berry" },
      { accentHex: "#C77DFF", accentLabel: "Orchid", slugSuffix: "orchid" },
      { accentHex: "#FFB703", accentLabel: "Citrus", slugSuffix: "citrus" },
      { accentHex: "#70E000", accentLabel: "Kiwi", slugSuffix: "kiwi" },
      { accentHex: "#9D4EDD", accentLabel: "Plum", slugSuffix: "plum" }
    ]
  },
  {
    name: "Retro Motel",
    slug: "retro-motel",
    description:
      "Sun-bleached throwback tones for posters and hospitality brands.",
    baseColors: ["#FF99C8", "#FCF6BD", "#D0F4DE", "#A9DEF9"],
    bridgeHexes: ["#E4C1F9", "#F4A261", "#2A9D8F", "#E76F51", "#FF5D8F"],
    categories: ["Retro", "Sunset", "Vintage"],
    moods: ["Playful", "Cozy", "Bold"],
    tags: ["retro", "hospitality", "poster", "vacation"],
    colorFamilies: ["Pink", "Yellow", "Teal", "Blue"],
    variants: [
      { accentHex: "#E4C1F9", accentLabel: "Cabana", slugSuffix: "cabana" },
      { accentHex: "#F4A261", accentLabel: "Palm", slugSuffix: "palm" },
      { accentHex: "#2A9D8F", accentLabel: "Pool", slugSuffix: "pool" },
      { accentHex: "#E76F51", accentLabel: "Sign", slugSuffix: "sign" },
      { accentHex: "#FF5D8F", accentLabel: "Punch", slugSuffix: "punch" }
    ]
  },
  {
    name: "Moss Archive",
    slug: "moss-archive",
    description: "Grounded greens and stone tones for quiet editorial systems.",
    baseColors: ["#283618", "#606C38", "#A3B18A", "#DAD7CD"],
    bridgeHexes: ["#7F5539", "#A98467", "#CCD5AE", "#8D99AE", "#6B705C"],
    categories: ["Nature", "Neutral", "Monochrome"],
    moods: ["Calm", "Moody", "Elegant"],
    tags: ["moss", "archive", "organic", "editorial"],
    colorFamilies: ["Green", "Brown", "Gray"],
    variants: [
      { accentHex: "#BC6C25", accentLabel: "Bark", slugSuffix: "bark" },
      { accentHex: "#7F5539", accentLabel: "Soil", slugSuffix: "soil" },
      { accentHex: "#CCD5AE", accentLabel: "Lichen", slugSuffix: "lichen" },
      { accentHex: "#8D99AE", accentLabel: "Slate", slugSuffix: "slate" },
      { accentHex: "#606C38", accentLabel: "Field", slugSuffix: "field" }
    ]
  },
  {
    name: "Powder Room",
    slug: "powder-room",
    description:
      "Soft powdery tones for beauty, stationery, and intimate brands.",
    baseColors: ["#FFF1F2", "#FCE7F3", "#EDE9FE", "#E5E7EB"],
    bridgeHexes: ["#FBCFE8", "#D8B4FE", "#DDD6FE", "#F9A8D4", "#E9D5FF"],
    categories: ["Pastel", "Minimal", "Light"],
    moods: ["Soft", "Elegant", "Romantic"],
    tags: ["beauty", "powder", "stationery", "soft"],
    colorFamilies: ["Pink", "White", "Gray", "Purple"],
    variants: [
      { accentHex: "#F9A8D4", accentLabel: "Cotton", slugSuffix: "cotton" },
      { accentHex: "#C4B5FD", accentLabel: "Mauve", slugSuffix: "mauve" },
      { accentHex: "#DDD6FE", accentLabel: "Cloud", slugSuffix: "cloud" },
      { accentHex: "#FBCFE8", accentLabel: "Macaron", slugSuffix: "macaron" },
      { accentHex: "#D8B4FE", accentLabel: "Veil", slugSuffix: "veil" }
    ]
  },
  {
    name: "Ember Forge",
    slug: "ember-forge",
    description:
      "Heat and metal contrast for strong product and industrial branding.",
    baseColors: ["#2B0A12", "#6A040F", "#9D0208", "#DC2F02"],
    bridgeHexes: ["#BC3908", "#E85D04", "#F48C06", "#6C584C", "#D00000"],
    categories: ["Warm", "Dark", "Bold"],
    moods: ["Energetic", "Moody", "Professional"],
    tags: ["ember", "industrial", "heat", "forge"],
    colorFamilies: ["Red", "Orange", "Black", "Brown"],
    variants: [
      { accentHex: "#F48C06", accentLabel: "Spark", slugSuffix: "spark" },
      { accentHex: "#E85D04", accentLabel: "Lava", slugSuffix: "lava" },
      { accentHex: "#D00000", accentLabel: "Furnace", slugSuffix: "furnace" },
      { accentHex: "#6C584C", accentLabel: "Ash", slugSuffix: "ash" },
      { accentHex: "#BC3908", accentLabel: "Rust", slugSuffix: "rust" }
    ]
  },
  {
    name: "Harbor Brass",
    slug: "harbor-brass",
    description:
      "Maritime structure with warm metal accents for premium operations.",
    baseColors: ["#0D1B2A", "#1B263B", "#415A77", "#778DA9"],
    bridgeHexes: ["#A7BED3", "#E0A458", "#C9ADA7", "#F4D35E", "#8C6A43"],
    categories: ["Ocean", "Vintage", "Cool"],
    moods: ["Professional", "Elegant", "Calm"],
    tags: ["harbor", "premium", "naval", "operations"],
    colorFamilies: ["Blue", "Gray", "Yellow", "Brown"],
    variants: [
      { accentHex: "#E0A458", accentLabel: "Brass", slugSuffix: "brass" },
      { accentHex: "#C9ADA7", accentLabel: "Dock", slugSuffix: "dock" },
      { accentHex: "#F4D35E", accentLabel: "Signal", slugSuffix: "signal" },
      { accentHex: "#A7BED3", accentLabel: "Fog", slugSuffix: "fog" },
      { accentHex: "#8C6A43", accentLabel: "Anchor", slugSuffix: "anchor" }
    ]
  },
  {
    name: "Crimson Carbon",
    slug: "crimson-carbon",
    description: "Red-led monochrome contrast for dramatic editorial systems.",
    baseColors: ["#2B0A12", "#5B1121", "#8F1D2C", "#C44536"],
    bridgeHexes: ["#B56576", "#6D071A", "#E5989B", "#A4133C", "#FF758F"],
    categories: ["Monochrome", "Dark", "Bold"],
    moods: ["Moody", "Bold", "Elegant"],
    tags: ["red", "dramatic", "editorial", "luxury"],
    colorFamilies: ["Red", "Black"],
    variants: [
      { accentHex: "#F3D9D3", accentLabel: "Ash", slugSuffix: "ash" },
      { accentHex: "#E5989B", accentLabel: "Rose", slugSuffix: "rose" },
      { accentHex: "#B56576", accentLabel: "Wine", slugSuffix: "wine" },
      { accentHex: "#6D071A", accentLabel: "Coal", slugSuffix: "coal" },
      { accentHex: "#FF758F", accentLabel: "Bloom", slugSuffix: "bloom" }
    ]
  }
] as const satisfies readonly GeneralPaletteSeries[];

const generalPaletteDate = "2026-08-27";
const generalPaletteVariantCount = 5;

export const generalPalettes = generalPaletteSeries.flatMap(
  (series, seriesIndex) =>
    series.variants.map((variant, variantIndex) => ({
      id: `palette_general_${String(
        seriesIndex * generalPaletteVariantCount + variantIndex + 1
      ).padStart(3, "0")}`,
      slug: `${series.slug}-${variant.slugSuffix}`,
      name: `${series.name} ${variant.accentLabel}`,
      description: `${series.description} ${variant.accentLabel} pushes the accent color forward.`,
      colors: [
        series.baseColors[0],
        series.baseColors[1],
        series.bridgeHexes[variantIndex],
        series.baseColors[3],
        variant.accentHex
      ].map((hex) => ({ hex })),
      categories: [...series.categories],
      moods: [...series.moods],
      tags: [...series.tags, variant.slugSuffix],
      colorFamilies: [...series.colorFamilies],
      paletteType: "general",
      supportsWebsitePreview: false,
      isFeatured: seriesIndex < 4 && variantIndex < 2,
      status: "published",
      createdAt: generalPaletteDate,
      updatedAt: generalPaletteDate
    }))
) satisfies readonly GeneralPalette[];
