import { useQuery } from "@tanstack/react-query";
import type { QuoteResponse } from "@/types/Quote.types";
import { fetchQuotePageData } from "@/lib/quotePage.utils";
import { QUOTE_PAGE_QUERY_KEY, QUOTE_PAGE_STALE_MS } from "@/lib/quotePage.queries";

/** Shared logging for failed quote page fetches (prefetch on server or `useQuote` on client). */
export function logQuoteFetchFailure(error: unknown): void {
  const err = error instanceof Error ? error : new Error(String(error));
  console.error("Quote fetch error:", err);
}

/**
 * React Query `throwOnError` handler: logs and propagates to the error boundary.
 */
export function handleQuoteQueryError(error: unknown): boolean {
  logQuoteFetchFailure(error);
  return true;
}

/**
 * Quote marketing page data.
 * - With `HydrationBoundary` + prefetch (see `src/app/quote/page.tsx`), omit `initialData` — the hydrated cache is used.
 * - Pass `initialData` when seeding from props (e.g. tests or a parent that already fetched).
 */
export const useQuote = (initialData?: QuoteResponse) =>
  useQuery({
    queryKey: QUOTE_PAGE_QUERY_KEY,
    queryFn: fetchQuotePageData,
    initialData,
    staleTime: QUOTE_PAGE_STALE_MS,
    refetchOnWindowFocus: false,
    /** When `initialData` is provided, skip mount refetch; otherwise follow QueryClient defaults (hydration-friendly). */
    refetchOnMount: initialData !== undefined ? false : undefined,
    throwOnError: handleQuoteQueryError,
  });
