import type { Metadata } from "next";
import type { ContactResponse } from "@/types/Contact.types";
import ContactPageClient from "./ContactPageClient";

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

async function fetchContactSeo(): Promise<ContactResponse["data"]["seo_metadata"] | null> {
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
    const response = await fetch(`${STRAPI_API_URL}/api/contact${seoQuery}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as ContactResponse;
    return payload?.data?.seo_metadata ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchContactSeo();
  const title = seo?.meta_title || "Contact CarShippers AI";
  const description =
    seo?.meta_description ||
    "Contact CarShippers AI for shipping support, quotes, and expert transport guidance.";
  const canonical = seo?.canonical_url || `${SITE_URL}/contact`;
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

export default function ContactPage() {
  return <ContactPageClient />;
}

