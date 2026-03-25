import type { Metadata } from "next";
import { SEO_FALLBACKS } from "@/constants/seo";
import { buildMetadataFromSeo } from "@/lib/seo/metadata";
import PurgeCachePageClient from "./PurgeCachePageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const base = buildMetadataFromSeo({
    seo: null,
    defaultTitle: `Purge Cache | ${SEO_FALLBACKS.global.title}`,
    defaultDescription: SEO_FALLBACKS.global.description,
    canonicalPath: "/purge-cache",
  });

  // This is an internal utility route; do not index it.
  return {
    ...base,
    robots: { index: false, follow: false },
  };
}

export default function PurgeCachePage() {
  return <PurgeCachePageClient />;
}

