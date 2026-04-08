import { apiRequest } from "@/lib/api-client";
import type { QuoteResponse } from "@/types/Quote.types";
import { STRAPI_API_URL } from "@/lib/strapi";

/** Strapi populate query for the marketing /quote page (must stay in sync with Strapi schema). */
const QUOTE_PAGE_QUERY =
  "populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate]=*&populate[page_content][on][shared.stats-bar][populate]=*&populate[page_content][on][shared.section-intro][populate]=*&populate[page_content][on][shared.comparison-table][populate]=*&populate[page_content][on][shared.pricing-factors-section][populate]=*&populate[page_content][on][shared.simple-steps-section][populate]=*&populate[page_content][on][shared.call-to-action][populate]=*";

export async function fetchQuotePageData(): Promise<QuoteResponse> {
  const url = `${STRAPI_API_URL}/api/quote?${QUOTE_PAGE_QUERY}`;
  try {
    const response = await apiRequest<QuoteResponse>(url, { method: "GET" });
    if (!response || typeof response !== "object") {
      throw new Error("Invalid response from API");
    }
    return response;
  } catch (error) {
    console.error("Failed to fetch quote page data:", error);
    throw error;
  }
}
