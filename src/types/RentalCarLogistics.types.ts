import type { SeoMetadata } from "./LandingPage.types";
import type { SharedTransportContentComponent } from "./SharedTransport.types";

/**
 * Re-export types from LandingPage for reuse
 */
export type {
  HeroSection,
  ProcessSection,
  FAQDisplay,
  CallToAction,
} from "./LandingPage.types";

/**
 * Rental Car Logistics Page Content Component Types
 */
export type RentalCarLogisticsContentComponent =
  | SharedTransportContentComponent
  | import("./LandingPage.types").ProcessSection;

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
