import type { SeoMetadata } from "@/types/LandingPage.types";

/**
 * Strapi `shared.hero-section` blocks on the quote-into single type (CMS fields may differ from marketing hero).
 */
export interface QuoteIntoPageHeroSection {
  __component: "shared.hero-section";
  id: number;
  description: string | null;
  secondary_description: string | null;
  tagline: string | null;
  tagline_icon: string | null;
  main_headline: string;
  highlighted_text: string | null;
  phone_number: string | null;
  badge_text: string | null;
  badge_icon: string | null;
  FooterTitle: string | null;
  BolderFooterTitle: string | null;
}

/**
 * Strapi `shared.contact-cta` on quote-into (subset / nullable fields per CMS).
 */
export interface QuoteIntoPageContactCTA {
  __component: "shared.contact-cta";
  id: number;
  title: string;
  description: string | null;
  phone_number: string | null;
  phone_label: string | null;
}

export type QuoteIntoPageGuaranteeBlock =
  | QuoteIntoPageHeroSection
  | QuoteIntoPageContactCTA;

/**
 * Trust / review row (no `__component` in current API).
 */
export interface QuoteIntoPageReviewBadge {
  id: number;
  section_title: string;
  section_subtitle: string | null;
  section_icon_name: string | null;
}

/**
 * Strapi `shared.call-to-action` on quote-into (buttons may be omitted by API).
 */
export interface QuoteIntoPageCallToAction {
  __component: "shared.call-to-action";
  id: number;
  icon_name: string | null;
  headline: string;
  description: string | null;
  trust_badges: string[] | null;
  phone_number: string | null;
  phone_href: string | null;
}

/**
 * Single type `quote-into-page` document from Strapi (keys match API casing).
 */
export interface QuoteIntoPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
  SeoMetaData: SeoMetadata | null;
  HeroSection: QuoteIntoPageHeroSection[];
  QuestionSection: QuoteIntoPageContactCTA[];
  GuaranteeSection: QuoteIntoPageGuaranteeBlock[];
  ReadyToShipmentSection: QuoteIntoPageCallToAction[];
  HelpFulQuidesSection?: QuoteIntoPageHeroSection[];
  HelpfulGuidesSection?: QuoteIntoPageHeroSection[];
  ReviewsSection: QuoteIntoPageReviewBadge[];
  localizations: unknown[];
}

export interface QuoteIntoPageResponse {
  data: QuoteIntoPageData;
  meta: Record<string, unknown>;
}
