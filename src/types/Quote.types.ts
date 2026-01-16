import {
  ServiceCard,
  ProcessCard,
  TrailerOptions,
  FaqSection,
  CTASection,
  StatsBlock,
  TableData,
  SecondarySection,
  GenericServiceItem,
  StatItem,
} from "./common.types";
import { StrapiResponseWrapper } from "./api.types";

export interface QuoteData {
  id: number;
  page_icon: string | null;
  title: string;
  title_highlight: string;
  description: string | null;
  page_tagline: string | null;
  manager_msg: string | null;
  manager_name: string | null;

  service_cards: ServiceCard[];

  service_card: {
    id: number;
    title: string | null;
    servieces: {
      id: number;
      label: string;
      value: string | null;
      icon_name: string | null;
      descrption: string | null;
    }[];
  } | null;

  process_cards: ProcessCard[];

  trailer_options: TrailerOptions | null;

  faqs: FaqSection | null;

  cta: CTASection | null;

  stats: StatsBlock | null;

  services: StatItem[];

  solutions: any | null;

  secondary_section: SecondarySection | null;

  compliance: any | null;

  table_data: {
    id: number;
    title: string | null;
    sub_title: string | null;
    table: {
      id: number;
      table_title: string;
      table_sub_title: string | null;
      table_header: string[];
      table_cell_data: any[];
    }[];
  } | null;
}

export interface QuoteResponse
  extends StrapiResponseWrapper<QuoteData> {}
