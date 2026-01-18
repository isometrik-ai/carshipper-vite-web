import type { SeoMetadata } from "./LandingPage.types";

/**
 * Re-export types from other pages for reuse
 */
export type {
  HeroSection,
  ProcessSection,
} from "./LandingPage.types";

export type {
  ServiceList,
  ServiceCards,
  AlertWarning,
} from "./AutoAuctionShipping.types";

export type {
  TrailerTypes,
} from "./EnclosedTransport.types";

/**
 * Heavy Hauling Page Content Component Types
 */
export type HeavyHaulingContentComponent =
  | import("./LandingPage.types").HeroSection
  | import("./AutoAuctionShipping.types").ServiceList
  | import("./AutoAuctionShipping.types").ServiceCards
  | import("./LandingPage.types").ProcessSection
  | import("./EnclosedTransport.types").TrailerTypes
  | import("./AutoAuctionShipping.types").AlertWarning;

/**
 * Heavy Hauling Page Data Structure
 */
export interface HeavyHaulingData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: HeavyHaulingContentComponent[];
}

/**
 * Heavy Hauling Page API Response
 */
export interface HeavyHaulingResponse {
  data: HeavyHaulingData;
  meta: Record<string, unknown>;
}
