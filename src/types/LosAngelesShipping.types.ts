import {
    CTASection,
    FaqSection,
    ProcessCard,
    ServiceCard,
    TrailerOptions,
} from "./CaliforniaShipping.types";

export interface LosAngelesServiceItem {
    id: number;
    label: string | null;
    value: string | null;
    icon_name: string | null;
    descrption: string | null;
}

export interface LosAngelesServiceCard {
    id: number;
    title: string | null;
    servieces: LosAngelesServiceItem[];
}

export interface LosAngelesNeighborhood {
    id: number;
    text: string;
    icon_name: string | null;
    href: string | null;
    description: string | null;
}

export interface LosAngelesContactInfo {
    id: number;
    text: string;
    icon_name: string | null;
    href: string | null;
    description: string | null;
}

export interface LosAngelesSecondarySection {
    id: number;
    hero_title: string | null;
    hero_title_highlight: string | null;
    description: string | null;
    secondary_description: string | null;
    hero_section_tagline: string | null;
    icon_name: string | null;
    services: LosAngelesNeighborhood[];
    contact: LosAngelesContactInfo[];
    Stats: any[]; // You can replace with a specific interface if needed
    features: any[];
}

export interface LosAngelesCompliance {
    id: number;
    hero_title: string | null;
    hero_title_highlight: string | null;
    description: string | null;
    secondary_description: string | null;
    hero_section_tagline: string | null;
    icon_name: string | null;
    services: LosAngelesServiceItem[];
    contact: LosAngelesContactInfo[];
    Stats: any[];
    features: any[];
}

export interface LosAngelesStatsEntry {
    value: string;
    title: string;
}

export interface LosAngelesStats {
    id: number;
    stats: LosAngelesStatsEntry[];
}

export interface LosAngelesSolutionService {
    id: number;
    icon_name: string | null;
    title: string;
    description: string;
}

export interface LosAngelesSolutions {
    id: number;
    title: string;
    sub_title: string | null;
    services: LosAngelesSolutionService[];
}

export interface LosAngelesTableHeader {
    from: string;
    to: string;
    distance: string;
    time: string;
    cost: string;
}

export interface LosAngelesTableEntry {
    id: number;
    table_title: string;
    table_sub_title: string;
    table_header: string[];
    table_cell_data: LosAngelesTableHeader[];
}

export interface LosAngelesTableData {
    id: number;
    title: string | null;
    sub_title: string | null;
    table: LosAngelesTableEntry[];
}

export interface LosAngelesData {
    id: number;
    page_icon: string;
    title: string;
    title_highlight: string;
    description: string;
    page_tagline: string;
    manager_msg: string | null;
    manager_name: string | null;
    service_cards: ServiceCard[]; // From shared type — KEEP
    service_card: LosAngelesServiceCard;
    process_cards: ProcessCard[];
    trailer_options: TrailerOptions | null;
    faqs: FaqSection;
    cta: CTASection;
    stats: LosAngelesStats;
    services: LosAngelesServiceItem[];
    solutions: LosAngelesSolutions;
    secondary_section: LosAngelesSecondarySection;
    compliance: LosAngelesCompliance;
    table_data: LosAngelesTableData;
}

export interface LosAngelesDataResponse {
    data: {
        id: number;
        documentId: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        data: LosAngelesData;
    };
    meta: any;
}
