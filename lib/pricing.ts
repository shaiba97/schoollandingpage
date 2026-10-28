// Server-only pricing source for the landing page. The live tier catalogue
// comes from the platform console's database through the backend's public
// pricing endpoint, and degrades to a bundled snapshot of the same
// catalogue when the backend is unreachable, so the marketing page never
// breaks.

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

const MODULES: ReadonlyArray<readonly [string, string]> = [
  ["ADMIN", "Central Admin Portal"],
  ["ACADEMIC", "Academic & Examination Center"],
  ["FINANCIAL", "Financial & Student Payments"],
  ["TEACHER", "Teacher Portal"],
  ["GUARDIAN", "Parent Portal"],
  ["STUDENT", "Student Portal"],
  ["TRANSPORT", "Transport & Fleet Management"],
  ["RECEPTION", "Receptionist Portal"],
];

const FEATURES: ReadonlyArray<readonly [string, string]> = [
  ["standardAttendance", "Standard attendance"],
  ["timetable", "Timetable"],
  ["examinations", "Examinations"],
  ["reportCards", "Basic report cards"],
  ["guardianPortal", "Guardian web & mobile portal"],
  ["whatsappAttendance", "WhatsApp attendance triggers"],
  ["smsAttendance", "SMS attendance triggers"],
  ["financialInstallments", "Financial installments"],
  ["payroll", "Payroll"],
  ["busTracking", "Real-time bus tracking"],
  ["gccTaxReceipts", "ZATCA / GCC tax receipts"],
  ["bespokeConfiguration", "Bespoke portal configuration"],
  ["databaseIsolation", "Custom database isolation"],
  ["dedicatedSla", "Dedicated SLA"],
];

function fallbackTier(input: {
  code: string;
  tier: string;
  name: string;
  target: string;
  price: number;
  modules: string[];
  features: string[];
}): PricingTier {
  const monthlyPrice =
    input.price > 0 ? Math.round((input.price / 12) * 100) / 100 : 0;
  return {
    code: input.code,
    tier: input.tier,
    name: input.name,
    target: input.target,
    price: input.price,
    monthlyPrice,
    currency: "USD",
    billingModel: "ANNUAL",
    isQuoteBased: input.price <= 0,
    checklist: [
      ...MODULES.map(([moduleCode, label]) => ({
        kind: "module" as const,
        label,
        unlocked: input.modules.includes(moduleCode),
      })),
      ...FEATURES.filter(([key]) => input.features.includes(key)).map(
        ([, label]) => ({
          kind: "feature" as const,
          label,
          unlocked: true,
        }),
      ),
    ],
  };
}

/** Mirrors scripts/seed-platform-plans.ts via the backend's tier catalogue. */
export const FALLBACK_TIERS: PricingTier[] = [
  fallbackTier({
    code: "PRIMARY",
    tier: "PRIMARY",
    name: "Primary",
    target: "Small schools and early-stage academies.",
    price: 800,
    modules: ["ADMIN", "ACADEMIC", "STUDENT", "TEACHER"],
    features: ["standardAttendance", "timetable", "examinations", "reportCards"],
  }),
  fallbackTier({
    code: "INTERMEDIATE",
    tier: "INTERMEDIATE",
    name: "Intermediate",
    target: "Mid-size schools.",
    price: 1200,
    modules: ["ADMIN", "ACADEMIC", "STUDENT", "TEACHER", "GUARDIAN"],
    features: [
      "standardAttendance",
      "timetable",
      "examinations",
      "reportCards",
      "guardianPortal",
      "whatsappAttendance",
      "smsAttendance",
    ],
  }),
  fallbackTier({
    code: "ADVANCED",
    tier: "ADVANCED",
    name: "Advanced",
    target: "Large established private and GCC schools.",
    price: 3600,
    modules: [
      "ADMIN",
      "ACADEMIC",
      "FINANCIAL",
      "TEACHER",
      "GUARDIAN",
      "STUDENT",
      "TRANSPORT",
      "RECEPTION",
    ],
    features: [
      "standardAttendance",
      "timetable",
      "examinations",
      "reportCards",
      "guardianPortal",
      "whatsappAttendance",
      "smsAttendance",
      "financialInstallments",
      "payroll",
      "busTracking",
      "gccTaxReceipts",
    ],
  }),
  fallbackTier({
    code: "CUSTOM",
    tier: "CUSTOM",
    name: "Customized",
    target: "School groups and multi-campus networks.",
    price: 0,
    modules: [
      "ADMIN",
      "ACADEMIC",
      "FINANCIAL",
      "TEACHER",
      "GUARDIAN",
      "STUDENT",
      "TRANSPORT",
      "RECEPTION",
    ],
    features: ["bespokeConfiguration", "databaseIsolation", "dedicatedSla"],
  }),
];

/**
 * Display name without the redundant "Plan" suffix (live DB rows are
 * named "Primary Plan", the fallback catalogue is suffix-free already).
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


