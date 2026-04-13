import type { Metadata } from "next";
import { getCaliforniaSeo } from "@/lib/californiaCarShippingSeo.server";
import CaliforniaShippingPageClient from "./CaliforniaShippingPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://carshippers.ai";

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
