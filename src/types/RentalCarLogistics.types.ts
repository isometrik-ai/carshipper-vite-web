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

export interface RentalCarLogisticsData {
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

  trailer_options: TrailerOptions | null;

  faqs: FaqSection | null;

  cta: CTASection | null;

  stats: StatsBlock | null;

  services: StatItem[];

  solutions: any | null;

  secondary_section: SecondarySection & {
    services: GenericServiceItem[];
  };

  compliance: any | null;

  table_data: TableData | null;
}

export interface RentalCarLogisticsResponse
  extends StrapiResponseWrapper<RentalCarLogisticsData> {}
