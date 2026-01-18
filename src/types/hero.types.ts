/** ─────────────────────────────────────────────
 *  HERO SECTION API TYPES
 *  Matches JSON from: /api/hero-section?populate=*
 *  ───────────────────────────────────────────── */

export interface HeroSectionResponse {
    data: HeroSectionData;
    meta: Record<string, any>;
}

// MAIN DATA
export interface HeroSectionData {
    id: number;
    documentId: string;
    badgeText: string;
    titleMain: string;
    titleHighlight: string;
    description: RichTextBlock[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    backgroundImage: HeroImage;
    hero: HeroItem[];
    Stats: HeroStat[];
}

// HERO ITEMS
export interface HeroItem {
    id: number;
    label: string;
    subLabel: string | null;
    icon: string | null; // Example: "CheckCircle", "Star"
}

// STATS
export interface HeroStat {
    id: number;
    label: string;
    subLabel: string;
    icon: string | null;
}

import {
    RichTextBlock,
    RichTextChild,
    StrapiImage,
    ImageFormats,
    ImageFormat,
} from "./common.types";

// Re-export for backward compatibility
export type {
    RichTextBlock,
    RichTextChild,
    ImageFormats,
    ImageFormat,
};

export type HeroImage = StrapiImage;
