import type { SeoMetadata } from "./LandingPage.types";

/**
 * Re-export types from LandingPage for reuse
 */
export type {
  HeroSection,
  ProcessSection,
  FAQDisplay,
  CallToAction,
} from "./LandingPage.types";

export type {
  TextSection,
} from "./AboutPage.types";

export type {
  ServiceCards,
} from "./AutoAuctionShipping.types";

/**
 * Rental Car Logistics Page Content Component Types
 */
export type RentalCarLogisticsContentComponent =
  | import("./LandingPage.types").HeroSection
  | import("./AboutPage.types").TextSection
  | import("./AutoAuctionShipping.types").ServiceCards
  | import("./LandingPage.types").ProcessSection
  | import("./LandingPage.types").FAQDisplay
  | import("./LandingPage.types").CallToAction;

/**
 * Rental Car Logistics Page Data Structure
 */
export interface RentalCarLogisticsData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: RentalCarLogisticsContentComponent[];
}

/**
 * Rental Car Logistics Page API Response
 */
export interface RentalCarLogisticsResponse {
  data: RentalCarLogisticsData;
  meta: Record<string, unknown>;
}
