import { Suspense } from "react";
import { LandingPage } from "@/components/landing/landing-client";
import { fetchPricingTiers } from "@/lib/pricing-fetch";

export default function Home() {
  return (
    // The tiers fetch sits behind a Suspense boundary so the route keeps an
    // instant shell: the page shell streams immediately while pricing loads.
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LandingPageContent />
    </Suspense>
  );
}

async function LandingPageContent() {
  const tiers = await fetchPricingTiers();
  return <LandingPage initialTiers={tiers} />;
}
