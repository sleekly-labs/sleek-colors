"use client";

import { useMemo, useState } from "react";

import { GeneralPaletteGrid } from "@/components/palette";
import type {
  ColorFamily,
  GeneralPalette,
  PaletteCategory,
  PaletteMood
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
  { label: "Random", value: "random" }
] as const satisfies readonly BrowseSortOption[];

type PaletteExplorerPreviewProps = {
  initialVisibleCount?: number;
  loadMoreStep?: number;
  palettes: readonly GeneralPalette[];
};

function PaletteExplorerPreview({
  initialVisibleCount = 6,
  loadMoreStep = 3,
  palettes
}: PaletteExplorerPreviewProps) {
  const [query, setQuery] = useState("");
  const [sortValue, setSortValue] =
    useState<(typeof sortOptions)[number]["value"]>("featured");
  const [selectedCategory, setSelectedCategory] =
    useState<PaletteCategory | null>(null);
  const [selectedMood, setSelectedMood] = useState<PaletteMood | null>(null);
  const [selectedColorFamily, setSelectedColorFamily] =
    useState<ColorFamily | null>(null);
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const filterGroups = useMemo<readonly BrowseFilterGroup[]>(
    () => [
      {
        label: "Category",
        value: selectedCategory,
        options: Array.from(
          new Set(palettes.flatMap((palette) => palette.categories))
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
    [palettes, selectedCategory, selectedColorFamily, selectedMood]
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
          ...palette.colors.map((color) => color.hex)
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesCategory =
        !selectedCategory || palette.categories.includes(selectedCategory);
      const matchesMood = !selectedMood || palette.moods.includes(selectedMood);
      const matchesColorFamily =
        !selectedColorFamily ||
        palette.colorFamilies.includes(selectedColorFamily);

      return (
        matchesQuery && matchesCategory && matchesMood && matchesColorFamily
      );
    });

    if (sortValue === "newest") {
      return [...results].sort((left, right) =>
        (right.createdAt ?? "").localeCompare(left.createdAt ?? "")
      );
    }

    if (sortValue === "random") {
      return [...results].sort((left, right) =>
        left.slug.localeCompare(right.slug)
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
    selectedCategory,
    selectedColorFamily,
    selectedMood,
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
    setSelectedCategory(null);
    setSelectedMood(null);
    setSelectedColorFamily(null);
    setVisibleCount(initialVisibleCount);
  }

  function handleFilterChange(groupLabel: string, value: string | null) {
    if (groupLabel === "Category") {
      setSelectedCategory(value as PaletteCategory | null);
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
        label="palettes"
        totalCount={filteredPalettes.length}
        visibleCount={visiblePalettes.length}
      />
      {visiblePalettes.length > 0 ? (
        <>
          <GeneralPaletteGrid palettes={visiblePalettes} />
          <LoadMoreControl
            remainingCount={remainingCount}
            onLoadMore={() => setVisibleCount((count) => count + loadMoreStep)}
          />
        </>
      ) : (
        <EmptyState
          title="No palettes match current filters."
          description="Try broader search terms or clear filters to inspect more palette sets."
          onReset={resetControls}
        />
      )}
    </div>
  );
}

export { PaletteExplorerPreview };
