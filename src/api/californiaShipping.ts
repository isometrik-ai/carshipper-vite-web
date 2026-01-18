import { useQuery } from "@tanstack/react-query";
import type { CaliforniaShippingResponse } from "@/types/CaliforniaShipping.types";

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337/api";

/**
 * Fetches California Shipping page data from Strapi with full population
 */
const fetchCaliforniaShipping = async (): Promise<CaliforniaShippingResponse> => {
    const response = await fetch(
        `${STRAPI_API_URL}/california-car-shipping?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate]=*&populate[page_content][on][shared.stats-bar][populate]=*&populate[page_content][on][shared.process-section][populate]=*&populate[page_content][on][shared.route-table][populate]=*&populate[page_content][on][shared.city-links][populate]=*&populate[page_content][on][shared.faq-display][populate]=*&populate[page_content][on][shared.call-to-action][populate]=*`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch California shipping page: ${response.statusText}`);
    }

    return response.json();
};

/**
 * React Query hook for fetching California Shipping page data
 */
export const useCaliforniaShipping = () =>
    useQuery({
        queryKey: ["california-shipping"],
        queryFn: fetchCaliforniaShipping,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });
