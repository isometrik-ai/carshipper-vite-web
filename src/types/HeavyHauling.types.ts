import {
    ServiceCard,
    ProcessCard,
    TrailerOptions,
    FaqSection,
    CTASection,
    StatsBlock,
    TableData,
    SecondarySection,
    Compliance,
} from "./common.types";
import { StrapiResponseWrapper } from "./api.types";

// SecondarySection and Compliance are now imported from common.types

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
export interface HeavyHaulingResponse
  extends StrapiResponseWrapper<HeavyHaulingData> {}
