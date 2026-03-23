import { useQuery } from "@tanstack/react-query";
import type { AutoAuctionShippingResponse } from "@/types/AutoAuctionShipping.types";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

/**
 * Fetches Auto Auction Shipping page data from Strapi with full population
 */
const fetchAutoAuctionShipping = async (): Promise<AutoAuctionShippingResponse> => {
  const seoFieldsQuery =
    "populate[seo_metadata][fields][0]=meta_title" +
    "&populate[seo_metadata][fields][1]=meta_description" +
    "&populate[seo_metadata][fields][2]=meta_keywords" +
    "&populate[seo_metadata][fields][3]=canonical_url" +
    "&populate[seo_metadata][fields][4]=og_title" +
    "&populate[seo_metadata][fields][5]=og_description" +
    "&populate[seo_metadata][fields][6]=og_type" +
    "&populate[seo_metadata][fields][7]=og_url" +
    "&populate[seo_metadata][fields][8]=twitter_card" +
    "&populate[seo_metadata][fields][9]=twitter_title" +
    "&populate[seo_metadata][fields][10]=twitter_description" +
    "&populate[seo_metadata][fields][11]=robots";

  const response = await fetch(
    `${STRAPI_API_URL}/api/auto-auction-shipping?${seoFieldsQuery}&populate[page_content]=*`
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
