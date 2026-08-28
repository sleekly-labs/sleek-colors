"use client";

import { Check, Copy, Shuffle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { copyHexToClipboard } from "@/lib/clipboard";

const initialColors = [
  "#101828",
  "#192BC2",
  "#7F56D9",
  "#2E90FA",
  "#12B76A",
  "#F79009",
  "#F04438",
  "#D6BBFB",
  "#98F5E1",
  "#FEC84B",
  "#F9FAFB",
  "#E4E7EC"
] as const;

const lightColors = new Set([
  "#D6BBFB",
  "#98F5E1",
  "#FEC84B",
  "#F9FAFB",
  "#E4E7EC"
]);

function HeroColorLab() {
  const [colors, setColors] = useState<string[]>([...initialColors]);
  const [activeColor, setActiveColor] = useState<string>(initialColors[1]);
  const [copied, setCopied] = useState(false);

  function handleShuffle() {
    setColors((current) => [
      current[current.length - 1],
      ...current.slice(0, -1)
    ]);
  }

  async function handleCopy() {
    const result = await copyHexToClipboard(activeColor);
    if (result.ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    }
  }

  return (
    <div className="bg-card rounded-card border-border grid gap-4 border p-3 shadow-sm sm:p-4">
      <div className="flex items-center justify-between gap-3 px-1">
        <div>
          <p className="text-sm font-semibold">Build a direction</p>
          <p className="text-muted-foreground text-xs">
            Pick a color, then see it take the lead.
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleShuffle}
          aria-label="Shuffle color order"
        >
          <Shuffle />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {colors.map((hex) => {
          const isActive = activeColor === hex;
          const textClass = lightColors.has(hex)
            ? "text-slate-900/70"
            : "text-white/80";

          return (
            <button
              key={hex}
              type="button"
              aria-label={`Select ${hex}`}
              aria-pressed={isActive}
              onClick={() => {
                setActiveColor(hex);
                setCopied(false);
              }}
              className={`group focus-visible:ring-ring/50 relative aspect-square rounded-md border-2 text-left transition-transform hover:scale-[1.03] focus-visible:ring-3 focus-visible:outline-none ${isActive ? "border-foreground scale-[1.03]" : "border-transparent"}`}
              style={{ backgroundColor: hex }}
            >
              <span
                className={`absolute right-1 bottom-1 font-mono text-[9px] ${textClass}`}
              >
                {hex.slice(1)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 border-t pt-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="space-y-1">
          <p className="text-muted-foreground text-xs font-medium uppercase">
            Selected color
          </p>
          <p className="font-mono text-2xl font-semibold tracking-tight">
            {activeColor}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? <Check /> : <Copy />}
          <span>{copied ? "Copied" : "Copy HEX"}</span>
        </Button>
      </div>

      <div
        className="overflow-hidden rounded-md border"
        style={{ borderColor: activeColor }}
      >
        <div
          className="flex items-center justify-between gap-3 px-4 py-3"
          style={{ backgroundColor: activeColor }}
        >
          <span
            className={`text-sm font-semibold ${lightColors.has(activeColor) ? "text-slate-900" : "text-white"}`}
          >
            Live specimen
          </span>
          <span
            className={`text-[10px] font-medium uppercase ${lightColors.has(activeColor) ? "text-slate-900/70" : "text-white/70"}`}
          >
            01 / 12
          </span>
        </div>
        <div className="bg-background grid gap-2 p-4">
          <div className="bg-foreground/15 h-2 w-3/4 rounded-full" />
          <div className="bg-foreground/10 h-2 w-1/2 rounded-full" />
          <div
            className="mt-2 h-8 w-24 rounded-md"
            style={{ backgroundColor: activeColor }}
          />
        </div>
      </div>
    </div>
  );
}

export { HeroColorLab };
