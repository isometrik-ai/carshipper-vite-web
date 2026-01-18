import { useQuery } from "@tanstack/react-query";
import type { OEMTransportResponse } from "@/types/OEMTransport.types";

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337/api";

/**
 * Fetches OEM Transport page data from Strapi with full population
 */
const fetchOEMTransport = async (): Promise<OEMTransportResponse> => {
    const response = await fetch(
        `${STRAPI_API_URL}/oem-transport?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate]=*&populate[page_content][on][shared.feature-list-section][populate]=*&populate[page_content][on][shared.stats-bar][populate]=*&populate[page_content][on][shared.service-cards][populate]=*&populate[page_content][on][shared.faq-display][populate]=*&populate[page_content][on][shared.call-to-action][populate]=*`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch OEM transport page: ${response.statusText}`);
    }

    return response.json();
};

/**
 * React Query hook for fetching OEM Transport page data
 */
export const useOEMTransport = () =>
    useQuery({
        queryKey: ["oem-transport"],
        queryFn: fetchOEMTransport,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });
