import type { Metadata } from "next";
import { generatePageMetadata, fetchSeoMetadata } from "@/utils/metadata";
import HowItWorksPageClient from "./HowItWorksPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchSeoMetadata("/api/how-it-work");
  return generatePageMetadata(
    data?.data?.seo_metadata,
    "How Car Shipping Works | CarShippers.ai",
    "See how easy car shipping is with CarShippers.ai. Get a quote in 30 seconds, choose your carrier, and we deliver door-to-door. No hassle, no hidden fees."
  );
}

export const dynamic = "force-dynamic";

export default function HowItWorksPage() {
  return <HowItWorksPageClient />;
}
