import type { SeoMetadata } from "./LandingPage.types";

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
  | import("./LandingPage.types").HeroSection
  | import("./LandingPage.types").ProcessSection
  | import("./LandingPage.types").CallToAction;

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
