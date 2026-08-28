"use client";

import { Button, buttonLinkClassName } from "@/components/ui/button";
import { copyHexToClipboard, copyPaletteToClipboard } from "@/lib/clipboard";
import { cn } from "@/lib/utils";
import type { GeneralPalette } from "@/types";
import { Check, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";

import { CopyFeedback } from "./copy-feedback";

type GeneralPaletteCardProps = {
  className?: string;
  detailHref: string;
  palette: GeneralPalette;
};

function GeneralPaletteCard({
  className,
  detailHref,
  palette
}: GeneralPaletteCardProps) {
  const statusId = useId();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedPalette, setCopiedPalette] = useState(false);

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

  return (
    <article
      className={cn(
        "bg-card rounded-card border-border flex min-h-[26rem] flex-col border",
        className
      )}
    >
      <div className="flex flex-1 flex-col">
        <div className="grid grid-cols-5">
          {palette.colors.map((color) => (
            <div
              key={color.hex}
              className="min-h-32"
              style={{ backgroundColor: color.hex }}
              aria-hidden="true"
            />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-5 p-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold">{palette.name}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {palette.description}
                </p>
              </div>
              {palette.isFeatured ? (
                <span className="bg-secondary text-secondary-foreground shrink-0 rounded-full px-2.5 py-1 text-xs font-medium">
                  Featured
                </span>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              {palette.categories.slice(0, 2).map((category) => (
                <span
                  key={category}
                  className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs"
                >
                  {category}
                </span>
              ))}
              {palette.moods.slice(0, 2).map((mood) => (
                <span
                  key={mood}
                  className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs"
                >
                  {mood}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            {palette.colors.map((color) => {
              const isCopied = copiedHex === color.hex;

              return (
                <Button
                  key={color.hex}
                  variant="outline"
                  size="default"
                  onClick={() => void handleCopy(color.hex)}
                  className="h-auto w-full justify-start px-3 py-2 text-left whitespace-normal"
                  aria-describedby={statusId}
                  aria-label={`Copy ${color.hex}`}
                >
                  <span
                    className="size-8 shrink-0 rounded-md border"
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
      </div>

      <div className="border-border flex items-center justify-between gap-3 border-t px-5 py-4">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <span
            id={statusId}
            className="text-muted-foreground text-sm"
            aria-live="polite"
          >
            Select color or copy full palette.
          </span>
          <div className="flex flex-wrap justify-between gap-2">
            <Button
              variant={copiedPalette ? "secondary" : "outline"}
              size="sm"
              onClick={() => void handleCopyPalette()}
            >
              {copiedPalette ? <Check /> : <Copy />}
              <span>{copiedPalette ? "Palette copied" : "Copy palette"}</span>
            </Button>
            <Link
              href={detailHref}
              className={buttonLinkClassName({
                variant: "outline",
                size: "sm"
              })}
            >
              <span>View palette</span>
              <ExternalLink />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export { GeneralPaletteCard };
