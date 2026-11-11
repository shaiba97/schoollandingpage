// Server-only pricing fetcher, kept apart from lib/pricing.ts so no
// caching runtime ever reaches the client bundle. Deliberately uncached:
// tier create/update/delete in the platform console must show up on the
// landing page instantly, so every request reads the live DB.

import type { PricingTier } from "./pricing";

export async function fetchPricingTiers(): Promise<PricingTier[]> {
  const base = process.env.BACKEND_URL || "https://schoolbackend-7n8a.onrender.com";
  try {
    const response = await fetch(`${base}/api/platform/public/pricing-tiers`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("not an array");
    const tiers = data.filter(
      (tier): tier is PricingTier =>
        Boolean(tier) &&
        typeof (tier as PricingTier).code === "string" &&
        Array.isArray((tier as PricingTier).checklist),
    );
    return tiers;
  } catch (error) {
    console.warn(
      "[landingpage] live pricing unavailable, rendering no tiers:",
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}
