import {
    GenericServiceItem,
    GenericFeature,
    StatItem,
} from "./common.types";

export type GenericService = GenericServiceItem;
export type GenericStat = StatItem;

export interface HeroSection {
    id: number;
    hero_title: string;
    hero_title_highlight: string | null;
    description: string;
    secondary_description: string | null;
    hero_section_tagline: string | null;
    services: GenericService[];
    features: GenericFeature[];
    Stats: GenericStat[];
}

export interface ShippingProcess {
    id: number;
    title: string;
    description: string;
    icon_name: string;
}

export interface GridSection {
    id: number;
    title: string;
    descrption: string | null;
    shipping_process: ShippingProcess[];
}

import { FAQItem } from "./common.types";

export type FAQ = FAQItem;

export interface Testimonial {
    text: string;
    title: string;
}

export interface OpenTransportData {
    heroSection: HeroSection;
    openTransportSecondaryHeader: HeroSection;
    featuresGrid: GridSection;
    benefits: GridSection;
    faqs: {
        FAQS: FAQ[];
    };
    testimonials: {
        testimonials: Testimonial[];
    };
    safety: HeroSection;
    CTA: {
        title: string;
        description: string;
        primary_button_text: string;
        primary_button_link: string;
    };
}

export interface OpenTransportResponse {
    data: OpenTransportData;
}