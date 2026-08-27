"use client";

import { useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

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
  initialQuery?: string;
  palettes: readonly GeneralPalette[];
  searchParamKeys?: {
    category: string;
    colorFamily: string;
    mood: string;
    page: string;
    query: string;
    sort: string;
  };
};

function PaletteExplorerPreview({
  initialVisibleCount = 6,
  loadMoreStep = 3,
  initialQuery = "",
  palettes,
  searchParamKeys
}: PaletteExplorerPreviewProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [localQuery, setLocalQuery] = useState(initialQuery);
  const [localSortValue, setLocalSortValue] =
    useState<(typeof sortOptions)[number]["value"]>("featured");
  const [localSelectedCategory, setLocalSelectedCategory] =
    useState<PaletteCategory | null>(null);
  const [localSelectedMood, setLocalSelectedMood] =
    useState<PaletteMood | null>(null);
  const [localSelectedColorFamily, setLocalSelectedColorFamily] =
    useState<ColorFamily | null>(null);
  const [localVisibleCount, setLocalVisibleCount] =
    useState(initialVisibleCount);
  const syncUrlState = Boolean(searchParamKeys);

  function updateUrlState(
    updates: Record<string, string | null | undefined>,
    options?: { resetPage?: boolean }
  ) {
    if (!searchParamKeys) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
        return;
      }

      params.set(key, value);
    });

    if (options?.resetPage) {
      params.delete(searchParamKeys.page);
    }

    const nextSearch = params.toString();
    const nextUrl = nextSearch ? `${pathname}?${nextSearch}` : pathname;

    window.history.replaceState(null, "", nextUrl);
  }

  const query = syncUrlState
    ? (searchParams.get(searchParamKeys!.query) ?? initialQuery)
    : localQuery;
  const sortValue = syncUrlState
    ? ((searchParams.get(searchParamKeys!.sort) as
        (typeof sortOptions)[number]["value"] | null) ?? "featured")
    : localSortValue;
  const selectedCategory = syncUrlState
    ? ((searchParams.get(
        searchParamKeys!.category
      ) as PaletteCategory | null) ?? null)
    : localSelectedCategory;
  const selectedMood = syncUrlState
    ? ((searchParams.get(searchParamKeys!.mood) as PaletteMood | null) ?? null)
    : localSelectedMood;
  const selectedColorFamily = syncUrlState
    ? ((searchParams.get(searchParamKeys!.colorFamily) as ColorFamily | null) ??
      null)
    : localSelectedColorFamily;
  const currentPage = syncUrlState
    ? Math.max(
        Number.parseInt(searchParams.get(searchParamKeys!.page) ?? "1", 10) ||
          1,
        1
      )
    : 1;
  const visibleCount = syncUrlState
    ? initialVisibleCount + (currentPage - 1) * loadMoreStep
    : localVisibleCount;

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
    if (syncUrlState && searchParamKeys) {
      updateUrlState({
        [searchParamKeys.category]: null,
        [searchParamKeys.colorFamily]: null,
        [searchParamKeys.mood]: null,
        [searchParamKeys.page]: null,
        [searchParamKeys.query]: null,
        [searchParamKeys.sort]: null
      });
      return;
    }

    setLocalQuery("");
    setLocalSortValue("featured");
    setLocalSelectedCategory(null);
    setLocalSelectedMood(null);
    setLocalSelectedColorFamily(null);
    setLocalVisibleCount(initialVisibleCount);
  }

  function handleFilterChange(groupLabel: string, value: string | null) {
    if (syncUrlState && searchParamKeys) {
      if (groupLabel === "Category") {
        updateUrlState(
          { [searchParamKeys.category]: value },
          { resetPage: true }
        );
      }

      if (groupLabel === "Mood") {
        updateUrlState({ [searchParamKeys.mood]: value }, { resetPage: true });
      }

      if (groupLabel === "Color family") {
        updateUrlState(
          { [searchParamKeys.colorFamily]: value },
          { resetPage: true }
        );
      }

      return;
    }

    if (groupLabel === "Category") {
      setLocalSelectedCategory(value as PaletteCategory | null);
    }

    if (groupLabel === "Mood") {
      setLocalSelectedMood(value as PaletteMood | null);
    }

    if (groupLabel === "Color family") {
      setLocalSelectedColorFamily(value as ColorFamily | null);
    }

    setLocalVisibleCount(initialVisibleCount);
  }

  function handleQueryChange(value: string) {
    if (syncUrlState && searchParamKeys) {
      updateUrlState(
        { [searchParamKeys.query]: value.trim() ? value : null },
        { resetPage: true }
      );
      return;
    }

    setLocalQuery(value);
    setLocalVisibleCount(initialVisibleCount);
  }

  function handleSortChange(value: string) {
    if (syncUrlState && searchParamKeys) {
      updateUrlState(
        { [searchParamKeys.sort]: value === "featured" ? null : value },
        { resetPage: true }
      );
      return;
    }

    setLocalSortValue(value as (typeof sortOptions)[number]["value"]);
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
            onLoadMore={() => {
              if (syncUrlState && searchParamKeys) {
                updateUrlState({
                  [searchParamKeys.page]: String(currentPage + 1)
                });
                return;
              }

              setLocalVisibleCount((count) => count + loadMoreStep);
            }}
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
