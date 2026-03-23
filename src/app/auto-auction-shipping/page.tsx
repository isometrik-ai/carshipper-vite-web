import type { Metadata } from "next";
import type { AutoAuctionShippingResponse } from "@/types/AutoAuctionShipping.types";
import AutoAuctionShippingPageClient from "./AutoAuctionShippingPageClient";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://carshippers.ai";
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

async function fetchAutoAuctionShippingSeo(): Promise<AutoAuctionShippingResponse["data"]["seo_metadata"] | null> {
  if (!STRAPI_API_URL) return null;
  const seoQuery = [
    "populate[seo_metadata]=*",
    "populate[seo_metadata][populate][og_image][fields][0]=url",
    "populate[seo_metadata][populate][og_image][fields][1]=alternativeText",
    "populate[seo_metadata][populate][og_image][fields][2]=width",
    "populate[seo_metadata][populate][og_image][fields][3]=height",
    "populate[seo_metadata][populate][twitter_image][fields][0]=url",
    "populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText",
    "populate[seo_metadata][populate][twitter_image][fields][2]=width",
    "populate[seo_metadata][populate][twitter_image][fields][3]=height",
    "populate[page_content][on][shared.hero-section][populate][trust_indicators][populate]=*",
    "populate[page_content][on][shared.hero-section][populate][statistics][populate]=*",
    "populate[page_content][on][shared.hero-section][populate][background_image][fields][0]=url",
    "populate[page_content][on][shared.hero-section][populate][background_image][fields][1]=alternativeText",
    "populate[page_content][on][shared.hero-section][populate][background_image][fields][2]=width",
    "populate[page_content][on][shared.hero-section][populate][background_image][fields][3]=height",
    "populate[page_content][on][shared.service-list][populate][services][populate]=*",
    "populate[page_content][on][shared.service-cards][populate][service_cards][populate]=*",
    "populate[page_content][on][shared.process-section][populate][steps][populate]=*",
    "populate[page_content][on][shared.process-section][populate][cta_button][populate]=*",
    "populate[page_content][on][shared.testimonials-display][populate][testimonials][populate]=*",
    "populate[page_content][on][shared.testimonials-display][populate][ratings][populate]=*",
    "populate[page_content][on][shared.alert-warning][populate]=*",
  ].join("&");

  try {
    const response = await fetch(`${STRAPI_API_URL}/api/auto-auction-shipping?${seoQuery}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as AutoAuctionShippingResponse;
    return payload?.data?.seo_metadata ?? null;
  } catch {
    return null;
  }
}

const toAbsoluteUrl = (url?: string | null): string | undefined => {
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
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
  const seo = await fetchAutoAuctionShippingSeo();
  const title = seo?.meta_title || "Auto Auction Shipping | CarShippers AI";
  const description =
    seo?.meta_description ||
    "Ship auction vehicles fast with trusted carriers and clear pricing.";
  const canonical = seo?.canonical_url || `${SITE_URL}/auto-auction-shipping`;
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

export default function AutoAuctionShippingPage() {
  return <AutoAuctionShippingPageClient />;
}

