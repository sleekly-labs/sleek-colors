export {
  generalPaletteMaxColors,
  generalPaletteMinColors,
  isHexColor,
  normalizeHexColor,
  normalizePaletteColor,
  normalizePaletteColors,
  normalizeWebsitePalette,
  validateGeneralPalette,
  validateWebsitePalette,
  websitePaletteColorCount
} from "./palette";
export { validatePaletteCatalog } from "./catalog";
export type {
  CatalogValidationIssue,
  CatalogValidationIssueCode,
  CatalogValidationInput,
  CatalogValidationResult
} from "./catalog";
export type {
  PaletteValidationIssue,
  PaletteValidationIssueCode,
  ValidationResult
} from "./palette";
