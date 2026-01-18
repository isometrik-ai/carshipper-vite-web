import type { SeoMetadata } from "./LandingPage.types";

/**
 * Neighborhood Item Component
 * Individual neighborhood item
 */
export interface NeighborhoodItem {
  id: number;
  name: string;
}

/**
 * Neighborhoods Section Component
 * Section displaying neighborhoods/areas
 */
export interface NeighborhoodsSection {
  __component: "shared.neighborhoods-section";
  id: number;
  section_title: string | null;
  section_description: string | null;
  neighborhoods: NeighborhoodItem[];
}

/**
 * Related Page Link Component
 * Individual related page link (uses navigation-link component)
 */
export interface RelatedPageLink {
  id: number;
  label: string;
  href: string;
  icon_name: string | null;
}

/**
 * Related Pages Section Component
 * Section displaying related page links
 */
export interface RelatedPagesSection {
  __component: "shared.related-pages-section";
  id: number;
  links: RelatedPageLink[];
}

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
  RouteTable,
} from "./CaliforniaShipping.types";

export type {
  ServiceCards,
} from "./AutoAuctionShipping.types";

/**
 * Los Angeles Shipping Page Content Component Types
 */
export type LosAngelesShippingContentComponent =
  | import("./LandingPage.types").HeroSection
  | import("./LandingPage.types").StatsBar
  | NeighborhoodsSection
  | import("./CaliforniaShipping.types").RouteTable
  | import("./AutoAuctionShipping.types").ServiceCards
  | import("./LandingPage.types").FAQDisplay
  | RelatedPagesSection
  | import("./LandingPage.types").CallToAction;

/**
 * Los Angeles Shipping Page Data Structure
 */
export interface LosAngelesShippingData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: LosAngelesShippingContentComponent[];
}

/**
 * Los Angeles Shipping Page API Response
 */
export interface LosAngelesShippingResponse {
  data: LosAngelesShippingData;
  meta: Record<string, unknown>;
}
