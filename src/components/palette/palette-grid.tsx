import { cn } from "@/lib/utils";
import type { GeneralPalette, WebsitePalette } from "@/types";

import { GeneralPaletteCard } from "./general-palette-card";
import { WebsitePaletteCard } from "./website-palette-card";

type GeneralPaletteGridProps = {
  className?: string;
  palettes: readonly GeneralPalette[];
};

type WebsitePaletteGridProps = {
  className?: string;
  palettes: readonly WebsitePalette[];
};

function GeneralPaletteGrid({ className, palettes }: GeneralPaletteGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6",
        className
      )}
    >
      {palettes.map((palette) => (
        <GeneralPaletteCard
          key={palette.id}
          palette={palette}
          detailHref={`/palette/${palette.slug}`}
        />
      ))}
    </div>
  );
}

function WebsitePaletteGrid({ className, palettes }: WebsitePaletteGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6",
        className
      )}
    >
      {palettes.map((palette) => (
        <WebsitePaletteCard
          key={palette.id}
          palette={palette}
          previewHref={`/preview/${palette.slug}`}
        />
      ))}
    </div>
  );
}

export { GeneralPaletteGrid, WebsitePaletteGrid };
