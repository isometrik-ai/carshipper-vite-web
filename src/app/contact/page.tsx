import type { Metadata } from "next";
import { generatePageMetadata, fetchSeoMetadata } from "@/utils/metadata";
import ContactPageClient from "./ContactPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchSeoMetadata("/api/contact");
  return generatePageMetadata(
    data?.data?.seo_metadata,
    "Contact CarShippers.ai | Get Car Shipping Help",
    "Contact CarShippers.ai for car shipping quotes and support. Call, email, or fill out our form. We respond within 24 hours."
  );
}

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return <ContactPageClient />;
}
