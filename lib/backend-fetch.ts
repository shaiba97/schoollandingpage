// Server-only live-JSON fetch helper shared by the pricing and contacts
// fetchers. Deliberately uncached and resilient: the Render backend sleeps
// when idle, so a cold start can take up to a couple of minutes. The page
// shell streams instantly behind Suspense while these retries wait out the
// wake-up, then the fresh DB rows render — no stale catalogue ever.

export async function fetchLiveJson(
  url: string,
  { timeoutMs = 15000, attempts = 4 }: { timeoutMs?: number; attempts?: number } = {},
): Promise<unknown> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
      }
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}
