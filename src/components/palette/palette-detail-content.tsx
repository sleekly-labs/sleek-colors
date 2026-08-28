"use client";

import { Check, Copy, Link2, Share2 } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { copyHexToClipboard, copyPaletteToClipboard } from "@/lib/clipboard";
import { cn } from "@/lib/utils";
import type { Palette } from "@/types";

import { CopyFeedback } from "./copy-feedback";

type PaletteDetailContentProps = {
  className?: string;
  palette: Palette;
};

function formatPaletteDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC"
  }).format(new Date(`${value}T00:00:00Z`));
}

function PaletteDetailContent({
  className,
  palette
}: PaletteDetailContentProps) {
  const statusId = useId();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPalette, setCopiedPalette] = useState(false);
  const metadataItems = [
    {
      label: "Category",
      value: palette.categories.join(", ")
    },
    {
      label: "Mood",
      value: palette.moods.join(", ")
    },
    {
      label: "Color family",
      value: palette.colorFamilies.join(", ")
    },
    ...(palette.createdAt
      ? [
          {
            label: "Published",
            value: formatPaletteDate(palette.createdAt),
            dateTime: palette.createdAt
          }
        ]
      : []),
    ...(palette.updatedAt && palette.updatedAt !== palette.createdAt
      ? [
          {
            label: "Updated",
            value: formatPaletteDate(palette.updatedAt),
            dateTime: palette.updatedAt
          }
        ]
      : [])
  ];

  async function handleCopy(hex: string) {
    const result = await copyHexToClipboard(hex);

    if (result.ok) {
      setCopiedHex(result.value);
      window.setTimeout(() => {
        setCopiedHex((currentHex) =>
          currentHex === result.value ? null : currentHex
        );
      }, 1200);
      return;
    }
  }

  async function handleCopyPalette() {
    const result = await copyPaletteToClipboard(
      palette.colors.map((color) => color.hex)
    );

    if (result.ok) {
      setCopiedPalette(true);
      window.setTimeout(() => {
        setCopiedPalette(false);
      }, 1200);
      return;
    }
  }

  async function handleCopyLink() {
    const href = window.location.href;

    try {
      await navigator.clipboard.writeText(href);
      setCopiedLink(true);
      window.setTimeout(() => {
        setCopiedLink(false);
      }, 1200);
    } catch {}
  }

  async function handleShare() {
    const href = window.location.href;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: palette.name,
          text: palette.description ?? "Explore this curated color palette.",
          url: href
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }
    await handleCopyLink();
  }

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div
        className={cn(
          "bg-card rounded-card border-border overflow-hidden border",
          palette.paletteType === "website"
            ? "grid md:grid-cols-2"
            : "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
        )}
      >
        {palette.colors.map((color, index) => {
          const isPrimary =
            palette.paletteType === "website" &&
            color.hex === palette.primaryColor;
          const isSecondary =
            palette.paletteType === "website" &&
            color.hex === palette.secondaryColor;

          return (
            <div
              key={color.hex}
              className="flex min-h-48 flex-col justify-between p-5"
              style={{ backgroundColor: color.hex }}
            >
              <div className="flex justify-between gap-3">
                <span className="rounded-full bg-black/10 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {isPrimary
                    ? "Primary"
                    : isSecondary
                      ? "Secondary"
                      : `Color ${index + 1}`}
                </span>
                <Button
                  variant="secondary"
                  size="icon-sm"
                  onClick={() => void handleCopy(color.hex)}
                  aria-describedby={statusId}
                  aria-label={`Copy ${color.hex}`}
                  className="bg-white/15 text-white shadow-none hover:bg-white/25"
                >
                  {copiedHex === color.hex ? <Check /> : <Copy />}
                </Button>
              </div>
              <div className="space-y-1 text-white">
                <p className="text-sm font-medium">Color {index + 1}</p>
                <p className="text-lg font-semibold">{color.hex}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="grid gap-6">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {metadataItems.map((item) => (
              <div
                key={item.label}
                className="bg-card rounded-card border-border border p-4"
              >
                <p className="text-muted-foreground text-sm">{item.label}</p>
                <p className="mt-2 text-sm font-medium text-balance">
                  {"dateTime" in item ? (
                    <time dateTime={item.dateTime}>{item.value}</time>
                  ) : null}
                  {"dateTime" in item ? null : item.value}
                </p>
              </div>
            ))}
          </div>

          {palette.paletteType === "website" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { hex: palette.primaryColor, label: "Primary" },
                { hex: palette.secondaryColor, label: "Secondary" }
              ].map((role) => (
                <div
                  key={role.label}
                  className="bg-card rounded-card border-border flex items-center gap-3 border p-4"
                >
                  <span
                    className="size-10 shrink-0 rounded-md border"
                    style={{ backgroundColor: role.hex }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-muted-foreground text-xs font-medium uppercase">
                      {role.label} color
                    </p>
                    <p className="mt-1 text-sm font-semibold">{role.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="grid gap-3">
            {palette.colors.map((color) => {
              const isCopied = copiedHex === color.hex;
              return (
                <Button
                  key={color.hex}
                  variant="outline"
                  size="default"
                  onClick={() => void handleCopy(color.hex)}
                  className="h-auto w-full justify-start px-4 py-3 text-left whitespace-normal"
                  aria-describedby={statusId}
                  aria-label={`Copy ${color.hex}`}
                >
                  <span
                    className="size-10 shrink-0 rounded-md border"
                    style={{ backgroundColor: color.hex }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">
                      {color.hex}
                    </span>
                  </span>
                  <CopyFeedback copied={isCopied} />
                </Button>
              );
            })}
          </div>
        </div>

        <aside className="bg-card rounded-card border-border flex flex-col gap-4 border p-5">
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">Palette actions</p>
            <p
              id={statusId}
              className="text-muted-foreground text-sm"
              aria-live="polite"
            >
              Copy a color, the full palette, or the link.
            </p>
          </div>
          <Button
            variant={copiedPalette ? "secondary" : "outline"}
            onClick={() => void handleCopyPalette()}
          >
            {copiedPalette ? <Check /> : <Copy />}
            <span>{copiedPalette ? "Palette copied" : "Copy palette"}</span>
          </Button>
          <Button variant="outline" onClick={() => void handleCopyLink()}>
            {copiedLink ? <Check /> : <Link2 />}
            <span>{copiedLink ? "Link copied" : "Copy link"}</span>
          </Button>
          <Button variant="outline" onClick={() => void handleShare()}>
            <Share2 />
            <span>Share palette</span>
          </Button>
          <div className="space-y-2 pt-2">
            <p className="text-muted-foreground text-sm">Tags</p>
            <div className="flex flex-wrap gap-2">
              {palette.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export { PaletteDetailContent };
