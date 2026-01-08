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

// RICH TEXT (Strapi style)
export interface RichTextBlock {
    type: string;
    children: RichTextChild[];
}

export interface RichTextChild {
    type: string;
    text: string;
}

// BACKGROUND IMAGE
export interface HeroImage {
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

// IMAGE FORMATS
export interface ImageFormats {
    thumbnail: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
    large: ImageFormat;
}

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
