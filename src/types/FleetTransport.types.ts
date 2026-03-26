import type { SeoMetadata } from "./LandingPage.types";
import type { SharedTransportContentComponent } from "./SharedTransport.types";

/**
 * Re-export types from LandingPage for reuse
 */
export type {
  HeroSection,
  ProcessSection,
  CallToAction,
} from "./LandingPage.types";

/**
 * Fleet Transport Page Content Component Types
 */
export type FleetTransportContentComponent =
  | SharedTransportContentComponent
  | import("./LandingPage.types").ProcessSection;

/**
 * Fleet Transport Page Data Structure
 */
export interface FleetTransportData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: FleetTransportContentComponent[];
}

/**
 * Fleet Transport Page API Response
 */
export interface FleetTransportResponse {
  data: FleetTransportData;
  meta: Record<string, unknown>;
}
