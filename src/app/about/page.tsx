import type { Metadata } from "next";
import { generatePageMetadata, fetchSeoMetadata } from "@/utils/metadata";
import AboutPageClient from "./AboutPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchSeoMetadata("/api/about");
  return generatePageMetadata(
    data?.data?.seo_metadata,
    "About CarShippers.ai | Trusted Auto Transport Company",
    "Learn about CarShippers.ai – our story, values, and commitment to hassle-free car shipping. Licensed, reliable, and built for you."
  );
}

export const dynamic = "force-dynamic";

export default function AboutPage() {
  return <AboutPageClient />;
}
