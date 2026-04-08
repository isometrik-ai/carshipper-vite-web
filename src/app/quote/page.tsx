import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { logQuoteFetchFailure } from "@/api/quote";
import { QUOTE_PAGE_QUERY_KEY, QUOTE_PAGE_STALE_MS } from "@/lib/quotePage.queries";
import { fetchQuotePageData } from "@/lib/quotePage.utils";
import QuotePageClient from "./QuotePageClient";

export const revalidate = 60;

export default async function QuotePage() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: QUOTE_PAGE_QUERY_KEY,
      queryFn: fetchQuotePageData,
      staleTime: QUOTE_PAGE_STALE_MS,
    });
  } catch (error) {
    logQuoteFetchFailure(error);
    // Prefetch failed (e.g. Strapi down); client `useQuote` will run `queryFn` once mounted.
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QuotePageClient />
    </HydrationBoundary>
  );
}
