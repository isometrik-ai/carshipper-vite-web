import { useQuery } from "@tanstack/react-query";
import type { OpenTransportResponse } from "@/types/OpenTransport.types";

const STRAPI_API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

/**
 * Fetches Open Transport page data from Strapi with full population
 */
const fetchOpenTransport = async (): Promise<OpenTransportResponse> => {
    const response = await fetch(
        `${STRAPI_API_URL}/api/open-transport?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate]=*&populate[page_content][on][shared.text-section][populate]=*&populate[page_content][on][shared.service-cards][populate]=*&populate[page_content][on][shared.safety-info-section][populate]=*&populate[page_content][on][shared.testimonials-display][populate]=*&populate[page_content][on][shared.faq-display][populate]=*&populate[page_content][on][shared.call-to-action][populate]=*`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch Open transport page: ${response.statusText}`);
    }

    return response.json();
};

/**
 * React Query hook for fetching Open Transport page data
 */
export const useOpenTransport = () =>
    useQuery({
        queryKey: ["open-transport"],
        queryFn: fetchOpenTransport,
        refetchOnWindowFocus: false,
    });
