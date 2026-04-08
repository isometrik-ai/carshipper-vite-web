import { Query, useQuery } from "@tanstack/react-query";
import type { QuoteResponse } from "@/types/Quote.types";
import { fetchQuotePageData } from "@/lib/quotePage.shared";

/**
 * React Query hook for fetching Quote page data (optional SSR `initialData` from `getQuotePageData`).
 */
export const useQuote = (initialData?: QuoteResponse) =>
    useQuery({
        queryKey: ["quote"],
        queryFn: fetchQuotePageData,
        initialData,
        refetchOnWindowFocus: false,
        refetchOnMount: initialData ? false : "always",
        staleTime: 60 * 1000,
        throwOnError:(error: Error, query: Query<QuoteResponse, Error, QuoteResponse, string[]>) => {
            console.error('Quote fetch error:', error);
            return true;
        },
    });
