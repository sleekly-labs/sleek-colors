"use client";

import { Check, Copy, RotateCcw, Shuffle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { copyHexToClipboard } from "@/lib/clipboard";
import type { WebsitePalette } from "@/types";

type WebsitePreviewProps = {
  palette: WebsitePalette;
};

function WebsitePreview({ palette }: WebsitePreviewProps) {
  const [swapped, setSwapped] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const primary = swapped ? palette.secondaryColor : palette.primaryColor;
  const secondary = swapped ? palette.primaryColor : palette.secondaryColor;

  function handleSwap() {
    setSwapped((value) => !value);
  }

  function handleReset() {
    setSwapped(false);
  }

  async function handleCopy(hex: string) {
    const result = await copyHexToClipboard(hex);

    if (result.ok) {
      setCopied(result.value);
      window.setTimeout(() => {
        setCopied((current) => (current === result.value ? null : current));
      }, 1200);
      return;
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-card rounded-card border-border flex flex-wrap items-center justify-between gap-4 border p-4">
        <div>
          <p className="text-sm font-semibold">Active preview colors</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Temporarily swap roles to compare the interface balance.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={handleSwap}
            aria-pressed={swapped}
            className={
              swapped
                ? "border-[var(--preview-secondary)] bg-[var(--preview-secondary)]/20 text-slate-900"
                : "border-[var(--preview-secondary)] text-slate-900"
            }
          >
            <Shuffle />
            <span>{swapped ? "Swapped" : "Swap colors"}</span>
          </Button>
          <Button variant="ghost" onClick={handleReset} disabled={!swapped}>
            <RotateCcw />
            <span>Reset</span>
          </Button>
        </div>
      </div>

      <div
        className="min-w-0 overflow-hidden rounded-xl border shadow-sm"
        style={{
          borderColor: `${primary}30`,
          ["--preview-primary" as string]: primary,
          ["--preview-secondary" as string]: secondary,
          ["--preview-surface" as string]: "#f8fafc",
          ["--preview-panel" as string]: "#ffffff",
          ["--preview-ink" as string]: "#0f172a",
          ["--preview-muted" as string]: "#475569"
        }}
      >
        <header className="flex items-center justify-between gap-4 border-b bg-[var(--preview-panel)] px-5 py-4">
          <div className="flex items-center gap-2 font-semibold text-[var(--preview-ink)]">
            <span className="size-3 rounded-full bg-[var(--preview-primary)]" />
            Northstar
          </div>
          <nav className="hidden items-center gap-5 text-sm text-[var(--preview-muted)] sm:flex">
            <a
              href="#features"
              aria-current="page"
              className="rounded-md bg-[var(--preview-primary)]/10 px-2 py-1 font-medium text-[var(--preview-primary)]"
            >
              Features
            </a>
            <a href="#metrics" className="hover:text-[var(--preview-primary)]">
              Metrics
            </a>
            <a href="#contact" className="hover:text-[var(--preview-primary)]">
              Contact
            </a>
          </nav>
          <Button
            size="sm"
            className="bg-[var(--preview-primary)] text-white hover:opacity-90"
          >
            Get started
          </Button>
        </header>

        <main className="bg-[var(--preview-surface)]">
          <section className="grid gap-8 px-5 py-14 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-16">
            <div className="space-y-5">
              <span className="inline-flex rounded-full bg-[var(--preview-secondary)]/25 px-3 py-1 text-xs font-semibold text-slate-800">
                Built for focused teams
              </span>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-[var(--preview-ink)] sm:text-5xl">
                Move important work forward.
              </h1>
              <p className="max-w-lg text-base leading-7 text-[var(--preview-muted)]">
                A realistic product surface for testing how this color pairing
                handles hierarchy, action, and supporting detail.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-[var(--preview-primary)] text-white hover:opacity-90">
                  Start a project
                </Button>
                <Button
                  variant="outline"
                  className="border-[var(--preview-secondary)] text-slate-900"
                >
                  See how it works
                </Button>
              </div>
            </div>
            <div className="rounded-lg bg-[var(--preview-panel)] p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between border-b pb-4">
                <p className="text-sm font-semibold text-slate-900">
                  Weekly overview
                </p>
                <span className="rounded-full bg-[var(--preview-secondary)]/30 px-2 py-1 text-xs font-medium text-slate-700">
                  Live
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4">
                {["84%", "24.8k", "16", "4.2x"].map((value, index) => (
                  <div key={value} className="rounded-md bg-slate-50 p-3">
                    <p className="text-xl font-semibold text-[var(--preview-ink)]">
                      {value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {["Completion", "Visitors", "Projects", "Return"][index]}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-2 rounded-full bg-slate-100">
                <div className="h-2 w-3/4 rounded-full bg-[var(--preview-secondary)]" />
              </div>
            </div>
          </section>

          <section
            id="features"
            className="grid gap-4 border-t px-5 py-10 sm:grid-cols-3 sm:px-10 lg:px-16"
          >
            {[
              "One clear workspace",
              "Signals that matter",
              "Built to scale"
            ].map((title, index) => (
              <article
                key={title}
                className="rounded-lg bg-[var(--preview-panel)] p-5 ring-1 ring-slate-200"
              >
                <span className="flex size-9 items-center justify-center rounded-md bg-[var(--preview-secondary)]/25 text-sm font-bold text-slate-800">
                  0{index + 1}
                </span>
                <h2 className="mt-4 font-semibold text-[var(--preview-ink)]">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--preview-muted)]">
                  Keep decisions visible, useful, and easy to act on.
                </p>
              </article>
            ))}
          </section>

          <section
            id="metrics"
            className="grid gap-6 border-t px-5 py-10 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-16"
          >
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-[var(--preview-primary)] uppercase">
                    Product workspace
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--preview-ink)]">
                    Keep the team in sync.
                  </h2>
                </div>
                <span className="hidden rounded-full bg-[var(--preview-secondary)]/25 px-2.5 py-1 text-xs font-medium text-slate-800 sm:inline-flex">
                  3 updates
                </span>
              </div>
              <div className="mt-5 divide-y rounded-lg bg-[var(--preview-panel)] px-4 ring-1 ring-slate-200">
                {[
                  ["Design tokens synced", "Just now", "Complete"],
                  ["Checkout flow reviewed", "18 min ago", "In review"],
                  ["Mobile pass completed", "Yesterday", "Complete"]
                ].map(([title, time, status], index) => (
                  <div key={title} className="flex items-center gap-3 py-4">
                    <span
                      className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        backgroundColor:
                          index === 1 ? `${secondary}35` : `${primary}18`,
                        color: index === 1 ? secondary : primary
                      }}
                    >
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[var(--preview-ink)]">
                        {title}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--preview-muted)]">
                        {time}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-[var(--preview-muted)]">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-[var(--preview-panel)] p-5 ring-1 ring-slate-200">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-[var(--preview-ink)]">
                  Launch readiness
                </h2>
                <span className="text-sm font-semibold text-[var(--preview-primary)]">
                  82%
                </span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[82%] rounded-full bg-[var(--preview-primary)]" />
              </div>
              <ul className="mt-5 space-y-3 text-sm text-[var(--preview-muted)]">
                {[
                  "Core flows mapped",
                  "Content review",
                  "Analytics connected"
                ].map((item, index) => (
                  <li key={item} className="flex items-center gap-2">
                    <span
                      className="flex size-5 items-center justify-center rounded-full"
                      style={{
                        backgroundColor:
                          index < 2 ? `${secondary}45` : "#e2e8f0",
                        color: index < 2 ? "#334155" : "#64748b"
                      }}
                    >
                      {index < 2 ? <Check className="size-3" /> : "•"}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>

        <footer
          id="contact"
          className="flex flex-col gap-3 bg-slate-950 px-5 py-6 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16"
        >
          <span>Northstar workspace</span>
          <a
            href="#features"
            className="text-[var(--preview-primary)] hover:underline"
          >
            Explore the product
          </a>
        </footer>
      </div>

      <section id="color-roles" className="grid gap-3 sm:grid-cols-2">
        {[
          { label: "Primary", hex: primary },
          { label: "Secondary", hex: secondary }
        ].map((color) => (
          <div
            key={color.label}
            className="bg-card rounded-card border-border flex items-center gap-3 border p-4"
          >
            <span
              className="size-10 rounded-md border"
              style={{ backgroundColor: color.hex }}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground text-xs font-medium uppercase">
                {color.label}
              </p>
              <p className="mt-1 text-sm font-semibold">{color.hex}</p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => void handleCopy(color.hex)}
              aria-label={`Copy ${color.label} color ${color.hex}`}
            >
              {copied === color.hex ? <Check /> : <Copy />}
            </Button>
          </div>
        ))}
      </section>
    </div>
  );
}

export { WebsitePreview };
