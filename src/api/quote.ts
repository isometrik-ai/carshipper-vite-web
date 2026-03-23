import { Query, useQuery } from "@tanstack/react-query";
import type { QuoteResponse } from "@/types/Quote.types";
import { STRAPI_API_URL } from "@/lib/strapi";
/**
 * Fetches Quote page data from Strapi with full population
 */
const fetchQuote = async (): Promise<QuoteResponse> => {
    try {
        const response = await fetch(`${STRAPI_API_URL}/api/quote?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate]=*&populate[page_content][on][shared.stats-bar][populate]=*&populate[page_content][on][shared.section-intro][populate]=*&populate[page_content][on][shared.comparison-table][populate]=*&populate[page_content][on][shared.pricing-factors-section][populate]=*&populate[page_content][on][shared.simple-steps-section][populate]=*&populate[page_content][on][shared.call-to-action][populate]=*`);
        if (!response.ok) {
            throw new Error(`Failed to fetch Quote page: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        // Log error or handle fallback
        throw error;
    }
};

/**
 * React Query hook for fetching Quote page data
 */
export const useQuote = () =>
    useQuery({
        queryKey: ["quote"],
        queryFn: fetchQuote,
        refetchOnWindowFocus: false,
        throwOnError:(error: Error, query: Query<QuoteResponse, Error, QuoteResponse, string[]>) => {
            console.error('Quote fetch error:', error);
            return true;
        },
    });
