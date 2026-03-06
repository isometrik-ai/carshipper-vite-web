import { useQuery } from "@tanstack/react-query";
import type { DealershipDeliveryResponse } from "@/types/DealershipDelivery.types";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

/**
 * Fetches Dealership Delivery page data from Strapi with full population
 */
const fetchDealershipDelivery = async (): Promise<DealershipDeliveryResponse> => {
  const response = await fetch(
    `${STRAPI_API_URL}/api/dealership-delivery?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate][trust_indicators][populate]=*&populate[page_content][on][shared.hero-section][populate][statistics][populate]=*&populate[page_content][on][shared.hero-section][populate][background_image][fields][0]=url&populate[page_content][on][shared.hero-section][populate][background_image][fields][1]=alternativeText&populate[page_content][on][shared.hero-section][populate][background_image][fields][2]=width&populate[page_content][on][shared.hero-section][populate][background_image][fields][3]=height&populate[page_content][on][shared.service-list][populate][services][populate]=*&populate[page_content][on][shared.process-section][populate][steps][populate]=*&populate[page_content][on][shared.process-section][populate][cta_button][populate]=*&populate[page_content][on][shared.testimonials-display][populate][testimonials][populate]=*&populate[page_content][on][shared.testimonials-display][populate][ratings][populate]=*`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch dealership delivery page: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * React Query hook for fetching Dealership Delivery page data
 */
export const useDealershipDelivery = () =>
  useQuery({
    queryKey: ["dealership-delivery"],
    queryFn: fetchDealershipDelivery,
    refetchOnWindowFocus: false,
  });
