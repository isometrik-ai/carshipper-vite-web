export interface StatItem {
  id?: number;
  label?: string;
  value?: string;
  icon_name?: string | null;
  descrption?: string | null;
}

export interface ServiceCard {
  id: number;
  hero_title: string;
  hero_title_highlight: string | null;
  description: string | null;
  secondary_description: string | null;
  hero_section_tagline: string | null;
  icon_name: string | null;
  services: any[];
  contact: any[];
  Stats: StatItem[];
  features: any[];
}

export interface ProcessServiceItem {
  id: number;
  text: string;
  icon_name: string | null;
  href: string | null;
  description: string | null;
}

export interface ProcessContactItem {
  id: number;
  text: string;
  icon_name: string | null;
  href: string | null;
  description: string | null;
}

export interface ProcessCard {
  id: number;
  hero_title: string;
  hero_title_highlight: string | null;
  description: string | null;
  secondary_description: string | null;
  hero_section_tagline: string | null;
  icon_name: string | null;
  services: ProcessServiceItem[];
  contact: ProcessContactItem[];
  Stats: any[];
  features: any[];
}

export interface TrailerService {
  id: number;
  text: string;
  icon_name: string | null;
  href: string | null;
  description: string | null;
}

export interface TrailerOptions {
  id: number;
  hero_title: string;
  hero_title_highlight: string | null;
  description: string | null;
  secondary_description: string | null;
  hero_section_tagline: string | null;
  icon_name: string | null;
  services: TrailerService[];
  contact: any[];
  Stats: any[];
  features: any[];
}

export interface FaqItem {
  id: number;
  questions: string;
  answer: string;
}

export interface FaqSection {
  id: number;
  title: string;
  sub_title: string | null;
  icon_name: string | null;
  FAQS: FaqItem[];
  QuestionCTA: any | null;
}

export interface CTASection {
  id: number;
  title: string;
  description: string;
  primary_button_text: string;
  primary_button_link: string | null;
  secondary_button_text: string | null;
  secondary_button_link: string | null;
  show_phone: boolean;
  icon_name: string | null;
  trustBadges: any | null;
}

export interface StatDisplay {
  value: string;
  title: string;
}

export interface StatsBlock {
  id: number;
  stats: StatDisplay[];
}

export interface TableRow {
  from: string;
  to: string;
  distance: string;
  time: string;
  cost: string;
}

export interface TableItem {
  id: number;
  table_title: string;
  table_sub_title: string;
  table_header: string[];
  table_cell_data: TableRow[];
}

export interface TableData {
  id: number;
  title: string | null;
  sub_title: string | null;
  table: TableItem[];
}

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

export interface CaliforniaShippingResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    data: CaliforniaShippingData;
  };
  meta: any;
}
