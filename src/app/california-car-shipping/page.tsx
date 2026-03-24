import type { Metadata } from "next";
import { cache } from "react";
import type { CaliforniaShippingResponse } from "@/types/CaliforniaShipping.types";
import CaliforniaShippingPageClient from "./CaliforniaShippingPageClient";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://carshippers.ai";
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const HAS_VALID_STRAPI_API_URL =
  typeof STRAPI_API_URL === "string" &&
  (STRAPI_API_URL.startsWith("http://") || STRAPI_API_URL.startsWith("https://"));

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

async function fetchCaliforniaSeo(): Promise<CaliforniaShippingResponse["data"]["seo_metadata"] | null> {
  if (!HAS_VALID_STRAPI_API_URL) return null;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  const seoQuery =
    "?populate[seo_metadata][fields][0]=meta_title" +
    "&populate[seo_metadata][fields][1]=meta_description" +
    "&populate[seo_metadata][fields][2]=meta_keywords" +
    "&populate[seo_metadata][fields][3]=canonical_url" +
    "&populate[seo_metadata][fields][4]=og_title" +
    "&populate[seo_metadata][fields][5]=og_description" +
    "&populate[seo_metadata][fields][6]=og_type" +
    "&populate[seo_metadata][fields][7]=og_url" +
    "&populate[seo_metadata][fields][8]=twitter_card" +
    "&populate[seo_metadata][fields][9]=twitter_title" +
    "&populate[seo_metadata][fields][10]=twitter_description" +
    "&populate[seo_metadata][fields][11]=robots";

  try {
    const response = await fetch(`${STRAPI_API_URL}/api/california-car-shipping${seoQuery}`, {
      next: { revalidate: 60 },
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as CaliforniaShippingResponse;
    return payload?.data?.seo_metadata ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

const getCaliforniaSeo = cache(fetchCaliforniaSeo);

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getCaliforniaSeo();
  const title = seo?.meta_title || "California Car Shipping | CarShippers AI";
  const description =
    seo?.meta_description ||
    "Ship cars to or from California with trusted carriers and transparent pricing.";
  const canonical = seo?.canonical_url || `${SITE_URL}/california-car-shipping`;
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

export default function CaliforniaShippingPage() {
  return <CaliforniaShippingPageClient />;
}

