import { useQuery } from "@tanstack/react-query";
import type { QuoteIntoPageResponse } from "@/types/QuoteIntoPage.types";
import { fetchQuoteIntoPageData } from "@/lib/quoteIntoPage.utils";
import { QUOTE_INTO_PAGE_QUERY_KEY, QUOTE_INTO_PAGE_STALE_MS } from "@/lib/quoteIntoPage.queries";

export function logQuoteIntoPageFetchFailure(error: unknown): void {
  const err = error instanceof Error ? error : new Error(String(error));
  console.error("Quote-into page fetch error:", err);
}

export function handleQuoteIntoPageQueryError(error: unknown): boolean {
  logQuoteIntoPageFetchFailure(error);
  return true;
}

type UseQuoteIntoPageOptions = {
  /** Force a browser request on mount even when server hydration already has data. */
  refetchOnMount?: boolean | "always";
};

/**
 * Strapi `quote-into-page` single type (`/api/quote-into-page?populate=*`).
 * Wire UI to this when building the quote-info flow; pass `initialData` if prefetched on the server.
 */
export const useQuoteIntoPage = (
  initialData?: QuoteIntoPageResponse,
  options?: UseQuoteIntoPageOptions
) =>
  useQuery({
    queryKey: QUOTE_INTO_PAGE_QUERY_KEY,
    queryFn: fetchQuoteIntoPageData,
    initialData,
    staleTime: QUOTE_INTO_PAGE_STALE_MS,
    refetchOnWindowFocus: false,
    refetchOnMount: options?.refetchOnMount ?? (initialData !== undefined ? false : undefined),
    throwOnError: handleQuoteIntoPageQueryError,
  });
