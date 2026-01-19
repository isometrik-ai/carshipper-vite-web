import { useQuery } from "@tanstack/react-query";
import type { RentalCarLogisticsResponse } from "@/types/RentalCarLogistics.types";

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337";

/**
 * Fetches Rental Car Logistics page data from Strapi with full population
 */
const fetchRentalCarLogistics = async (): Promise<RentalCarLogisticsResponse> => {
    const response = await fetch(
        `${STRAPI_API_URL}/api/rental-car-logistics?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate]=*&populate[page_content][on][shared.process-section][populate]=*&populate[page_content][on][shared.comparison-section][populate]=*&populate[page_content][on][shared.pricing-display][populate]=*&populate[page_content][on][shared.testimonials-display][populate]=*&populate[page_content][on][shared.faq-display][populate]=*&populate[page_content][on][shared.call-to-action][populate]=*`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch Rental Car Logistics page: ${response.statusText}`);
    }

    return response.json();
};

/**
 * React Query hook for fetching Rental Car Logistics page data
 */
export const useRentalCarLogistics = () =>
    useQuery({
        queryKey: ["rental-car-logistics"],
        queryFn: fetchRentalCarLogistics,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });
