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

export interface OEMTransportData {
  id: number;
  page_icon: string | null;
  title: string;
  title_highlight: string;
  description: string | null;
  page_tagline: string | null;
  manager_msg: string | null;
  manager_name: string | null;

  service_cards: ServiceCard[];

  service_card: null;

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

export interface OEMTransportResponse
  extends StrapiResponseWrapper<OEMTransportData> {}
