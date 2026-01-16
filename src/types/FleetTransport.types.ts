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
} from "./common.types";
import { StrapiResponseWrapper } from "./api.types";

export interface SolutionsItem {
  id: number;
  icon_name: string | null;
  title: string;
  description: string;
}

export interface SolutionsBlock {
  id: number;
  title: string;
  sub_title: string;
  services: SolutionsItem[];
}

export interface FleetTransportData {
  id: number;
  page_icon: string;
  title: string;
  title_highlight: string;
  description: string;
  page_tagline: string;

  service_cards: ServiceCard[];

  service_card: null;

  process_cards: ProcessCard[];

  trailer_options: TrailerOptions;

  faqs: FaqSection | null;

  cta: CTASection | null;

  stats: StatsBlock | null;

  solutions: SolutionsBlock | null;

  secondary_section: SecondarySection & {
    services: GenericServiceItem[];
  };

  compliance: any | null;

  table_data: TableData | null;
}

export interface FleetTransportResponse
  extends StrapiResponseWrapper<FleetTransportData> { }
