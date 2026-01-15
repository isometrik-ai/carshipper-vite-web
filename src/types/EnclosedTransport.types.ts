import {
  ServiceCard,
  ProcessCard,
  TrailerOptions,
  FaqSection,
  CTASection,
  StatsBlock,
  SecondarySection,
  GenericServiceItem,
} from "./common.types";
import { StrapiResponseWrapper } from "./api.types";

export interface SolutionsItem {
  id: number;
  icon_name: string | null;
  title: string;
  description: string | null;
}

export interface Solutions {
  id: number;
  title: string;
  sub_title: string | null;
  services: SolutionsItem[];
}

export interface EnclosedTransportData {
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
      href: string | null;
      show_phone: boolean;
    }[];
  } | null;

  process_cards: ProcessCard[];

  trailer_options: TrailerOptions | null;

  faqs: FaqSection | null;

  cta: CTASection | null;

  stats: StatsBlock | null;

  services: any[];

  solutions: Solutions | null;

  secondary_section: SecondarySection | null;

  compliance: any | null;

  table_data: any | null;
}

export interface EnclosedTransportResponse
  extends StrapiResponseWrapper<EnclosedTransportData> {}
