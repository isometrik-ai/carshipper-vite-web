import { useQuery } from "@tanstack/react-query";
import type { LandingPageResponse } from "@/types/LandingPage.types";

const STRAPI_API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

/**
 * Fetches How It Works page data from Strapi with full population
 */
const fetchHowItWorks = async (): Promise<LandingPageResponse> => {
    const response = await fetch(
        `${STRAPI_API_URL}/api/how-it-work?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate]=*&populate[page_content][on][shared.process-section][populate]=*&populate[page_content][on][shared.testimonials-display][populate]=*&populate[page_content][on][shared.call-to-action][populate]=*&populate[page_content][on][shared.comparison-section][populate]=*&populate[page_content][on][shared.comparison-section][populate][columns][populate]=*&populate[page_content][on][shared.comparison-section][populate][columns][populate][bullet_points][populate]=*&populate[page_content][on][shared.comparison-section][populate][columns][populate][features][populate]=*`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch How It Works page: ${response.statusText}`);
    }

    return response.json();
};

/**
 * React Query hook for fetching How It Works page data
 */
export const useHowItWorks = () =>
    useQuery({
        queryKey: ["how-it-work"],
        queryFn: fetchHowItWorks,
        refetchOnWindowFocus: false,
    });
