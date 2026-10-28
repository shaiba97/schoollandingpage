// Server-only support-contacts fetcher, kept apart from client code so
// the "use cache" / cacheLife runtime stays out of the client bundle.

import { cacheLife } from "next/cache";

export type PublicSupportContact = {
  contact: string;
  contactType: "EMAIL" | "PHONE";
  region: string;
};

export async function fetchSupportContacts(): Promise<PublicSupportContact[]> {
  "use cache";
  // Support contacts are edited in the platform console; a short revalidate
  // keeps the landing page's WhatsApp/email targets live within seconds.
  await cacheLife({ stale: 10, revalidate: 30, expire: 600 });
  const base = process.env.BACKEND_URL || "http://localhost:3000";
  try {
    const response = await fetch(`${base}/api/platform/public/support-contacts`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: unknown = await response.json();
    const items = Array.isArray(data)
      ? data
      : Array.isArray((data as { items?: unknown[] })?.items)
        ? ((data as { items: unknown[] }).items)
        : [];
    return items.filter(
      (item): item is PublicSupportContact =>
        Boolean(item) &&
        typeof (item as PublicSupportContact).contact === "string" &&
        ((item as PublicSupportContact).contactType === "EMAIL" ||
          (item as PublicSupportContact).contactType === "PHONE") &&
        typeof (item as PublicSupportContact).region === "string",
    );
  } catch (error) {
    console.warn(
      "[landingpage] live support contacts unavailable, rendering without them:",
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}
