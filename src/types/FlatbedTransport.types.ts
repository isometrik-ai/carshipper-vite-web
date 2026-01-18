import type { SeoMetadata } from "./LandingPage.types";

/**
 * Comparison Table Header Component
 * Column header in comparison table
 */
export interface ComparisonTableHeader {
  id: number;
  header_text: string;
  is_highlighted: boolean;
}

/**
 * Comparison Table Cell Component
 * Individual cell value in comparison table row
 */
export interface ComparisonTableCell {
  id: number;
  value: string;
  column_index?: number;
}

/**
 * Comparison Table Row Component
 * Row in comparison table with feature and column values
 */
export interface ComparisonTableRow {
  id: number;
  feature: string;
  column_values?: ComparisonTableCell[];
}

/**
 * Comparison Table Component
 * Table format comparison with rows and columns
 */
export interface ComparisonTable {
  __component: "shared.comparison-table";
  id: number;
  section_title: string | null;
  section_subtitle: string | null;
  column_headers: ComparisonTableHeader[];
  rows: ComparisonTableRow[];
}

/**
 * Pricing Info Component
 * Pricing information section with icon and bullet points
 */
export interface PricingInfo {
  __component: "shared.pricing-info";
  id: number;
  icon_name: string | null;
  title: string;
  description: string;
  bullet_points: Array<{
    id: number;
    text: string;
  }>;
}

/**
 * Re-export types from LandingPage and other pages for reuse
 */
export type {
  HeroSection,
  FAQDisplay,
} from "./LandingPage.types";

export type {
  ServiceCards,
} from "./AutoAuctionShipping.types";

/**
 * Flatbed Transport Page Content Component Types
 */
export type FlatbedTransportContentComponent =
  | import("./LandingPage.types").HeroSection
  | import("./AutoAuctionShipping.types").ServiceCards
  | ComparisonTable
  | PricingInfo
  | import("./LandingPage.types").FAQDisplay;

/**
 * Flatbed Transport Page Data Structure
 */
export interface FlatbedTransportData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: FlatbedTransportContentComponent[];
}

/**
 * Flatbed Transport Page API Response
 */
export interface FlatbedTransportResponse {
  data: FlatbedTransportData;
  meta: Record<string, unknown>;
}
