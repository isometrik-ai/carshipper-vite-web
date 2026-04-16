import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { logQuoteIntoPageFetchFailure } from "@/api/quoteIntoPage";
import { QUOTE_INTO_PAGE_QUERY_KEY, QUOTE_INTO_PAGE_STALE_MS } from "@/lib/quoteIntoPage.queries";
import { fetchQuoteIntoPageData } from "@/lib/quoteIntoPage.utils";
import { PageSkeleton } from "@/components/ui/page-skeleton";

const QuoteInfoPageClient = dynamic(() => import("./QuoteInfoPageClient"), {
  ssr: false,
  loading: () => <PageSkeleton />,
});

export const revalidate = 60;

export default async function QuoteInfoPage({ params }: { params: { quoteId: string } }) {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: QUOTE_INTO_PAGE_QUERY_KEY,
      queryFn: fetchQuoteIntoPageData,
      staleTime: QUOTE_INTO_PAGE_STALE_MS,
    });
  } catch (error) {
    logQuoteIntoPageFetchFailure(error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QuoteInfoPageClient params={params} />
    </HydrationBoundary>
  );
}
