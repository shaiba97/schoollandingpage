import { Suspense } from "react";
import { LandingPage } from "@/components/landing/landing-client";
import { fetchPricingTiers } from "@/lib/pricing-fetch";
import { fetchSupportContacts } from "@/lib/contacts-fetch";

export default function Home() {
  return (
    // The fetches sit behind a Suspense boundary so the route keeps an
    // instant shell: the page shell streams immediately while pricing and
    // support contacts load.
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LandingPageContent />
    </Suspense>
  );
}

async function LandingPageContent() {
  const [tiers, contacts] = await Promise.all([
    fetchPricingTiers(),
    fetchSupportContacts(),
  ]);
  return <LandingPage initialTiers={tiers} initialContacts={contacts} />;
}
