import type { Metadata } from "next";
import { SEO_FALLBACKS, SEO_SITE } from "@/constants/seo";
import { fetchStrapiSeoMetadata } from "@/lib/seo/strapiSeo";
import FlatbedTransportPageClient from "./FlatbedTransportPageClient";

export const dynamic = "force-dynamic";

const DEFAULT_TITLE = SEO_FALLBACKS.global.title;
const DEFAULT_DESCRIPTION = SEO_FALLBACKS.global.description;
const SITE_URL = SEO_SITE.url;
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const toAbsoluteUrl = (url?: string | null): string | undefined => {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/") && !url.includes("//")) {
    return `${SITE_URL}${url}`;
  }
  return undefined;
};

const parseRobots = (robots?: string | null): Metadata["robots"] => {
  if (!robots) return undefined;
  const value = robots.toLowerCase();
  return {
    index: !value.includes("noindex"),
    follow: !value.includes("nofollow"),
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchStrapiSeoMetadata(STRAPI_API_URL, "/api/flatbed-transport");
  const title = seo?.meta_title || DEFAULT_TITLE;
  const description = seo?.meta_description || DEFAULT_DESCRIPTION;
  const canonical = seo?.canonical_url || `${SITE_URL}/flatbed-transport`;
  const ogImageUrl = toAbsoluteUrl(seo?.og_image?.url);
  const twitterImageUrl = toAbsoluteUrl(seo?.twitter_image?.url) || ogImageUrl;

  return {
    title,
    description,
    keywords: seo?.meta_keywords || undefined,
    alternates: {
      canonical,
    },
    robots: parseRobots(seo?.robots),
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      type: (seo?.og_type as "website" | "article") || "website",
      url: seo?.og_url || canonical,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: seo?.og_image?.width || undefined,
              height: seo?.og_image?.height || undefined,
              alt: seo?.og_image?.alternativeText || undefined,
            },
          ]
        : undefined,
    },
    twitter: {
      card: (seo?.twitter_card as "summary" | "summary_large_image") || "summary_large_image",
      title: seo?.twitter_title || seo?.og_title || title,
      description: seo?.twitter_description || seo?.og_description || description,
      images: twitterImageUrl ? [twitterImageUrl] : undefined,
    },
  };
}

export default function FlatbedTransportPage() {
  return <FlatbedTransportPageClient />;
}

