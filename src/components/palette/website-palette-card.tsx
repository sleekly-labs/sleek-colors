"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";

import { Button, buttonLinkClassName } from "@/components/ui/button";
import { copyHexToClipboard, copyPaletteToClipboard } from "@/lib/clipboard";
import { cn } from "@/lib/utils";
import type { WebsitePalette, WebsitePaletteRole } from "@/types";

import { CopyFeedback } from "./copy-feedback";

type WebsitePaletteCardProps = {
  className?: string;
  previewHref: string;
  palette: WebsitePalette;
};

type RoleColor = {
  hex: string;
  role: WebsitePaletteRole;
};

function WebsitePaletteCard({
  className,
  previewHref,
  palette
}: WebsitePaletteCardProps) {
  const statusId = useId();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedPalette, setCopiedPalette] = useState(false);

  const roleColors: RoleColor[] = [
    {
      hex: palette.primaryColor,
      role: "primary"
    },
    {
      hex: palette.secondaryColor,
      role: "secondary"
    }
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

  return (
    <article
      className={cn(
        "bg-card rounded-card border-border flex min-h-[23rem] flex-col border",
        className
      )}
    >
      <div className="flex flex-1 flex-col">
        <div className="grid min-h-36 grid-cols-2">
          {roleColors.map((color) => (
            <div
              key={color.role}
              className="flex items-end p-4"
              style={{ backgroundColor: color.hex }}
            >
              <span className="rounded-full bg-black/10 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {color.role === "primary" ? "Primary" : "Secondary"}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-5 p-5">
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

          <div className="grid gap-3">
            {roleColors.map((color) => {
              const isCopied = copiedHex === color.hex;

              return (
                <Button
                  key={color.role}
                  variant="outline"
                  size="default"
                  onClick={() => void handleCopy(color.hex)}
                  className="h-auto w-full justify-start px-3 py-3 text-left whitespace-normal"
                  aria-describedby={statusId}
                  aria-label={`Copy ${color.role} color ${color.hex}`}
                >
                  <span
                    className="size-10 shrink-0 rounded-md border"
                    style={{ backgroundColor: color.hex }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="text-muted-foreground block text-xs font-medium uppercase">
                      {color.role}
                    </span>
                    <span className="block text-sm font-medium">
                      {color.hex}
                    </span>
                  </span>
                  <CopyFeedback copied={isCopied} />
                </Button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            {palette.moods.slice(0, 2).map((mood) => (
              <span
                key={mood}
                className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs"
              >
                {mood}
              </span>
            ))}
            {palette.colorFamilies.slice(0, 2).map((family) => (
              <span
                key={family}
                className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs"
              >
                {family}
              </span>
            ))}
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
            Select role color or copy full palette.
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
            {palette.supportsWebsitePreview ? (
              <Link
                href={previewHref}
                className={buttonLinkClassName({ size: "sm" })}
              >
                <span>Try on website</span>
                <ExternalLink />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export { WebsitePaletteCard };
