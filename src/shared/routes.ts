import { SAFE_QUOTE_ID_REGEX, UNSAFE_QUOTE_ID_CHARS_REGEX } from "@/lib/regx.constant";

export const ROUTES_LIST = {
  QUOTE: "/quote",
};

// Centralized helpers for building app routes
export const getQuoteRoute = (quoteId: string) => `${ROUTES_LIST.QUOTE}/${quoteId}`;

/**
 * Normalize and validate quote IDs in a single place.
 * Returns null if the ID is invalid or empty.
 */
export const getSafeQuoteId = (rawId: string): string | null => {
  if (typeof rawId !== "string" || !rawId) {
    return null;
  }

  if (!SAFE_QUOTE_ID_REGEX.test(rawId)) {
    return null;
  }

  return rawId.replace(UNSAFE_QUOTE_ID_CHARS_REGEX, "");
};

/**
 * Builds a safe quote route (`/quote/:id`) or returns null if the ID is invalid.
 */
export const getSafeQuoteRoute = (rawId: string): string | null => {
  const safeId = getSafeQuoteId(rawId);
  return safeId ? getQuoteRoute(safeId) : null;
};

/**
 * Remove the # from the quote id
 */
export const removeHashFromQuoteId = (rawId: string): string | null => {
  if (typeof rawId !== "string" || !rawId) {
    return null;
  }
  return rawId.trim().replace(/^#/, "");
};