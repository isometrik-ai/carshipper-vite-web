import type { Metadata } from "next";
import type { SeoMetadata } from "@/types/LandingPage.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const SEO_POPULATE =
  "populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height";

/** Fetch SEO metadata from a Strapi API path (e.g. /api/contact). Returns data?.data?.seo_metadata. */
export async function fetchSeoMetadata(apiPath: string): Promise<{ data?: { seo_metadata?: SeoMetadata } } | null> {
  try {
    const res = await fetch(`${API_URL}${apiPath}?${SEO_POPULATE}`, { next: { revalidate: 3600 } });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

/**
 * Parse robots string (e.g. "index, follow" or "noindex, nofollow") into boolean flags
 */
function parseRobots(robots: string | null | undefined): { index: boolean; follow: boolean } {
  if (!robots || typeof robots !== "string") return { index: true, follow: true };
  const s = robots.toLowerCase();
  return {
    index: !s.includes("noindex"),
    follow: !s.includes("nofollow"),
  };
}

/**
 * Extract and format SEO metadata for Next.js Metadata API
 * Used by generateMetadata in page.tsx files
 */
export function generatePageMetadata(
  seoMetadata: SeoMetadata | null | undefined,
  defaultTitle?: string,
  defaultDescription?: string
): Metadata {
  const seo = seoMetadata || {};
  const robots = parseRobots(seo.robots);

  const title = seo.meta_title || defaultTitle || "CarShippers.ai | Ship Your Car in 30 Seconds";
  const description =
    seo.meta_description ||
    defaultDescription ||
    "Get an instant car shipping quote in 30 seconds. Licensed carriers, door-to-door service, no hidden fees. Ship your car anywhere in the US with CarShippers.ai.";
  const keywords = seo.meta_keywords || undefined;
  const canonical = seo.canonical_url || undefined;

  const ogImageUrl = seo.og_image?.url
    ? (seo.og_image.url.startsWith("http") ? seo.og_image.url : `${API_URL}${seo.og_image.url}`)
    : undefined;

  const twitterImageUrl = seo.twitter_image?.url
    ? (seo.twitter_image.url.startsWith("http")
        ? seo.twitter_image.url
        : `${API_URL}${seo.twitter_image.url}`)
    : undefined;

  return {
    title,
    description,
    keywords: keywords ? keywords.split(",").map((k) => k.trim()) : undefined,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: seo.og_title || title,
      description: seo.og_description || description,
      type: (seo.og_type as "website") || "website",
      url: seo.og_url || canonical,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: seo.og_image?.width || 1200,
              height: seo.og_image?.height || 630,
              alt: seo.og_image?.alternativeText || title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: (seo.twitter_card as "summary_large_image") || "summary_large_image",
      title: seo.twitter_title || title,
      description: seo.twitter_description || description,
      images: twitterImageUrl ? [twitterImageUrl] : undefined,
    },
    robots: {
      index: robots.index,
      follow: robots.follow,
      googleBot: {
        index: robots.index,
        follow: robots.follow,
      },
    },
  };
}
