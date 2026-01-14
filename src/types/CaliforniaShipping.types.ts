/**
 * California Shipping Types
 * Re-exports common types and defines California-specific types
 */

import {
  StatItem,
  ServiceCard,
  ProcessCard,
  TrailerOptions,
  FaqSection,
  CTASection,
  StatsBlock,
  TableData,
} from "./common.types";

// Re-export common types for backward compatibility
export type {
  StatItem,
  ServiceCard,
  ProcessCard,
  TrailerOptions,
  FaqSection,
  CTASection,
  StatsBlock,
  TableData,
};

export interface CaliforniaShippingData {
  id: number;
  page_icon: string;
  title: string;
  title_highlight: string;
  description: string;
  page_tagline: string;
  service_cards: ServiceCard[];
  process_cards: ProcessCard[];
  trailer_options: TrailerOptions;
  faqs: FaqSection;
  cta: CTASection;
  stats: StatsBlock;
  table_data: TableData;
}

import { StrapiResponseWrapper } from "./api.types";

export interface CaliforniaShippingResponse
  extends StrapiResponseWrapper<CaliforniaShippingData> { }
