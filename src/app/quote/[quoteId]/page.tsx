import QuotePage from "@/containers/QuotePage";
import type { Metadata } from "next";
import { SEO_FALLBACKS } from "@/constants/seo";
import { buildMetadataFromSeo } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { quoteId: string };
}): Promise<Metadata> {
  const safeQuoteId = encodeURIComponent(params?.quoteId || "");
  const title = `Quote | ${safeQuoteId}`.trim();
  const base = buildMetadataFromSeo({
    seo: null,
    defaultTitle: title,
    defaultDescription: SEO_FALLBACKS.global.description,
    canonicalPath: `/quote/${safeQuoteId}`,
  });

  // Quotes are user-specific; do not index.
  return {
    ...base,
    robots: { index: false, follow: false },
  };
}

function QuotePricingPage({ params }: { params: { quoteId: string } }) {
    const { quoteId } = params;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <QuotePage quoteId={quoteId} />
        </div>
    )
}

export default QuotePricingPage;