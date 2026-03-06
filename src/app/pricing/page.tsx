import type { Metadata } from "next";
import { generatePageMetadata, fetchSeoMetadata } from "@/utils/metadata";
import PricingPageClient from "./PricingPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchSeoMetadata("/api/pricing");
  return generatePageMetadata(
    data?.data?.seo_metadata,
    "Car Shipping Prices & Costs | CarShippers.ai",
    "Transparent car shipping pricing. Open, enclosed, and expedited transport. Get an instant quote in 30 seconds. No hidden fees."
  );
}

export const dynamic = "force-dynamic";

export default function PricingPage() {
  return <PricingPageClient />;
}
