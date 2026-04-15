import type {
  QuoteIntoPageCallToAction,
  QuoteIntoPageContactCTA,
  QuoteIntoPageGuaranteeBlock,
  QuoteIntoPageHeroSection,
  QuoteIntoPageResponse,
  QuoteIntoPageReviewBadge,
} from "@/types/QuoteIntoPage.types";

function isHero(block: QuoteIntoPageGuaranteeBlock): block is QuoteIntoPageHeroSection {
  return block.__component === "shared.hero-section";
}

function isContactCta(block: QuoteIntoPageGuaranteeBlock): block is QuoteIntoPageContactCTA {
  return block.__component === "shared.contact-cta";
}

/**
 * Normalized view of Strapi `quote-into-page` for UI (parallel to `pageData` on marketing /quote).
 */
export type QuoteIntoPageViewModel = {
  hero: QuoteIntoPageHeroSection | null;
  questionBlocks: QuoteIntoPageContactCTA[];
  guaranteeHero: QuoteIntoPageHeroSection | null;
  guaranteeContact: QuoteIntoPageContactCTA | null;
  readyToShipment: QuoteIntoPageCallToAction | null;
  helpfulGuides: QuoteIntoPageHeroSection | null;
  reviews: QuoteIntoPageReviewBadge[];
};

export function parseQuoteIntoPageResponse(
  response: QuoteIntoPageResponse | undefined
): QuoteIntoPageViewModel | null {
  const d = response?.data;
  if (!d) return null;

  const guaranteeBlocks = d.GuaranteeSection ?? [];
  const guaranteeHero = guaranteeBlocks.find(isHero) ?? null;
  const guaranteeContact = guaranteeBlocks.find(isContactCta) ?? null;

  return {
    hero: d.HeroSection?.[0] ?? null,
    questionBlocks: d.QuestionSection ?? [],
    guaranteeHero,
    guaranteeContact,
    readyToShipment: d.ReadyToShipmentSection?.[0] ?? null,
    helpfulGuides: d?.HelpfulGuidesSection?.[0] ?? d?.HelpFulQuidesSection?.[0] ?? null,
    reviews: d.ReviewsSection ?? [],
  };
}
