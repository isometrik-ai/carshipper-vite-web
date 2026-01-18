import type { SeoMetadata } from "./LandingPage.types";

/**
 * Route Item Component
 * Individual route in a route table
 */
export interface RouteItem {
  id: number;
  from: string;
  to: string;
  distance: string;
  time: string;
  cost: string;
  transit_days: string | null;
}

/**
 * Route Table Component
 * Table displaying shipping routes with pricing
 */
export interface RouteTable {
  __component: "shared.route-table";
  id: number;
  section_title: string | null;
  section_description: string | null;
  routes: RouteItem[];
}

/**
 * City Link Component
 * Individual city link item
 */
export interface CityLink {
  id: number;
  city_name: string;
  link: string;
}

/**
 * City Links Component
 * Section with links to city pages
 */
export interface CityLinks {
  __component: "shared.city-links";
  id: number;
  section_title: string | null;
  section_description: string | null;
  cities: CityLink[];
}

/**
 * Re-export types from LandingPage for reuse
 */
export type {
  HeroSection,
  StatsBar,
  ProcessSection,
  FAQDisplay,
  CallToAction,
} from "./LandingPage.types";

/**
 * California Shipping Page Content Component Types
 */
export type CaliforniaShippingContentComponent =
  | import("./LandingPage.types").HeroSection
  | import("./LandingPage.types").StatsBar
  | import("./LandingPage.types").ProcessSection
  | RouteTable
  | CityLinks
  | import("./LandingPage.types").FAQDisplay
  | import("./LandingPage.types").CallToAction;

/**
 * California Shipping Page Data Structure
 */
export interface CaliforniaShippingData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: CaliforniaShippingContentComponent[];
}

/**
 * California Shipping Page API Response
 */
export interface CaliforniaShippingResponse {
  data: CaliforniaShippingData;
  meta: Record<string, unknown>;
}
