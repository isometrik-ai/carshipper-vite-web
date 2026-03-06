import type { Metadata } from "next";
import { generatePageMetadata, fetchSeoMetadata } from "@/utils/metadata";
import QuotePageClient from "./QuotePageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchSeoMetadata("/api/quote");
  return generatePageMetadata(
    data?.data?.seo_metadata,
    "Get Car Shipping Quote | CarShippers.ai",
    "Get an instant car shipping quote in 30 seconds. Compare prices, choose your carrier, and ship door-to-door. No hidden fees."
  );
}

export const dynamic = "force-dynamic";

export default function QuotePage() {
  return <QuotePageClient />;
}
