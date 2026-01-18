import { useQuery } from "@tanstack/react-query";
import type { EnclosedTransportResponse } from "@/types/EnclosedTransport.types";

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337/api";

/**
 * Fetches Enclosed Transport page data from Strapi with full population
 */
const fetchEnclosedTransport = async (): Promise<EnclosedTransportResponse> => {
    const response = await fetch(
        `${STRAPI_API_URL}/enclosed-transport?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate]=*&populate[page_content][on][shared.text-section][populate]=*&populate[page_content][on][shared.vehicle-types-grid][populate]=*&populate[page_content][on][shared.service-cards][populate]=*&populate[page_content][on][shared.comparison-section][populate]=*&populate[page_content][on][shared.trailer-types][populate]=*&populate[page_content][on][shared.testimonials-display][populate]=*&populate[page_content][on][shared.faq-display][populate]=*&populate[page_content][on][shared.call-to-action][populate]=*`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch enclosed transport page: ${response.statusText}`);
    }

    return response.json();
};

/**
 * React Query hook for fetching Enclosed Transport page data
 */
export const useEnclosedTransport = () =>
    useQuery({
        queryKey: ["enclosed-transport"],
        queryFn: fetchEnclosedTransport,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });
