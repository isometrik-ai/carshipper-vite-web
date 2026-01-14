import {
    ServiceCard,
    ProcessCard,
    TrailerOptions,
    FaqSection,
    CTASection,
    StatsBlock,
    TableData,
} from "./CaliforniaShipping.types";

/* -------------------------------------------------------
   Secondary Section Types
-------------------------------------------------------- */
export interface SecondaryServiceItem {
    id: number;
    text: string;
    icon_name: string | null;
    href: string | null;
    description: string | null;
}

export interface SecondarySection {
    id: number;
    hero_title: string;
    hero_title_highlight: string | null;
    description: string | null;
    secondary_description: string | null;
    hero_section_tagline: string | null;
    icon_name: string | null;

    services: SecondaryServiceItem[];

    contact: any[]; // API returns empty arrays with no structure
    Stats: any[];
    features: any[];
}

/* -------------------------------------------------------
   Compliance Types
-------------------------------------------------------- */
export interface Compliance {
    id: number;
    hero_title: string;
    hero_title_highlight: string | null;
    description: string;
    secondary_description: string | null;
    hero_section_tagline: string | null;
    icon_name: string | null;

    services: any[];
    contact: any[];
    Stats: any[];
    features: any[];
}

/* -------------------------------------------------------
   Main Heavy Hauling Types
-------------------------------------------------------- */
export interface HeavyHaulingData {
    id: number;
    page_icon: string;
    title: string;
    title_highlight: string;
    description: string;
    page_tagline: string;

    service_cards: ServiceCard[];

    service_card?: {
        id: number;
        title: string;
        servieces: {
            id: number;
            label: string;
            value?: string | null;
            icon_name: string | null;
            descrption?: string | null;
        }[];
    };

    process_cards: ProcessCard[];

    trailer_options: TrailerOptions;

    faqs: FaqSection | null;

    cta: CTASection | null;

    stats: StatsBlock | null;

    solutions: any | null;

    secondary_section: SecondarySection;

    compliance: Compliance;

    table_data: TableData | null;
}

/* -------------------------------------------------------
   Heavy Hauling API Response
-------------------------------------------------------- */
export interface HeavyHaulingResponse {
    data: {
        id: number;
        documentId: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        data: HeavyHaulingData;
    };
    meta: any;
}
