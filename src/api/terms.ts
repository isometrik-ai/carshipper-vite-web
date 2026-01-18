import { useQuery } from "@tanstack/react-query";
import type { PrivacyResponse } from "@/types/Privacy.types";

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337/api";

/**
 * Fetches Terms of Service page data from Strapi with full population
 */
const fetchTerms = async (): Promise<PrivacyResponse> => {
  const response = await fetch(
    `${STRAPI_API_URL}/terms?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[sections][populate][bullet_points][populate]=*`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Terms of Service page: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * React Query hook for fetching Terms of Service page data
 */
export const useTerms = () =>
  useQuery({
    queryKey: ["terms"],
    queryFn: fetchTerms,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
