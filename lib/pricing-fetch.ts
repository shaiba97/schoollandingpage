// Server-only pricing fetcher, kept apart from lib/pricing.ts so no
// caching runtime ever reaches the client bundle. Deliberately uncached:
// tier create/update/delete in the platform console must show up on the
// landing page instantly, so every request reads the live DB.

import { fetchLiveJson } from "./backend-fetch";
import type { PricingTier } from "./pricing";

export async function fetchPricingTiers(): Promise<PricingTier[]> {
  const base = process.env.BACKEND_URL || "https://schoolbackend-7n8a.onrender.com";
  try {
    const data: unknown = await fetchLiveJson(
      `${base}/api/platform/public/pricing-tiers`,
    );
    if (!Array.isArray(data)) throw new Error("not an array");
    return data.filter(
      (tier): tier is PricingTier =>
        Boolean(tier) &&
        typeof (tier as PricingTier).code === "string" &&
        Array.isArray((tier as PricingTier).checklist),
    );
  } catch (error) {
    console.warn(
      "[landingpage] live pricing unavailable, rendering no tiers:",
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}
