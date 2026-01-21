import type { SeoMetadata } from "@/types/LandingPage.types";

/**
 * Default SEO values used as fallbacks when Strapi data is not available
 */
export const DEFAULT_SEO = {
    title: "CarShippers.ai | Ship Your Car in 30 Seconds | Instant Auto Transport Quotes",
    description: "Get an instant car shipping quote in 30 seconds. Licensed carriers, door-to-door service, no hidden fees. Ship your car anywhere in the US with CarShippers.ai.",
    keywords: "car shipping, auto transport, vehicle shipping, car transport, ship my car",
    canonical: "https://carshippers.ai",
    ogTitle: "CarShippers.ai | Instant Car Shipping Quotes",
    ogDescription: "Get an instant car shipping quote in 30 seconds. Licensed carriers, door-to-door service, no hidden fees.",
    ogType: "website",
    ogUrl: "https://carshippers.ai",
    twitterCard: "summary_large_image",
    twitterTitle: "CarShippers.ai | Instant Car Shipping Quotes",
    twitterDescription: "Get an instant car shipping quote in 30 seconds. Licensed carriers, door-to-door service, no hidden fees.",
} as const;

/**
 * Get the base URL for constructing absolute URLs
 */
const getBaseUrl = (): string => {
    if (typeof window !== "undefined") {
        return window.location.origin;
    }
    return "https://carshippers.ai";
};

/**
 * Constructs a full URL from a Strapi media URL
 */
const getImageUrl = (url: string | null | undefined): string | null => {
    if (!url) return null;
    const baseUrl = getBaseUrl();
    return url.startsWith("http") ? url : `${baseUrl}${url}`;
};

/**
 * Extracts and normalizes SEO metadata from Strapi response
 */
export const extractSeoMetadata = (seoData: SeoMetadata | null | undefined) => {
    if (!seoData) {
        return {
            meta_title: DEFAULT_SEO.title,
            description: DEFAULT_SEO.description,
            keywords: DEFAULT_SEO.keywords,
            canonical: DEFAULT_SEO.canonical,
            ogTitle: DEFAULT_SEO.ogTitle,
            ogDescription: DEFAULT_SEO.ogDescription,
            ogType: DEFAULT_SEO.ogType,
            ogUrl: DEFAULT_SEO.ogUrl,
            ogImage: null,
            ogImageWidth: undefined,
            ogImageHeight: undefined,
            ogImageAlt: null,
            twitterCard: DEFAULT_SEO.twitterCard,
            twitterTitle: DEFAULT_SEO.twitterTitle,
            twitterDescription: DEFAULT_SEO.twitterDescription,
            twitterImage: null,
            robots: "index, follow",
            structuredData: null,
        };
    }

    const baseUrl = getBaseUrl();

    return {
        meta_title: seoData.meta_title || DEFAULT_SEO.title,
        description: seoData.meta_description || DEFAULT_SEO.description,
        keywords: seoData.meta_keywords || DEFAULT_SEO.keywords,
        canonical: seoData.canonical_url || DEFAULT_SEO.canonical,
        ogTitle: seoData.og_title || seoData.meta_title || DEFAULT_SEO.ogTitle,
        ogDescription: seoData.og_description || seoData.meta_description || DEFAULT_SEO.ogDescription,
        ogType: seoData.og_type || DEFAULT_SEO.ogType,
        ogUrl: seoData.og_url || seoData.canonical_url || (typeof window !== "undefined" ? `${baseUrl}${window.location.pathname}` : DEFAULT_SEO.ogUrl),
        ogImage: getImageUrl(seoData.og_image?.url),
        ogImageWidth: seoData.og_image?.width,
        ogImageHeight: seoData.og_image?.height,
        ogImageAlt: seoData.og_image?.alternativeText || null,
        twitterCard: seoData.twitter_card || DEFAULT_SEO.twitterCard,
        twitterTitle: seoData.twitter_title || seoData.og_title || seoData.meta_title || DEFAULT_SEO.twitterTitle,
        twitterDescription: seoData.twitter_description || seoData.og_description || seoData.meta_description || DEFAULT_SEO.twitterDescription,
        twitterImage: getImageUrl(seoData.twitter_image?.url) || getImageUrl(seoData.og_image?.url),
        robots: seoData.robots || "index, follow",
        structuredData: seoData.structured_data || null,
    };
};
