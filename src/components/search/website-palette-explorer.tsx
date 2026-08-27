"use client";

import { useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

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
  initialQuery?: string;
  palettes: readonly WebsitePalette[];
  searchParamKeys?: {
    colorFamily: string;
    mood: string;
    page: string;
    query: string;
    sort: string;
    style: string;
  };
};

function WebsitePaletteExplorer({
  initialVisibleCount = 12,
  loadMoreStep = 12,
  initialQuery = "",
  palettes,
  searchParamKeys
}: WebsitePaletteExplorerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [localQuery, setLocalQuery] = useState(initialQuery);
  const [localSortValue, setLocalSortValue] =
    useState<(typeof sortOptions)[number]["value"]>("featured");
  const [localSelectedStyle, setLocalSelectedStyle] =
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
  const selectedStyle = syncUrlState
    ? ((searchParams.get(searchParamKeys!.style) as PaletteCategory | null) ??
      null)
    : localSelectedStyle;
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
          ...palette.colors.map((color) => color.hex),
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
    if (syncUrlState && searchParamKeys) {
      updateUrlState({
        [searchParamKeys.colorFamily]: null,
        [searchParamKeys.mood]: null,
        [searchParamKeys.page]: null,
        [searchParamKeys.query]: null,
        [searchParamKeys.sort]: null,
        [searchParamKeys.style]: null
      });
      return;
    }

    setLocalQuery("");
    setLocalSortValue("featured");
    setLocalSelectedStyle(null);
    setLocalSelectedMood(null);
    setLocalSelectedColorFamily(null);
    setLocalVisibleCount(initialVisibleCount);
  }

  function handleFilterChange(groupLabel: string, value: string | null) {
    if (syncUrlState && searchParamKeys) {
      if (groupLabel === "Style") {
        updateUrlState({ [searchParamKeys.style]: value }, { resetPage: true });
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

    if (groupLabel === "Style") {
      setLocalSelectedStyle(value as PaletteCategory | null);
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
        label="website color combinations"
        totalCount={filteredPalettes.length}
        visibleCount={visiblePalettes.length}
      />
      {visiblePalettes.length > 0 ? (
        <>
          <WebsitePaletteGrid palettes={visiblePalettes} />
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
          title="No website color combinations match current filters."
          description="Try broader search terms or clear filters to inspect more interface-ready pairs."
          onReset={resetControls}
        />
      )}
    </div>
  );
}

export { WebsitePaletteExplorer };
