import type { SeoMetadata, PageContentComponent, FAQDisplay, FAQItem } from "@/types/LandingPage.types";

/** Schema.org context URL - use without trailing slash per spec */
const SCHEMA_CONTEXT = "https://schema.org";

/**
 * Strips HTML tags and normalizes whitespace for schema.org plain-text fields
 */
const stripHtml = (text: string): string => {
    if (!text || typeof text !== "string") return "";
    return text
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .trim();
};

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
 * Company information for structured data (production: set logo, real phone, alternateName)
 */
export const COMPANY_INFO = {
    name: "Carshippers AI",
    alternateName: "",
    url: "https://carshippers.ai",
    logo: "", // Production: set absolute logo URL e.g. https://carshippers.ai/logo.png
    telephone: "8885551234", // Production: use E.164 e.g. +18885551234
    contactType: "customer service",
    areaServed: ["US"],
    availableLanguage: "en",
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

/**
 * Extracts FAQ items from page content (production-ready)
 * - Handles faq-display and faq-categories
 * - Strips HTML for schema.org plain-text requirement
 * - Deduplicates by normalized question (per Google guidelines)
 * - Filters out invalid items (empty question/answer)
 */
export const extractFAQItems = (pageContent: PageContentComponent[] | null | undefined): FAQItem[] => {
    if (!pageContent?.length) return [];

    const seen = new Set<string>();
    const faqItems: FAQItem[] = [];

    const addIfValid = (item: FAQItem) => {
        const question = stripHtml(item.question || "");
        const answer = stripHtml(item.answer || "");
        if (!question || !answer) return;
        const key = question.toLowerCase().slice(0, 200);
        if (seen.has(key)) return;
        seen.add(key);
        faqItems.push({ ...item, question, answer });
    };

    const faqDisplay = pageContent.find(
        (c): c is FAQDisplay => c.__component === "shared.faq-display"
    );
    if (faqDisplay?.faq_items) {
        faqDisplay.faq_items.forEach(addIfValid);
    }

    const faqCategories = pageContent.find(
        (c) => c.__component === "shared.faq-categories"
    ) as { categories?: Array<{ faqs?: FAQItem[] }> } | undefined;
    if (faqCategories?.categories) {
        faqCategories.categories.forEach((cat) => {
            cat.faqs?.forEach(addIfValid);
        });
    }

    return faqItems;
};

/**
 * Generates Corporation schema (schema.org compliant)
 */
export const generateCorporationSchema = () => {
    return {
        "@context": SCHEMA_CONTEXT,
        "@type": "Corporation",
        name: COMPANY_INFO.name,
        ...(COMPANY_INFO.alternateName && { alternateName: COMPANY_INFO.alternateName }),
        url: COMPANY_INFO.url,
        ...(COMPANY_INFO.logo && { logo: COMPANY_INFO.logo }),
        contactPoint: {
            "@type": "ContactPoint",
            telephone: COMPANY_INFO.telephone,
            contactType: COMPANY_INFO.contactType,
            areaServed: COMPANY_INFO.areaServed,
            availableLanguage: COMPANY_INFO.availableLanguage,
        },
    };
};

/**
 * Generates FAQPage schema (Google FAQ rich result guidelines)
 * Uses plain-text only; invalid/empty items filtered by extractFAQItems
 */
export const generateFAQPageSchema = (faqItems: FAQItem[]) => {
    if (!faqItems?.length) return null;

    return {
        "@context": SCHEMA_CONTEXT,
        "@type": "FAQPage",
        mainEntity: faqItems.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
};

/**
 * Generates Product schema for inner pages (schema.org compliant)
 */
export const generateProductSchema = (
    pageTitle: string,
    pageDescription: string,
    pageUrl: string,
    imageUrl?: string | null
) => {
    const baseUrl = getBaseUrl();
    const fullUrl = pageUrl.startsWith("http") ? pageUrl : `${baseUrl}${pageUrl}`;

    return {
        "@context": SCHEMA_CONTEXT,
        "@type": "Product",
        "@id": `${fullUrl}#product`,
        url: fullUrl,
        name: pageTitle,
        description: pageDescription,
        brand: {
            "@type": "Brand",
            name: COMPANY_INFO.name,
            url: COMPANY_INFO.url,
            ...(imageUrl && { image: imageUrl }),
        },
        ...(imageUrl && {
            image: {
                "@type": "ImageObject",
                url: imageUrl,
            },
        }),
        offers: {
            "@type": "AggregateOffer",
            availability: "https://schema.org/BackOrder",
            itemCondition: "https://schema.org/NewCondition",
            priceCurrency: "USD",
            url: fullUrl,
        },
    };
};

/** JSON-LD schema object shape for type safety */
export type JsonLdSchema = Record<string, unknown>;

/**
 * Generates all structured data schemas for a page (production-ready)
 */
export const generateStructuredDataSchemas = (
    isMainPage: boolean,
    seoMetadata: SeoMetadata | null | undefined,
    pageContent: PageContentComponent[] | null | undefined
): JsonLdSchema[] => {
    const schemas: JsonLdSchema[] = [];
    const baseUrl = getBaseUrl();

    schemas.push(generateCorporationSchema() as JsonLdSchema);

    if (!isMainPage && seoMetadata) {
        const pageTitle = seoMetadata.meta_title || DEFAULT_SEO.title;
        const pageDescription = seoMetadata.meta_description || DEFAULT_SEO.description;
        const pageUrl =
            seoMetadata.canonical_url ??
            (typeof window !== "undefined" ? `${baseUrl}${window.location.pathname}` : DEFAULT_SEO.canonical);
        const rawImage = seoMetadata.og_image?.url;
        const imageUrl = rawImage
            ? rawImage.startsWith("http")
                ? rawImage
                : `${baseUrl}${rawImage}`
            : null;

        schemas.push(
            generateProductSchema(pageTitle, pageDescription, pageUrl, imageUrl) as JsonLdSchema
        );
    }

    const faqItems = extractFAQItems(pageContent);
    const faqSchema = generateFAQPageSchema(faqItems);
    if (faqSchema) {
        schemas.push(faqSchema as JsonLdSchema);
    }

    return schemas;
};
