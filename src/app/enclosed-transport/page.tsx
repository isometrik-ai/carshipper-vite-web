import type { Metadata } from "next";
import type { EnclosedTransportResponse } from "@/types/EnclosedTransport.types";
import EnclosedTransportPageClient from "./EnclosedTransportPageClient";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://carshippers.ai";
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

async function fetchEnclosedTransportSeo(): Promise<EnclosedTransportResponse["data"]["seo_metadata"] | null> {
  if (!STRAPI_API_URL) return null;
  const seoQuery =
    "?populate[seo_metadata]=*" +
    "&populate[seo_metadata][populate][og_image][fields][0]=url" +
    "&populate[seo_metadata][populate][og_image][fields][1]=alternativeText" +
    "&populate[seo_metadata][populate][og_image][fields][2]=width" +
    "&populate[seo_metadata][populate][og_image][fields][3]=height" +
    "&populate[seo_metadata][populate][twitter_image][fields][0]=url" +
    "&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText" +
    "&populate[seo_metadata][populate][twitter_image][fields][2]=width" +
    "&populate[seo_metadata][populate][twitter_image][fields][3]=height";

  try {
    const response = await fetch(`${STRAPI_API_URL}/api/enclosed-transport${seoQuery}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as EnclosedTransportResponse;
    return payload?.data?.seo_metadata ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchEnclosedTransportSeo();
  const title = seo?.meta_title || "Enclosed Transport | CarShippers AI";
  const description =
    seo?.meta_description ||
    "Premium enclosed auto transport for high-value and specialty vehicles.";
  const canonical = seo?.canonical_url || `${SITE_URL}/enclosed-transport`;
  const ogImageUrl = toAbsoluteUrl(seo?.og_image?.url);
  const twitterImageUrl = toAbsoluteUrl(seo?.twitter_image?.url) || ogImageUrl;

  return {
    title,
    description,
    keywords: seo?.meta_keywords || undefined,
    alternates: { canonical },
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

export default function EnclosedTransportPage() {
  return <EnclosedTransportPageClient />;
}

