import { useQuery } from "@tanstack/react-query";
import type { AutoAuctionShippingResponse } from "@/types/AutoAuctionShipping.types";

const STRAPI_API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

/**
 * Fetches Auto Auction Shipping page data from Strapi with full population
 */
const fetchAutoAuctionShipping = async (): Promise<AutoAuctionShippingResponse> => {
  const response = await fetch(
    `${STRAPI_API_URL}/api/auto-auction-shipping?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate][trust_indicators][populate]=*&populate[page_content][on][shared.hero-section][populate][statistics][populate]=*&populate[page_content][on][shared.hero-section][populate][background_image][fields][0]=url&populate[page_content][on][shared.hero-section][populate][background_image][fields][1]=alternativeText&populate[page_content][on][shared.hero-section][populate][background_image][fields][2]=width&populate[page_content][on][shared.hero-section][populate][background_image][fields][3]=height&populate[page_content][on][shared.service-list][populate][services][populate]=*&populate[page_content][on][shared.service-cards][populate][service_cards][populate]=*&populate[page_content][on][shared.process-section][populate][steps][populate]=*&populate[page_content][on][shared.process-section][populate][cta_button][populate]=*&populate[page_content][on][shared.testimonials-display][populate][testimonials][populate]=*&populate[page_content][on][shared.testimonials-display][populate][ratings][populate]=*&populate[page_content][on][shared.alert-warning][populate]=*`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch auto auction shipping page: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * React Query hook for fetching Auto Auction Shipping page data
 */
export const useAutoAuctionShipping = () =>
  useQuery({
queryKey: ["auto-auction-shipping"],
        queryFn: fetchAutoAuctionShipping,
        refetchOnWindowFocus: false,
  });
