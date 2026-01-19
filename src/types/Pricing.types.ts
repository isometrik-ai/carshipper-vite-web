import type { SeoMetadata } from "./LandingPage.types";

/**
 * Service Type Item Component
 * Individual service type with pricing and features
 */
export interface ServiceTypeItem {
  id: number;
  service_name: string;
  price: string;
  description: string;
  is_recommended: boolean;
  recommended_badge_text: string | null;
  features?: Array<{ id: number; text: string }>;
}

/**
 * Service Types Section Component
 * Section displaying different service types/transport options
 */
export interface ServiceTypesSection {
  __component: "shared.service-types-section";
  id: number;
  section_title: string | null;
  service_types: ServiceTypeItem[];
}

/**
 * Pricing Factor Item Component
 * Individual pricing factor
 */
export interface PricingFactorItem {
  id: number;
  factor_name: string;
  description: string;
  icon_name: string | null;
}

/**
 * Pricing Factors Section Component
 * Section displaying factors that affect pricing
 */
export interface PricingFactorsSection {
  __component: "shared.pricing-factors-section";
  id: number;
  section_title: string | null;
  section_description: string | null;
  factors: PricingFactorItem[];
}

/**
 * Included Item Component
 * Individual included item
 */
export interface IncludedItem {
  id: number;
  text: string;
}

/**
 * Included Items Section Component
 * Section displaying what's included in every quote
 */
export interface IncludedItemsSection {
  __component: "shared.included-items-section";
  id: number;
  section_title: string | null;
  items: IncludedItem[];
}

/**
 * Re-export types from LandingPage and other pages for reuse
 */
export type {
  HeroSection,
  CallToAction,
} from "./LandingPage.types";

export type {
  RouteTable,
} from "./CaliforniaShipping.types";

/**
 * Pricing Page Content Component Types
 */
export type PricingContentComponent =
  | import("./LandingPage.types").HeroSection
  | ServiceTypesSection
  | import("./CaliforniaShipping.types").RouteTable
  | PricingFactorsSection
  | IncludedItemsSection
  | import("./LandingPage.types").CallToAction;

/**
 * Pricing Page Data Structure
 */
export interface PricingData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: PricingContentComponent[];
}

/**
 * Pricing Page API Response
 */
export interface PricingResponse {
  data: PricingData;
  meta: Record<string, unknown>;
}
