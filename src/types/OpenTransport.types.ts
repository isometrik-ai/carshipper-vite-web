import type { SeoMetadata } from "./LandingPage.types";

/**
 * Safety Info Section Statistics Item
 */
export interface SafetyInfoStatistic {
  id: number;
  value: string | null;
  label: string | null;
}

/**
 * Safety Info Section Component
 * Section displaying safety information with icon, title, paragraphs, and statistics
 */
export interface SafetyInfoSection {
  __component: "shared.safety-info-section";
  id: number;
  icon_name: string | null;
  section_title: string | null;
  paragraphs: string | null;
  statistics: SafetyInfoStatistic[];
}

/**
 * Re-export types from LandingPage and other pages for reuse
 */
export type {
  HeroSection,
  FAQDisplay,
  CallToAction,
  TestimonialsDisplay,
} from "./LandingPage.types";

export type {
  TextSection,
} from "./AboutPage.types";

export type {
  ServiceCards,
} from "./AutoAuctionShipping.types";

/**
 * Open Transport Page Content Component Types
 */
export type OpenTransportContentComponent =
  | import("./LandingPage.types").HeroSection
  | import("./AboutPage.types").TextSection
  | import("./AutoAuctionShipping.types").ServiceCards
  | SafetyInfoSection
  | import("./LandingPage.types").TestimonialsDisplay
  | import("./LandingPage.types").FAQDisplay
  | import("./LandingPage.types").CallToAction;

/**
 * Open Transport Page Data Structure
 */
export interface OpenTransportData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: OpenTransportContentComponent[];
}

/**
 * Open Transport Page API Response
 */
export interface OpenTransportResponse {
  data: OpenTransportData;
  meta: Record<string, unknown>;
}
