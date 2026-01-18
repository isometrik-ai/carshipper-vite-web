import type { SeoMetadata } from "./LandingPage.types";

/**
 * Vehicle Type Item Component
 * Individual vehicle type item
 */
export interface VehicleTypeItem {
  id: number;
  name: string;
}

/**
 * Vehicle Types Grid Component
 * Grid display of vehicle types
 */
export interface VehicleTypesGrid {
  __component: "shared.vehicle-types-grid";
  id: number;
  section_title: string | null;
  section_subtitle: string | null;
  vehicle_types: VehicleTypeItem[];
}

/**
 * Trailer Type Item Component
 * Individual trailer type item
 */
export interface TrailerTypeItem {
  id: number;
  type: string;
  capacity: string;
  description: string;
}

/**
 * Trailer Types Component
 * Section displaying different trailer options
 */
export interface TrailerTypes {
  __component: "shared.trailer-types";
  id: number;
  section_title: string | null;
  section_subtitle: string | null;
  trailer_types: TrailerTypeItem[];
}

/**
 * Re-export types from LandingPage and other pages for reuse
 */
export type {
  HeroSection,
  ProcessSection,
  ComparisonSection,
  TestimonialsDisplay,
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
 * Enclosed Transport Page Content Component Types
 */
export type EnclosedTransportContentComponent =
  | import("./LandingPage.types").HeroSection
  | import("./AboutPage.types").TextSection
  | VehicleTypesGrid
  | import("./AutoAuctionShipping.types").ServiceCards
  | import("./LandingPage.types").ComparisonSection
  | TrailerTypes
  | import("./LandingPage.types").TestimonialsDisplay
  | import("./LandingPage.types").FAQDisplay
  | import("./LandingPage.types").CallToAction;

/**
 * Enclosed Transport Page Data Structure
 */
export interface EnclosedTransportData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: EnclosedTransportContentComponent[];
}

/**
 * Enclosed Transport Page API Response
 */
export interface EnclosedTransportResponse {
  data: EnclosedTransportData;
  meta: Record<string, unknown>;
}
