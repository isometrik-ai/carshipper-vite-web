import { useQuery } from "@tanstack/react-query";
import type { TrackShipmentResponse } from "@/types/TrackShipment.types";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

/**
 * Fetches Track Shipment page data from Strapi with full population
 */
const fetchTrackShipment = async (): Promise<TrackShipmentResponse> => {
    const response = await fetch(
        `${STRAPI_API_URL}/api/track-shipment?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate]=*&populate[page_content][on][shared.tracking-form][populate]=*&populate[page_content][on][shared.tracking-steps-section][populate]=*&populate[page_content][on][shared.service-cards][populate]=*&populate[page_content][on][shared.call-to-action][populate]=*`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch Track Shipment page: ${response.statusText}`);
    }

    return response.json();
};

/**
 * React Query hook for fetching Track Shipment page data
 */
export const useTrackShipment = () =>
    useQuery({
        queryKey: ["track-shipment"],
        queryFn: fetchTrackShipment,
        refetchOnWindowFocus: false,
    });
