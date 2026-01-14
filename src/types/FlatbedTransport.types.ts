import { CTASection, FaqSection, ProcessCard, ServiceCard, StatsBlock, TableData, TrailerOptions } from "./CaliforniaShipping.types";

export interface FlatbedData {
    service_card: any;
    secondary_section: any;
    compliance: any;
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
export interface FlatbedResponse {
    data: {
        id: number;
        documentId: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        data: FlatbedData;
    };
    meta: any;
}
