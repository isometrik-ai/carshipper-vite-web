import type { SeoMetadata } from "./LandingPage.types";

/**
 * Text Section Component
 * Simple text content section with title and paragraphs
 */
export interface TextSection {
    __component: "shared.text-section";
    id: number;
    section_title: string | null;
    paragraphs: string | null;
    bullet_points: Array<{
        id: number;
        text: string;
    }>;
}

/**
 * Feature List Section Component
 * Section with title, intro, bullet points, and closing text
 */
export interface FeatureListSection {
    __component: "shared.feature-list-section";
    id: number;
    section_title: string | null;
    intro_text: string | null;
    bullet_points: Array<{
        id: number;
        text: string;
    }>;
    closing_text: string | null;
}

/**
 * Re-export types from LandingPage for reuse
 */
export type {
    HeroSection,
    StatsBar,
    ProcessSection,
    CallToAction,
    PageContentComponent as LandingPageContentComponent,
} from "./LandingPage.types";

/**
 * About Page Content Component Types
 */
export type AboutPageContentComponent =
    | import("./LandingPage.types").HeroSection
    | import("./LandingPage.types").StatsBar
    | TextSection
    | import("./LandingPage.types").ProcessSection
    | FeatureListSection
    | import("./LandingPage.types").CallToAction;

/**
 * About Page Data Structure
 */
export interface AboutPageData {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    seo_metadata: SeoMetadata;
    page_content: AboutPageContentComponent[];
}

/**
 * About Page API Response
 */
export interface AboutPageResponse {
    data: AboutPageData;
    meta: Record<string, unknown>;
}
