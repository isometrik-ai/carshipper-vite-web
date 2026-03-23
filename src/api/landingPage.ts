import { Query, useQuery } from "@tanstack/react-query";
import type { LandingPageResponse } from "@/types/LandingPage.types";
import { apiRequest } from "@/lib/api-client";
import { LANDING_QUERY } from "./query.constants";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? (() => { throw new Error('Missing environment variable: NEXT_PUBLIC_STRAPI_API_URL'); })();

  const fetchLandingPage = async (): Promise<LandingPageResponse> => {
    try {
      const response = await apiRequest<LandingPageResponse>(`${STRAPI_API_URL}/api/landing-page${LANDING_QUERY}`, {
        method: "GET"
      });
      if (!response) {
        throw new Error('Landing page response is undefined or null');
      }
      return response;
    } catch (error) {
      // Handle or propagate error appropriately
      throw new Error(`Failed to fetch landing page: ${error.message}`);
    }
  };

  export const useLandingPage = () => {
    const queryResult = useQuery({
      queryKey: ["landing-page"],
      queryFn: () => fetchLandingPage().catch((error) => {
        console.error('Failed to fetch landing page:', error);
        throw error;
      }),
      refetchOnWindowFocus: false,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
      throwOnError: (error: Error, query: Query<LandingPageResponse, Error, LandingPageResponse, string[]>) => {
        console.error('Landing page fetch error:', error);
        return true;
      }
    });
    return queryResult;
  };