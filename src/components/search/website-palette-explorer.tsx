"use client";

import { useMemo, useState } from "react";

import { WebsitePaletteGrid } from "@/components/palette";
import type {
  ColorFamily,
  PaletteCategory,
  PaletteMood,
  WebsitePalette
} from "@/types";

import {
  PaletteBrowseControls,
  type BrowseFilterGroup,
  type BrowseSortOption
} from "./browse-controls";
import { EmptyState, LoadMoreControl, ResultsSummary } from "./browse-results";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Name", value: "name" }
] as const satisfies readonly BrowseSortOption[];

type WebsitePaletteExplorerProps = {
  initialVisibleCount?: number;
  loadMoreStep?: number;
  palettes: readonly WebsitePalette[];
};

function WebsitePaletteExplorer({
  initialVisibleCount = 12,
  loadMoreStep = 12,
  palettes
}: WebsitePaletteExplorerProps) {
  const [query, setQuery] = useState("");
  const [sortValue, setSortValue] =
    useState<(typeof sortOptions)[number]["value"]>("featured");
  const [selectedStyle, setSelectedStyle] = useState<PaletteCategory | null>(
    null
  );
  const [selectedMood, setSelectedMood] = useState<PaletteMood | null>(null);
  const [selectedColorFamily, setSelectedColorFamily] =
    useState<ColorFamily | null>(null);
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const filterGroups = useMemo<readonly BrowseFilterGroup[]>(
    () => [
      {
        label: "Style",
        value: selectedStyle,
        options: Array.from(
          new Set(
            palettes.flatMap((palette) =>
              palette.categories.filter((category) => category !== "Website")
            )
          )
        )
          .slice(0, 6)
          .map((value) => ({ label: value, value }))
      },
      {
        label: "Mood",
        value: selectedMood,
        options: Array.from(
          new Set(palettes.flatMap((palette) => palette.moods))
        )
          .slice(0, 6)
          .map((value) => ({ label: value, value }))
      },
      {
        label: "Color family",
        value: selectedColorFamily,
        options: Array.from(
          new Set(palettes.flatMap((palette) => palette.colorFamilies))
        )
          .slice(0, 6)
          .map((value) => ({ label: value, value }))
      }
    ],
    [palettes, selectedColorFamily, selectedMood, selectedStyle]
  );

  const filteredPalettes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const results = palettes.filter((palette) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          palette.name,
          palette.description,
          ...palette.tags,
          ...palette.categories,
          ...palette.moods,
          ...palette.colorFamilies,
          ...palette.colors.map((color) => color.name ?? ""),
          palette.primaryColor,
          palette.secondaryColor
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesStyle =
        !selectedStyle || palette.categories.includes(selectedStyle);
      const matchesMood = !selectedMood || palette.moods.includes(selectedMood);
      const matchesColorFamily =
        !selectedColorFamily ||
        palette.colorFamilies.includes(selectedColorFamily);

      return matchesQuery && matchesStyle && matchesMood && matchesColorFamily;
    });

    if (sortValue === "newest") {
      return [...results].sort((left, right) =>
        (right.createdAt ?? "").localeCompare(left.createdAt ?? "")
      );
    }

    if (sortValue === "name") {
      return [...results].sort((left, right) =>
        left.name.localeCompare(right.name)
      );
    }

    return [...results].sort((left, right) => {
      if (left.isFeatured !== right.isFeatured) {
        return left.isFeatured ? -1 : 1;
      }

      return left.name.localeCompare(right.name);
    });
  }, [
    palettes,
    query,
    selectedColorFamily,
    selectedMood,
    selectedStyle,
    sortValue
  ]);

  const visiblePalettes = filteredPalettes.slice(0, visibleCount);
  const remainingCount = Math.max(
    filteredPalettes.length - visiblePalettes.length,
    0
  );

  function resetControls() {
    setQuery("");
    setSortValue("featured");
    setSelectedStyle(null);
    setSelectedMood(null);
    setSelectedColorFamily(null);
    setVisibleCount(initialVisibleCount);
  }

  function handleFilterChange(groupLabel: string, value: string | null) {
    if (groupLabel === "Style") {
      setSelectedStyle(value as PaletteCategory | null);
    }

    if (groupLabel === "Mood") {
      setSelectedMood(value as PaletteMood | null);
    }

    if (groupLabel === "Color family") {
      setSelectedColorFamily(value as ColorFamily | null);
    }

    setVisibleCount(initialVisibleCount);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setVisibleCount(initialVisibleCount);
  }

  function handleSortChange(value: string) {
    setSortValue(value as (typeof sortOptions)[number]["value"]);
  }

  return (
    <div className="flex flex-col gap-6">
      <PaletteBrowseControls
        query={query}
        onQueryChange={handleQueryChange}
        sortValue={sortValue}
        sortOptions={sortOptions}
        filterGroups={filterGroups}
        onFilterChange={handleFilterChange}
        onClearFilters={resetControls}
        onSortChange={handleSortChange}
      />
      <ResultsSummary
        label="website color combinations"
        totalCount={filteredPalettes.length}
        visibleCount={visiblePalettes.length}
      />
      {visiblePalettes.length > 0 ? (
        <>
          <WebsitePaletteGrid palettes={visiblePalettes} />
          <LoadMoreControl
            remainingCount={remainingCount}
            onLoadMore={() => setVisibleCount((count) => count + loadMoreStep)}
          />
        </>
      ) : (
        <EmptyState
          title="No website color combinations match current filters."
          description="Try broader search terms or clear filters to inspect more interface-ready pairs."
          onReset={resetControls}
        />
      )}
    </div>
  );
}

export { WebsitePaletteExplorer };
