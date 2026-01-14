const API_BASE_URL = import.meta.env.VITE_API_URL;

const GENERIC_SEO_POPULATE = `populate[data][populate][service_cards][populate]=*&
populate[data][populate][service_card][populate]=*&populate[data][populate][process_cards][populate]=*&populate[data][populate][trailer_options][populate]=*&populate[data][populate][faqs][populate]=*&populate[data][populate][cta][populate]=*&
populate[data][populate][stats][populate]=*&populate[data][populate][services][populate]=*&populate[data][populate][solutions][populate]=*&populate[data][populate][secondary_section][populate]=*&populate[data][populate][compliance][populate]=*&populate[data][populate][table_data][populate]=*`

/**
 * Helper to build Strapi URLs with nested population logic.
 * This keeps the endpoint definitions clean and readable.
 */
const buildUrl = (path: string, params?: string) => {
    const query = params ? `?${params}` : "";
    return `${API_BASE_URL}/api/${path}${query}`;
};

export const FAQ_ENDPOINT = buildUrl(
    "faq",
    "populate[FaqCategories][populate]=FAQS"
);

export const ABOUT_ENDPOINT = buildUrl(
    "about",
    "populate[StatsItems][populate]=*&populate[ValueItems][populate]=*&populate[Why30Items][populate]=*&populate[sharedCTA][populate]=*"
);

export const PRICING_ENDPOINT = buildUrl("pricing", "populate=*");

export const CONTACT_ENDPOINT = buildUrl(
    "contact",
    "populate[contact_methods]=*&populate[contact_form]=*&populate[business_info][populate]=*"
);

export const FOOTER_ENDPOINT = buildUrl(
    "footer",
    "populate[feature_items]=*&populate[socialLinks]=*&populate[footerColumn][populate]=*&populate[horizontalGroups][populate]=*&populate[bottom_bar]=*"
);

export const HEADER_ENDPOINT = buildUrl("header", "populate=*");

export const HOW_IT_WORKS_ENDPOINT = buildUrl(
    "how-it-work",
    "populate[hero_section][populate]=*&populate[verifiedQuotes][populate]=*&populate[customerSay][populate]=*&populate[shipping][populate]=*"
);

export const LANDING_PAGE_ENDPOINT = buildUrl("landing-page", "populate[FAQSection][populate]=*&populate[TestimonialsSection][populate]=*&populate[landingPageSeo][populate]=*&populate[FinalCTA][populate]=*&populate[trustBar][populate]=*&populate[why_choose_us][populate]=*&populate[pricing_section][populate]=*");

export const CALIFORNIA_ENDPOINT = buildUrl('california', GENERIC_SEO_POPULATE)

export const LOS_ANGELS_ENDPOINT = buildUrl('los-angeles-city', GENERIC_SEO_POPULATE)

export const FLATBED_TRANSPORT_ENDPOINT = buildUrl('flatbed-transport', GENERIC_SEO_POPULATE)

export const HEAVY_HAULING_ENDPOINT = buildUrl('heavy-hauling', GENERIC_SEO_POPULATE)