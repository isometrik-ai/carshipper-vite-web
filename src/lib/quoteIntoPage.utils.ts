import { apiRequest } from "@/lib/api-client";
import type { QuoteIntoPageResponse } from "@/types/QuoteIntoPage.types";
import { STRAPI_API_URL } from "@/lib/strapi";

const QUOTE_INTO_PAGE_URL = `${STRAPI_API_URL}/api/quote-into-page?populate=*`;

const quoteIntoPageCache: { data?: QuoteIntoPageResponse; timestamp?: number } = {};

export async function fetchQuoteIntoPageData(): Promise<QuoteIntoPageResponse> {
  const now = Date.now();
  if (quoteIntoPageCache.data && quoteIntoPageCache.timestamp && now - quoteIntoPageCache.timestamp < 300_000) {
    return quoteIntoPageCache.data;
  }
  try {
    const response = await apiRequest<QuoteIntoPageResponse>(QUOTE_INTO_PAGE_URL, { method: "GET" });
    if (!response || typeof response !== "object") {
      throw new Error("Invalid response from API");
    }
    quoteIntoPageCache.data = response;
    quoteIntoPageCache.timestamp = now;
    return response;
  } catch (error) {
    console.error("Failed to fetch quote-into page data:", error);
    throw error;
  }
}
