// Server-only pricing fetcher, kept apart from lib/pricing.ts so the
// "use cache" / cacheLife runtime stays out of the client bundle.

import { cacheLife } from "next/cache";
import { FALLBACK_TIERS, type PricingTier } from "./pricing";

export async function fetchPricingTiers(): Promise<PricingTier[]> {
  "use cache";
  // Refresh the live catalogue every 5 minutes.
  await cacheLife({ stale: 120, revalidate: 300, expire: 3600 });
  const base = process.env.BACKEND_URL || "https://schoolbackend-7n8a.onrender.com";
  try {
    const response = await fetch(`${base}/api/platform/public/pricing-tiers`, {
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
    if (tiers.length === 0) throw new Error("empty catalogue");
    return tiers;
  } catch (error) {
    console.warn(
      "[landingpage] live pricing unavailable, using bundled catalogue:",
      error instanceof Error ? error.message : error,
    );
    return FALLBACK_TIERS;
  }
}
