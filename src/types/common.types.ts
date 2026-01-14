/**
 * Common/Generic Types
 * Shared types used across multiple modules in the application
 */

/* ─────────────────────────────────────────────
 *  Rich Text Types (Strapi)
 * ───────────────────────────────────────────── */
export interface RichTextChild {
    type: string;
    text: string;
    bold?: boolean;
}

export interface RichTextBlock {
    type: string;
    children: RichTextChild[];
}

/* ─────────────────────────────────────────────
 *  Image Types (Strapi)
 * ───────────────────────────────────────────── */
export interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
}

export interface ImageFormats {
    thumbnail: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
    large: ImageFormat;
}

export interface StrapiImage {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: ImageFormats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

/* ─────────────────────────────────────────────
 *  Stat/Value Types
 * ───────────────────────────────────────────── */
export interface StatItem {
    id?: number;
    label: string;
    value: string | null;
    icon_name?: string | null;
    descrption?: string | null;
    subLabel?: string;
    icon?: string | null;
}

export interface StatDisplay {
    value: string;
    title: string;
}

/* ─────────────────────────────────────────────
 *  FAQ Types
 * ───────────────────────────────────────────── */
export interface FAQItem {
    id: number;
    questions: string;
    answer: string;
}

export interface QuestionCTA {
    title: string;
    description: string;
    primary_button_text: string;
    secondary_button_text?: string | null;
}

export interface FaqSection {
    id: number;
    title: string;
    sub_title: string | null;
    icon_name: string | null;
    FAQS: FAQItem[];
    QuestionCTA: QuestionCTA | null;
}

/* ─────────────────────────────────────────────
 *  CTA Section Types
 * ───────────────────────────────────────────── */
export interface CTASection {
    id?: number;
    title: string;
    description: string;
    primary_button_text: string;
    primary_button_link: string | null;
    secondary_button_text: string | null;
    secondary_button_link: string | null;
    show_phone?: boolean;
    icon_name?: string | null;
    trustBadges?: any | null;
}

/* ─────────────────────────────────────────────
 *  Service Item Types
 * ───────────────────────────────────────────── */
export interface GenericServiceItem {
    id: number;
    text: string;
    icon_name: string | null;
    href: string | null;
    description: string | null;
}

export interface ServiceItem {
    id: number;
    text: string;
    icon_name: string | null;
    href: string | null;
    description: string | null;
    label?: string | null;
    value?: string | null;
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

/* ─────────────────────────────────────────────
 *  Process Card Types
 * ───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
 *  Trailer Options Types
 * ───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
 *  Stats Block Types
 * ───────────────────────────────────────────── */
export interface StatsBlock {
    id: number;
    stats: StatDisplay[];
}

/* ─────────────────────────────────────────────
 *  Table Types
 * ───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
 *  Secondary Section Types
 * ───────────────────────────────────────────── */
export interface SecondarySection {
    id: number;
    hero_title: string;
    hero_title_highlight: string | null;
    description: string | null;
    secondary_description: string | null;
    hero_section_tagline: string | null;
    icon_name: string | null;
    services: GenericServiceItem[];
    contact: any[];
    Stats: any[];
    features: any[];
}

/* ─────────────────────────────────────────────
 *  Compliance Types
 * ───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
 *  Feature Types
 * ───────────────────────────────────────────── */
export interface GenericFeature {
    id: number;
    label: string;
    value: string | null;
    icon_name: string | null;
}

export interface FeatureItem {
    id: number;
    label: string;
    value: string;
    icon_name: string | null;
}

/* ─────────────────────────────────────────────
 *  Navigation Link Types
 * ───────────────────────────────────────────── */
export interface NavLink {
    id: number;
    label: string;
    url: string;
}
