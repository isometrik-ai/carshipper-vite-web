export interface GenericService {
    id: number;
    text: string;
    icon_name: string;
    href: string | null;
}

export interface GenericFeature {
    id: number;
    label: string;
    value: string | null;
    icon_name: string | null;
}

export interface GenericStat {
    id: number;
    label: string;
    value: string | null;
    icon_name: string | null;
}

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

export interface FAQ {
    id: number;
    questions: string;
    answer: string;
}

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