import { Query, useQuery } from "@tanstack/react-query";
import type { LandingPageResponse } from "@/types/LandingPage.types";
import { apiRequest } from "@/lib/api-client";
import { LANDING_QUERY } from "./query.constants";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? (() => { throw new Error('Missing environment variable: NEXT_PUBLIC_STRAPI_API_URL'); })();

export const fetchLandingPage = async (): Promise<LandingPageResponse> => {
  try {
    const response = await apiRequest<LandingPageResponse>(`${STRAPI_API_URL}/api/landing-page${LANDING_QUERY}`, {
      method: "GET",
    });
    if (!response) {
      throw new Error("Landing page response is undefined or null");
    }
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch landing page: ${message}`);
  }
};

export const useLandingPage = (initialData?: LandingPageResponse) => {
  const queryResult = useQuery({
    queryKey: ["landing-page"],
    queryFn: fetchLandingPage,
    initialData,
    refetchOnWindowFocus: false,
    refetchOnMount: initialData ? false : "always",
    staleTime: 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    throwOnError: (error: Error, _query) => {
      console.error("Landing page fetch error:", error);
      return true;
    },
  });
  return queryResult;
};