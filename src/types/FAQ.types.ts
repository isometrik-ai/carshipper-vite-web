import type { SeoMetadata } from "./LandingPage.types";

/**
 * FAQ Hero Component
 * Hero section for FAQ page with search
 */
export interface FAQHero {
    __component: "shared.faq-hero";
    id: number;
    main_headline: string;
    highlighted_text: string;
    description: string;
    search_placeholder: string;
}

/**
 * FAQ Item Component
 * Individual FAQ question and answer
 */
export interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

/**
 * FAQ Category Component
 * FAQ category with grouped questions
 */
export interface FAQCategory {
    id: number;
    category_title: string;
    faqs: FAQItem[];
}

/**
 * FAQ Categories Component
 * Section displaying FAQ categories
 */
export interface FAQCategories {
    __component: "shared.faq-categories";
    id: number;
    empty_state_message: string | null;
    clear_search_button_text: string | null;
    categories: FAQCategory[];
}

/**
 * Contact CTA Component
 * Contact call-to-action section
 */
export interface ContactCTA {
    __component: "shared.contact-cta";
    id: number;
    title: string;
    description: string;
    phone_number: string | null;
    phone_label: string | null;
    primary_button: {
        id: number;
        button_text: string;
        button_link: string | null;
        icon_name: string | null;
        variant: string;
    } | null;
    secondary_button: {
        id: number;
        button_text: string;
        button_link: string | null;
        icon_name: string | null;
        variant: string;
    } | null;
}

/**
 * Re-export types from LandingPage for reuse
 */
export type {
    CallToAction,
} from "./LandingPage.types";

/**
 * FAQ Page Content Component Types
 */
export type FAQContentComponent =
    | FAQHero
    | FAQCategories
    | ContactCTA
    | import("./LandingPage.types").CallToAction;

/**
 * FAQ Page Data Structure
 */
export interface FAQData {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    seo_metadata: SeoMetadata;
    page_content: FAQContentComponent[];
}

/**
 * FAQ Page API Response
 */
export interface FAQResponse {
    data: FAQData;
    meta: Record<string, unknown>;
}
