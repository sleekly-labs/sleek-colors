import { redirect } from "next/navigation";

import { getPalettes } from "@/data";

export const dynamic = "force-dynamic";

export default function RandomPage() {
  const palettes = getPalettes("published");

  if (palettes.length === 0) {
    redirect("/");
  }

  const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];

  redirect(`/palette/${randomPalette.slug}`);
}
