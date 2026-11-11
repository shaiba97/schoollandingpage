// Server-only pricing types for the landing page. The live tier catalogue
// comes from the platform console's database through the backend's public
// pricing endpoint; when the backend is unreachable the page renders an
// empty pricing state instead of any bundled mock tiers.

export type PricingChecklistItem = {
  kind: "module" | "feature";
  label: string;
  unlocked: boolean;
};

export type PricingTier = {
  code: string;
  name: string;
  tier: string;
  target: string | null;
  /** Flat yearly price in the tier's currency; 0 = quoted per school. */
  price: number;
  monthlyPrice: number;
  currency: string;
  billingModel: string;
  isQuoteBased: boolean;
  checklist: PricingChecklistItem[];
};

/**
 * Display name without the redundant "Plan" suffix (live DB rows are
 * named "Primary Plan").
 */
export function tierDisplayName(name: string): string {
  return name.replace(/\s+Plan$/i, "").trim();
}

/**
 * Formats an amount in a tier's currency. USD gets the familiar `$`
 * prefix; anything else renders the ISO code beside the number. In Arabic
 * the symbol follows the number, matching how Gulf schools read prices.
 */
export function priceLabel(
  tier: Pick<PricingTier, "currency">,
  amount: number,
  locale: "en" | "ar" = "en",
): string {
  const formatted = amount.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
  if (locale === "ar") {
    return tier.currency === "USD" ? `${formatted} $` : `${formatted} ${tier.currency}`;
  }
  return tier.currency === "USD" ? `$${formatted}` : `${tier.currency} ${formatted}`;
}


