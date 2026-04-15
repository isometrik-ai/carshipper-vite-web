import { useQuery } from "@tanstack/react-query";
import type { QuoteResponse } from "@/containers/QuotePage";
import { QuoteGetDetailsAPI } from "@/services/quote-services";

export const QUOTE_DETAILS_QUERY_KEY = "quote-details";

export function logQuoteDetailsFetchFailure(error: unknown): void {
  const err = error instanceof Error ? error : new Error(String(error));
  console.error("Quote details fetch error:", err);
}

export const fetchQuoteDetailsData = async (quoteId: string): Promise<QuoteResponse> => {
  const response = await QuoteGetDetailsAPI(quoteId);
  return ((response as any)?.data ?? response) as QuoteResponse;
};

export const useQuoteDetails = (quoteId?: string) =>
  useQuery({
    queryKey: [QUOTE_DETAILS_QUERY_KEY, quoteId],
    enabled: Boolean(quoteId),
    queryFn: () => fetchQuoteDetailsData(quoteId as string),
    // Keep behavior non-blocking for this page flow.
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError: (error) => {
      logQuoteDetailsFetchFailure(error);
      return false;
    },
  });
