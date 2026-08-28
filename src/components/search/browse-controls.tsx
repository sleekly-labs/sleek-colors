"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal, X } from "lucide-react";

type BrowseSortOption = {
  label: string;
  value: string;
};

type BrowseFilterOption = {
  label: string;
  value: string;
};

type BrowseFilterGroup = {
  label: string;
  options: readonly BrowseFilterOption[];
  value: string | null;
};

type PaletteBrowseControlsProps = {
  className?: string;
  filterGroups: readonly BrowseFilterGroup[];
  onClearFilters: () => void;
  onFilterChange: (groupLabel: string, value: string | null) => void;
  onQueryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  query: string;
  sortOptions: readonly BrowseSortOption[];
  sortValue: string;
};

function PaletteBrowseControls({
  className,
  filterGroups,
  onClearFilters,
  onFilterChange,
  onQueryChange,
  onSortChange,
  query,
  sortOptions,
  sortValue
}: PaletteBrowseControlsProps) {
  const hasActiveFilters =
    query.trim().length > 0 || filterGroups.some((group) => group.value);

  return (
    <div
      className={cn(
        "bg-card rounded-card border-border flex flex-col gap-5 border p-5",
        className
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search palettes, tags, moods, colors"
            aria-label="Search palettes"
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 lg:w-52">
          <SlidersHorizontal className="text-muted-foreground size-4 shrink-0" />
          <Select
            value={sortValue}
            onValueChange={(value) => onSortChange(value ?? sortValue)}
          >
            <SelectTrigger
              aria-label="Sort palettes"
              className="w-full"
              size="default"
            >
              <SelectValue placeholder="Sort palettes" />
            </SelectTrigger>
            <SelectContent align="end">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {filterGroups.map((group) => (
          <div key={group.label} className="flex flex-col gap-2">
            <span className="text-muted-foreground text-sm font-medium">
              {group.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const selected = group.value === option.value;

                return (
                  <Button
                    key={option.value}
                    variant={selected ? "secondary" : "outline"}
                    size="sm"
                    aria-pressed={selected}
                    aria-label={`${selected ? "Remove" : "Apply"} ${group.label} filter ${option.label}`}
                    onClick={() =>
                      onFilterChange(
                        group.label,
                        selected ? null : option.value
                      )
                    }
                  >
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {hasActiveFilters ? (
        <div className="flex justify-start">
          <Button variant="secondary" size="sm" onClick={onClearFilters}>
            <X />
            <span>Clear filters</span>
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export { PaletteBrowseControls };
export type { BrowseFilterGroup, BrowseFilterOption, BrowseSortOption };
