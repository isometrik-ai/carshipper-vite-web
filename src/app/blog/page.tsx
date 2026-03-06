import type { Metadata } from "next";
import { generatePageMetadata, fetchSeoMetadata } from "@/utils/metadata";
import BlogPageClient from "./BlogPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchSeoMetadata("/api/blog");
  return generatePageMetadata(
    data?.data?.seo_metadata,
    "Car Shipping Blog | CarShippers.ai",
    "Tips, guides, and news about car shipping. Learn about auto transport costs, tracking, insurance, and how to ship your car safely."
  );
}

export const dynamic = "force-dynamic";

export default function BlogPage() {
  return <BlogPageClient />;
}
