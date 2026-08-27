export const paletteCategories = [
  "Pastel",
  "Vibrant",
  "Dark",
  "Light",
  "Neutral",
  "Minimal",
  "Nature",
  "Ocean",
  "Sunset",
  "Earthy",
  "Retro",
  "Vintage",
  "Warm",
  "Cool",
  "Monochrome",
  "Gradient-inspired",
  "Website",
  "Bold"
] as const;

export const paletteMoods = [
  "Calm",
  "Elegant",
  "Playful",
  "Energetic",
  "Romantic",
  "Modern",
  "Luxury",
  "Professional",
  "Cozy",
  "Fresh",
  "Bold",
  "Soft",
  "Moody",
  "Futuristic"
] as const;

export const colorFamilies = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Teal",
  "Blue",
  "Purple",
  "Pink",
  "Brown",
  "Gray",
  "Black",
  "White"
] as const;

export const websitePaletteRoles = ["primary", "secondary"] as const;

export type HexColor = `#${string}`;
export type IsoDateString = string;

export type PaletteCategory = (typeof paletteCategories)[number];
export type PaletteMood = (typeof paletteMoods)[number];
export type ColorFamily = (typeof colorFamilies)[number];
export type WebsitePaletteRole = (typeof websitePaletteRoles)[number];

export type PaletteType = "general" | "website";
export type PaletteStatus = "draft" | "published";

export type PaletteColor = {
  hex: HexColor;
  name?: string;
};

export type BasePalette = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  colors: PaletteColor[];
  categories: PaletteCategory[];
  moods: PaletteMood[];
  tags: string[];
  colorFamilies: ColorFamily[];
  isFeatured: boolean;
  status: PaletteStatus;
  createdAt?: IsoDateString;
  updatedAt?: IsoDateString;
};

export type GeneralPalette = BasePalette & {
  paletteType: "general";
  primaryColor?: never;
  secondaryColor?: never;
  supportsWebsitePreview: false;
};

export type WebsitePalette = BasePalette & {
  paletteType: "website";
  primaryColor: HexColor;
  secondaryColor: HexColor;
  supportsWebsitePreview: true;
};

export type Palette = GeneralPalette | WebsitePalette;
