import type { SeoMetadata } from "./LandingPage.types";

/**
 * Service List Component
 * List of services with checkmarks
 */
export interface ServiceList {
  __component: "shared.service-list";
  id: number;
  section_title: string | null;
  services: Array<{
    id: number;
    text: string;
  }>;
}

/**
 * Service Card Component
 * Individual service card with icon, title, and description
 */
export interface ServiceCard {
  id: number;
  icon_name: string | null;
  title: string;
  description: string;
}

/**
 * Service Cards Component
 * Section with title, subtitle, and service cards
 */
export interface ServiceCards {
  __component: "shared.service-cards";
  id: number;
  section_title: string | null;
  section_subtitle: string | null;
  service_cards: ServiceCard[];
}

/**
 * Alert Warning Component
 * Alert/warning section with icon, title, and message
 */
export interface AlertWarning {
  __component: "shared.alert-warning";
  id: number;
  icon_name: string | null;
  title: string;
  message: string;
}

/**
 * Re-export types from LandingPage for reuse
 */
export type {
  HeroSection,
  ProcessSection,
  TestimonialsDisplay,
} from "./LandingPage.types";

/**
 * Auto Auction Shipping Page Content Component Types
 */
export type AutoAuctionShippingContentComponent =
  | import("./LandingPage.types").HeroSection
  | ServiceList
  | ServiceCards
  | import("./LandingPage.types").ProcessSection
  | import("./LandingPage.types").TestimonialsDisplay
  | AlertWarning;

/**
 * Auto Auction Shipping Page Data Structure
 */
export interface AutoAuctionShippingData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: AutoAuctionShippingContentComponent[];
}

/**
 * Auto Auction Shipping Page API Response
 */
export interface AutoAuctionShippingResponse {
  data: AutoAuctionShippingData;
  meta: Record<string, unknown>;
}
