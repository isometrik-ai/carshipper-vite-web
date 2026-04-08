import { useQuery } from "@tanstack/react-query";
import { fetchQuotePageData } from "@/lib/quotePage.utils";
import { QUOTE_PAGE_QUERY_KEY, QUOTE_PAGE_STALE_MS } from "@/lib/quotePage.queries";

/**
 * Quote marketing page data. Hydrates from server `HydrationBoundary` when prefetched; otherwise fetches on the client.
 */
export const useQuote = () =>
    useQuery({
        queryKey: QUOTE_PAGE_QUERY_KEY,
        queryFn: fetchQuotePageData,
        staleTime: QUOTE_PAGE_STALE_MS,
        refetchOnWindowFocus: false,
        throwOnError: (error: Error) => {
            console.error("Quote fetch error:", error);
            return true;
        },
    });