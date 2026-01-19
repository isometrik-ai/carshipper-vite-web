import { useQuery } from "@tanstack/react-query";
import type { PricingResponse } from "@/types/Pricing.types";

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337";

/**
 * Fetches Pricing page data from Strapi with full population
 */
const fetchPricing = async (): Promise<PricingResponse> => {
    const response = await fetch(
        `${STRAPI_API_URL}/api/pricing?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate]=*&populate[page_content][on][shared.service-types-section][populate]=*&populate[page_content][on][shared.route-table][populate]=*&populate[page_content][on][shared.pricing-factors-section][populate]=*&populate[page_content][on][shared.included-items-section][populate]=*&populate[page_content][on][shared.call-to-action][populate]=*`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch Pricing page: ${response.statusText}`);
    }

    return response.json();
};

/**
 * React Query hook for fetching Pricing page data
 */
export const usePricing = () =>
    useQuery({
        queryKey: ["pricing"],
        queryFn: fetchPricing,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });
