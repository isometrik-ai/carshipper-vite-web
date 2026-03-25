import type { Metadata } from "next";
import { SEO_FALLBACKS } from "@/constants/seo";
import { buildMetadataFromSeo } from "@/lib/seo/metadata";
import { fetchStrapiSeoMetadata } from "@/lib/seo/strapiSeo";
import QuotePageClient from "./QuotePageClient";

export const dynamic = 'force-dynamic';

const DEFAULT_TITLE = SEO_FALLBACKS.global.title;
const DEFAULT_DESCRIPTION = SEO_FALLBACKS.global.description;
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchStrapiSeoMetadata(STRAPI_API_URL, "/api/quote");
  return buildMetadataFromSeo({
    seo,
    defaultTitle: DEFAULT_TITLE,
    defaultDescription: DEFAULT_DESCRIPTION,
    canonicalPath: "/quote",
  });
}

export default function QuotePage() {
  return <QuotePageClient />;
}

