import { useQuery } from "@tanstack/react-query";
import type { FAQResponse } from "@/types/FAQ.types";

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337";

/**
 * Fetches FAQ page data from Strapi with full population
 */
const fetchFAQ = async (): Promise<FAQResponse> => {
    const response = await fetch(
        `${STRAPI_API_URL}/api/faq?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.faq-hero][populate]=*&populate[page_content][on][shared.faq-categories][populate]=*&populate[page_content][on][shared.contact-cta][populate]=*&populate[page_content][on][shared.call-to-action][populate]=*`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch FAQ page: ${response.statusText}`);
    }

    return response.json();
};

/**
 * React Query hook for fetching FAQ page data
 */
export const useFAQ = () =>
    useQuery({
        queryKey: ["faq"],
        queryFn: fetchFAQ,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });
