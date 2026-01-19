import { useQuery } from "@tanstack/react-query";
import type { FlatbedTransportResponse } from "@/types/FlatbedTransport.types";

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337";

/**
 * Fetches Flatbed Transport page data from Strapi with full population
 */
const fetchFlatbedTransport = async (): Promise<FlatbedTransportResponse> => {
  const response = await fetch(
    `${STRAPI_API_URL}/api/flatbed-transport?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate][trust_indicators][populate]=*&populate[page_content][on][shared.hero-section][populate][statistics][populate]=*&populate[page_content][on][shared.hero-section][populate][quick_points][populate]=*&populate[page_content][on][shared.hero-section][populate][background_image][fields][0]=url&populate[page_content][on][shared.hero-section][populate][background_image][fields][1]=alternativeText&populate[page_content][on][shared.hero-section][populate][background_image][fields][2]=width&populate[page_content][on][shared.hero-section][populate][background_image][fields][3]=height&populate[page_content][on][shared.service-cards][populate][service_cards][populate]=*&populate[page_content][on][shared.comparison-table][populate][column_headers][populate]=*&populate[page_content][on][shared.comparison-table][populate][rows][populate][column_values][populate]=*&populate[page_content][on][shared.pricing-info][populate][bullet_points][populate]=*&populate[page_content][on][shared.faq-display][populate][faq_items][populate]=*&populate[page_content][on][shared.faq-display][populate][contact_cta][populate]=*`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch flatbed transport page: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * React Query hook for fetching Flatbed Transport page data
 */
export const useFlatbedTransport = () =>
  useQuery({
    queryKey: ["flatbed-transport"],
    queryFn: fetchFlatbedTransport,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
