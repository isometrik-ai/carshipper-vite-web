import type { SeoMetadata } from "./LandingPage.types";

/**
 * Comparison Table Column Header
 */
export interface ComparisonTableColumnHeader {
  id: number;
  header_text: string;
  is_highlighted: boolean;
}

/**
 * Comparison Table Row
 */
export interface ComparisonTableRow {
  id: number;
  feature: string;
  cells?: Array<{ id: number; value: string }>;
}

/**
 * Comparison Table Component
 * Table for comparing different options (e.g., pricing by distance or vehicle type)
 */
export interface ComparisonTable {
  __component: "shared.comparison-table";
  id: number;
  section_title: string | null;
  section_subtitle: string | null;
  column_headers: ComparisonTableColumnHeader[];
  rows: ComparisonTableRow[];
}

/**
 * Section Intro Component
 * Simple section with title and description
 */
export interface SectionIntro {
  __component: "shared.section-intro";
  id: number;
  section_title: string | null;
  section_description: string | null;
}

/**
 * Simple Step Component
 * Individual step in a simple steps section
 */
export interface SimpleStep {
  id: number;
  step_number: string | null;
  title: string;
  description: string;
}

/**
 * Simple Steps Section Component
 * Section displaying simple numbered steps
 */
export interface SimpleStepsSection {
  __component: "shared.simple-steps-section";
  id: number;
  section_title: string | null;
  section_subtitle: string | null;
  steps: SimpleStep[];
}

/**
 * Re-export types from LandingPage and other pages for reuse
 */
export type {
  HeroSection,
  StatsBar,
  CallToAction,
} from "./LandingPage.types";

export type {
  PricingFactorsSection,
} from "./Pricing.types";

/**
 * Quote Page Content Component Types
 */
export type QuoteContentComponent =
  | import("./LandingPage.types").HeroSection
  | import("./LandingPage.types").StatsBar
  | SectionIntro
  | ComparisonTable
  | import("./Pricing.types").PricingFactorsSection
  | SimpleStepsSection
  | import("./LandingPage.types").CallToAction;

/**
 * Quote Page Data Structure
 */
export interface QuoteData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: QuoteContentComponent[];
}

/**
 * Quote Page API Response
 */
export interface QuoteResponse {
  data: QuoteData;
  meta: Record<string, unknown>;
}
