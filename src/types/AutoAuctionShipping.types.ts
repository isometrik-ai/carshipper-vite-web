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

export interface AutoAuctionShippingData {
  id: number;
  page_icon: string | null;
  title: string;
  title_highlight: string;
  description: string;
  page_tagline: string;
  manager_msg: string | null;
  manager_name: string | null;

  service_cards: ServiceCard[];

  service_card: {
    id: number;
    title: string;
    servieces: {
      id: number;
      label: string;
      value: string | null;
      icon_name: string | null;
      descrption: string | null;
    }[];
  } | null;

  process_cards: ProcessCard[];

  trailer_options: TrailerOptions;

  faqs: FaqSection | null;

  cta: CTASection | null;

  stats: StatsBlock | null;

  services: any[];

  solutions: any | null;

  secondary_section: SecondarySection & {
    services: GenericServiceItem[];
  };

  compliance: {
    id: number;
    hero_title: string;
    description: string;
  } | null;

  table_data: TableData | null;
}

export interface AutoAuctionShippingResponse
  extends StrapiResponseWrapper<AutoAuctionShippingData> {}
