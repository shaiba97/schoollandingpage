// Server-only support-contacts fetcher, kept apart from client code so no
// caching runtime ever reaches the client bundle. Deliberately uncached:
// contacts edited in the platform console must show up on the landing
// page instantly.

export type PublicSupportContact = {
  contact: string;
  contactType: "EMAIL" | "PHONE";
  region: string;
};

export async function fetchSupportContacts(): Promise<PublicSupportContact[]> {
  const base = process.env.BACKEND_URL || "https://schoolbackend-7n8a.onrender.com";
  try {
    const response = await fetch(`${base}/api/platform/public/support-contacts`, {
      cache: "no-store",
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
