import { useQuery } from "@tanstack/react-query";
import type { HeavyHaulingResponse } from "@/types/HeavyHauling.types";

const STRAPI_API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

/**
 * Fetches Heavy Hauling page data from Strapi with full population
 */
const fetchHeavyHauling = async (): Promise<HeavyHaulingResponse> => {
  const response = await fetch(
    `${STRAPI_API_URL}/api/heavy-hauling?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate][trust_indicators][populate]=*&populate[page_content][on][shared.hero-section][populate][statistics][populate]=*&populate[page_content][on][shared.hero-section][populate][quick_points][populate]=*&populate[page_content][on][shared.hero-section][populate][background_image][fields][0]=url&populate[page_content][on][shared.hero-section][populate][background_image][fields][1]=alternativeText&populate[page_content][on][shared.hero-section][populate][background_image][fields][2]=width&populate[page_content][on][shared.hero-section][populate][background_image][fields][3]=height&populate[page_content][on][shared.service-list][populate][services][populate]=*&populate[page_content][on][shared.service-cards][populate][service_cards][populate]=*&populate[page_content][on][shared.process-section][populate][steps][populate]=*&populate[page_content][on][shared.process-section][populate][cta_button][populate]=*&populate[page_content][on][shared.trailer-types][populate][trailer_types][populate]=*&populate[page_content][on][shared.alert-warning][populate]=*`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch heavy hauling page: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * React Query hook for fetching Heavy Hauling page data
 */
export const useHeavyHauling = () =>
  useQuery({
    queryKey: ["heavy-hauling"],
    queryFn: fetchHeavyHauling,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
