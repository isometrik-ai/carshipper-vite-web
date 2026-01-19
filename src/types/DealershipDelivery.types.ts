import type { SeoMetadata } from "./LandingPage.types";

/**
 * Re-export types from LandingPage and AutoAuctionShipping for reuse
 */
export type {
  HeroSection,
  ProcessSection,
  TestimonialsDisplay,
} from "./LandingPage.types";

export type {
  ServiceList,
} from "./AutoAuctionShipping.types";

/**
 * Dealership Delivery Page Content Component Types
 */
export type DealershipDeliveryContentComponent =
  | import("./LandingPage.types").HeroSection
  | import("./AutoAuctionShipping.types").ServiceList
  | import("./LandingPage.types").ProcessSection
  | import("./LandingPage.types").TestimonialsDisplay;

/**
 * Dealership Delivery Page Data Structure
 */
export interface DealershipDeliveryData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: DealershipDeliveryContentComponent[];
}

/**
 * Dealership Delivery Page API Response
 */
export interface DealershipDeliveryResponse {
  data: DealershipDeliveryData;
  meta: Record<string, unknown>;
}
