import type { Metadata } from "next";
import { generatePageMetadata, fetchSeoMetadata } from "@/utils/metadata";
import FAQPageClient from "./FAQPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchSeoMetadata("/api/faq");
  return generatePageMetadata(
    data?.data?.seo_metadata,
    "FAQ | Car Shipping Questions | CarShippers.ai",
    "Frequently asked questions about car shipping. Get answers on pricing, tracking, insurance, delivery times, and more."
  );
}

export const dynamic = "force-dynamic";

export default function FAQPage() {
  return <FAQPageClient />;
}
