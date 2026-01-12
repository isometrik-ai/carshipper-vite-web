export interface Feature {
    text: string;
    subtext: string;
    positive: boolean | null;
}

export interface Comparison {
    title: string;
    highlight: boolean;
    features: Feature[];
}

export interface ShippingRoute {
    from: string;
    to: string;
    distance: string;
    price: string;
    timeline: string;
    popular: boolean;
}

export interface Testimonial {
    name: string;
    location: string;
    rating: number;
    vehicle: string;
    route: string;
    quote: string;
    verified: boolean;
}

export interface FAQItem {
    id: number;
    questions: string;
    answer: string;
}

export interface QuestionCTA {
    title: string;
    description: string;
    primary_button_text: string;
    secondary_button_text: string;
}

export interface CTASection {
    title: string;
    description: string;
    primary_button_text: string;
    secondary_button_text: string;
    trustBadges: string[];
}

export interface LandingPageData {
    landingPageSeo?: {
        title: string;
        content: string;
    };
    trustBar?: {
        stats: Array<{ value: string; label: string }>;
    };
    why_choose_us?: {
        comparions: Comparison[];
    };
    pricing_section?: {
        title: string;
        sub_title: string;
        routes: ShippingRoute[];
        button_label: string;
        route_title: string;
    };
    TestimonialsSection?: {
        testimonial_title: string;
        testimonial_sub_title: string;
        testimonial_reviews: string;
        testimonials: Testimonial[];
        testimonial_reviews_link: string;
    };
    FAQSection?: {
        title: string;
        sub_title: string;
        FAQS: FAQItem[];
        QuestionCTA: QuestionCTA;
    };
    FinalCTA?: CTASection[];
}


export interface TrustBarProps {
    stats: Array<{ value: string; label: string }>;
}

export interface WhyChooseUsProps {
    comparisons: Comparison[];
}

export interface PricingSectionProps {
    title: string;
    subTitle: string;
    routes: ShippingRoute[];
    buttonLabel: string;
    routeTitle: string;
}

export interface TestimonialsSectionProps {
    title: string;
    subTitle: string;
    testimonials: Testimonial[];
    reviewsInfo: string;
    testimonialsLink: string;
}

// landing-page.types.ts
export interface FAQSectionProps {
    data?: {
        title: string;
        sub_title: string;
        FAQS: FAQItem[];
        QuestionCTA: QuestionCTA;
    };
}

export interface FinalCTAProps {
    content?: CTASection;
}