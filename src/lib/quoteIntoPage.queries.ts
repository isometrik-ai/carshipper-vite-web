/** TanStack Query key for Strapi `quote-into-page` — must match `useQuoteIntoPage` and any prefetch. */
export const QUOTE_INTO_PAGE_QUERY_KEY = ["quote-into-page"] as const;

/** Align with typical Strapi ISR / marketing route revalidation (see quote page). */
export const QUOTE_INTO_PAGE_STALE_MS = 60 * 1000;
