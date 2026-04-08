/** TanStack Query key for marketing /quote page — must match `useQuote` and server prefetch. */
export const QUOTE_PAGE_QUERY_KEY = ["quote"] as const;

/** Aligns with `export const revalidate = 60` on the quote route. */
export const QUOTE_PAGE_STALE_MS = 60 * 1000;
