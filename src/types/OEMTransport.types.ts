import type { SeoMetadata } from "./LandingPage.types";
import type { SharedTransportContentComponent } from "./SharedTransport.types";
import type { StatsBar } from "./LandingPage.types";

/**
 * Re-export types from LandingPage and other pages for reuse
 */
export type {
  HeroSection,
  StatsBar,
  FAQDisplay,
  CallToAction,
} from "./LandingPage.types";

export type {
  FeatureListSection,
  TextSection,
} from "./AboutPage.types";

export type {
  ServiceCards,
} from "./AutoAuctionShipping.types";

/**
 * OEM Transport Page Content Component Types
 */
export type OEMTransportContentComponent =
  | SharedTransportContentComponent
  | import("./AboutPage.types").FeatureListSection
  | StatsBar;

/**
 * OEM Transport Page Data Structure
 */
export interface OEMTransportData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: OEMTransportContentComponent[];
}

/**
 * OEM Transport Page API Response
 */
export interface OEMTransportResponse {
  data: OEMTransportData;
  meta: Record<string, unknown>;
}
