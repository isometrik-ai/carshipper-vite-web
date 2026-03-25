import type { Metadata } from "next";
import { SEO_SITE } from "@/constants/seo";
import type { SeoMetadata } from "@/types/LandingPage.types";

type BuildSeoMetadataInput = {
  seo?: SeoMetadata | null;
  defaultTitle: string;
  defaultDescription: string;
  canonicalPath: string;
  siteUrl?: string;
};

const withLeadingSlash = (value: string): string => {
  if (!value) return "";
  return value.startsWith("/") ? value : `/${value}`;
};

export const toAbsoluteUrl = (
  url?: string | null,
  siteUrl = SEO_SITE.url
): string | undefined => {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/") && !url.includes("//")) return `${siteUrl}${url}`;
  return undefined;
};

export const parseRobots = (
  robots?: string | null
): Metadata["robots"] => {
  if (!robots) return undefined;
  const value = robots.toLowerCase();
  return {
    index: !value.includes("noindex"),
    follow: !value.includes("nofollow"),
  };
};

const resolveCanonical = (canonicalPath: string, siteUrl: string): string => {
  if (!canonicalPath) return siteUrl;
  if (
    canonicalPath.startsWith("http://") ||
    canonicalPath.startsWith("https://")
  ) {
    return canonicalPath;
  }
  return `${siteUrl}${withLeadingSlash(canonicalPath)}`;
};

export const buildMetadataFromSeo = ({
  seo,
  defaultTitle,
  defaultDescription,
  canonicalPath,
  siteUrl = SEO_SITE.url,
}: BuildSeoMetadataInput): Metadata => {
  const title = seo?.meta_title || defaultTitle;
  const description = seo?.meta_description || defaultDescription;
  const canonical = seo?.canonical_url || resolveCanonical(canonicalPath, siteUrl);
  const ogImageUrl = toAbsoluteUrl(seo?.og_image?.url, siteUrl);
  const twitterImageUrl =
    toAbsoluteUrl(seo?.twitter_image?.url, siteUrl) || ogImageUrl;

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
      card:
        (seo?.twitter_card as "summary" | "summary_large_image") ||
        "summary_large_image",
      title: seo?.twitter_title || seo?.og_title || title,
      description: seo?.twitter_description || seo?.og_description || description,
      images: twitterImageUrl ? [twitterImageUrl] : undefined,
    },
  };
};
