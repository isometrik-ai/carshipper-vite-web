import { useQuery } from "@tanstack/react-query";
import type { FleetTransportResponse } from "@/types/FleetTransport.types";

const STRAPI_API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

/**
 * Fetches Fleet Transport page data from Strapi with full population
 */
const fetchFleetTransport = async (): Promise<FleetTransportResponse> => {
  const response = await fetch(
    `${STRAPI_API_URL}/api/fleet-transport?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate][trust_indicators][populate]=*&populate[page_content][on][shared.hero-section][populate][statistics][populate]=*&populate[page_content][on][shared.hero-section][populate][quick_points][populate]=*&populate[page_content][on][shared.hero-section][populate][background_image][fields][0]=url&populate[page_content][on][shared.hero-section][populate][background_image][fields][1]=alternativeText&populate[page_content][on][shared.hero-section][populate][background_image][fields][2]=width&populate[page_content][on][shared.hero-section][populate][background_image][fields][3]=height&populate[page_content][on][shared.process-section][populate][steps][populate]=*&populate[page_content][on][shared.process-section][populate][cta_button][populate]=*&populate[page_content][on][shared.call-to-action][populate][primary_button][populate]=*&populate[page_content][on][shared.call-to-action][populate][secondary_button][populate]=*&populate[page_content][on][shared.call-to-action][populate][trust_badges][populate]=*`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch fleet transport page: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * React Query hook for fetching Fleet Transport page data
 */
export const useFleetTransport = () =>
  useQuery({
    queryKey: ["fleet-transport"],
    queryFn: fetchFleetTransport,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
