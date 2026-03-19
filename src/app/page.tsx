import type { Metadata } from "next";
import type { LandingPageResponse } from "@/types/LandingPage.types";
import { SEO_FALLBACKS, SEO_SITE } from "@/constants/seo";
import HomePageClient from "./HomePageClient";

export const dynamic = "force-dynamic";

const SITE_URL = SEO_SITE.url;
const DEFAULT_TITLE = SEO_FALLBACKS.global.title;
const DEFAULT_DESCRIPTION = SEO_FALLBACKS.global.description;
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

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

async function fetchHomeSeo(): Promise<LandingPageResponse["data"]["seo_metadata"] | null> {
  if (!STRAPI_API_URL) return null;

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
    const response = await fetch(`${STRAPI_API_URL}/api/landing-page${seoQuery}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as LandingPageResponse;
    return payload?.data?.seo_metadata ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchHomeSeo();
  const title = seo?.meta_title || DEFAULT_TITLE;
  const description = seo?.meta_description || DEFAULT_DESCRIPTION;
  const canonical = seo?.canonical_url || SITE_URL;
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

export default function HomePage() {
  return <HomePageClient />;
}

