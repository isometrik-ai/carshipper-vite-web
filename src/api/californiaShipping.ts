import { useQuery } from "@tanstack/react-query";
import type { CaliforniaShippingResponse } from "@/types/CaliforniaShipping.types";
import { STRAPI_API_URL } from "@/lib/strapi";

/**
 * Fetches California Shipping page data from Strapi with full population
 */
const fetchCaliforniaShipping = async (): Promise<CaliforniaShippingResponse> => {
    try {
      const response = await fetch(`${STRAPI_API_URL}/api/california-car-shipping?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate]=*&populate[page_content][on][shared.stats-bar][populate]=*&populate[page_content][on][shared.process-section][populate]=*&populate[page_content][on][shared.route-table][populate]=*&populate[page_content][on][shared.city-links][populate]=*&populate[page_content][on][shared.faq-display][populate]=*&populate[page_content][on][shared.call-to-action][populate]=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch California shipping page: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      // Log error or handle fallback
      throw error;
    }
  };

/**
 * React Query hook for fetching California Shipping page data
 */
export const useCaliforniaShipping = () =>
    useQuery({
        queryKey: ["california-shipping"],
        queryFn: fetchCaliforniaShipping,
        refetchOnWindowFocus: false,
    });
