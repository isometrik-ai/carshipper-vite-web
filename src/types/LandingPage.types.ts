export interface SeoMetadata {
  id: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_type: string;
  og_url: string | null;
  twitter_card: string;
  twitter_title: string | null;
  twitter_description: string | null;
  robots: string;
  structured_data: unknown | null;
  og_image: {
    id: number;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  } | null;
  twitter_image: {
    id: number;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  } | null;
}

// Page Content Component Types
export interface TrustIndicator {
  id: number;
  text: string;
  icon_name: string;
}

export interface Statistic {
  id: number;
  value: string;
  label: string;
}

export interface HeroSection {
  __component: "shared.hero-section";
  id: number;
  tagline: string | null;
  main_headline: string;
  highlighted_text: string | null;
  description: string | null;
  secondary_description: string | null;
  tagline_icon: string | null;
  phone_number: string | null;
  badge_text: string | null;
  badge_icon: string | null;
  trust_indicators: TrustIndicator[];
  statistics: Statistic[];
  quick_points: Array<{ id: number; text: string }>;
  background_image: {
    id: number;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  } | null;
}

export interface StatsBar {
  __component: "shared.stats-bar";
  id: number;
  statistics: Statistic[];
}

export interface ProcessStep {
  id: number;
  step_number: string | null;
  title: string;
  description: string;
  icon_name: string | null;
  icon_background: string | null;
  icon_color: string | null;
  time_badge: string | null;
  features?: Array<{
    id: number;
    text: string;
  }>;
}

export interface ProcessSection {
  __component: "shared.process-section";
  id: number;
  section_title: string;
  section_subtitle: string | null;
  steps: ProcessStep[];
  cta_button: {
    id: number;
    button_text: string;
    button_link: string | null;
    icon_name: string | null;
    variant: string;
  } | null;
}

export interface ComparisonFeature {
  id: number;
  text: string;
  subtext: string | null;
  is_positive: boolean | null;
}

export interface ComparisonColumn {
  id: number;
  column_title: string;
  is_highlighted: boolean;
  icon_name: string | null;
  title_prefix: string | null;
  bullet_points: Array<{ id: number; text: string }>;
  features: ComparisonFeature[];
}

export interface ComparisonSection {
  __component: "shared.comparison-section";
  id: number;
  section_title: string;
  section_subtitle: string | null;
  columns: ComparisonColumn[];
}

export interface RouteCard {
  id: number;
  origin_city: string;
  destination_city: string;
  distance: string;
  price: string;
  timeline: string;
  is_popular: boolean;
}

export interface PricingDisplay {
  __component: "shared.pricing-display";
  id: number;
  section_title: string;
  section_subtitle: string | null;
  footer_text: string | null;
  routes: RouteCard[];
  cta_button: {
    id: number;
    button_text: string;
    button_link: string | null;
    icon_name: string | null;
    variant: string;
  } | null;
}

export interface Testimonial {
  id: number;
  customer_name: string;
  location: string;
  rating: number;
  vehicle_info: string;
  route_info: string;
  quote_text: string;
  is_verified: boolean;
  author: string | null;
  role: string | null;
  title: string | null;
}

export interface TestimonialsDisplay {
  __component: "shared.testimonials-display";
  id: number;
  section_title: string;
  section_subtitle: string | null;
  rating_summary: string | null;
  view_all_link: string | null;
  testimonials: Testimonial[];
  ratings: Array<{ id: number; score: string; label: string }>;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface FAQDisplay {
  __component: "shared.faq-display";
  id: number;
  section_title: string;
  section_subtitle: string | null;
  icon_name: string | null;
  faq_items: FAQItem[];
  contact_cta: {
    id: number;
    title: string;
    description: string;
    phone_number: string | null;
    phone_label: string | null;
  } | null;
}

export interface CallToAction {
  __component: "shared.call-to-action";
  id: number;
  headline: string;
  description: string | null;
  icon_name: string | null;
  phone_number: string | null;
  phone_href: string | null;
  trust_badges: string[] | null;
  primary_button: {
    id: number;
    button_text: string;
    button_link: string | null;
    icon_name: string | null;
    variant: string;
  } | null;
  secondary_button: {
    id: number;
    button_text: string;
    button_link: string | null;
    icon_name: string | null;
    variant: string;
  } | null;
}

export type PageContentComponent =
  | HeroSection
  | StatsBar
  | ProcessSection
  | ComparisonSection
  | PricingDisplay
  | TestimonialsDisplay
  | FAQDisplay
  | CallToAction;

export interface LandingPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: PageContentComponent[];
}

export interface LandingPageResponse {
  data: LandingPageData;
  meta: Record<string, unknown>;
}
