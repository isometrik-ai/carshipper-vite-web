import { useQuery } from "@tanstack/react-query";
import type { PrivacyResponse } from "@/types/Privacy.types";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

/**
 * Fetches Privacy Policy page data from Strapi with full population
 */
const fetchPrivacy = async (): Promise<PrivacyResponse> => {
    const response = await fetch(
        `${STRAPI_API_URL}/api/privacy?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[sections][populate][bullet_points][populate]=*`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch Privacy Policy page: ${response.statusText}`);
    }

    return response.json();
};

/**
 * React Query hook for fetching Privacy Policy page data
 */
export const usePrivacy = () =>
    useQuery({
        queryKey: ["privacy-policy"],
        queryFn: fetchPrivacy,
        refetchOnWindowFocus: false,
    });
