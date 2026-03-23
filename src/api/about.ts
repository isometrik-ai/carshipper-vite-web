import { Query, useQuery } from "@tanstack/react-query";
import type { AboutPageResponse } from "@/types/AboutPage.types";
import { apiRequest } from "@/lib/api-client";
import { ABOUT_QUERY } from "./query.constants";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const fetchAboutPage = async (): Promise<AboutPageResponse> => {
  if (!STRAPI_API_URL || !STRAPI_API_URL.startsWith('https://') && !STRAPI_API_URL.startsWith('http://')) {
    throw new Error('Invalid API URL');
  }
  try {
    const response = await apiRequest<AboutPageResponse>
    (`${STRAPI_API_URL}/api/about${ABOUT_QUERY}`, { method: "GET" });
    if (!response) {
      throw new Error('Failed to fetch about page: no response');
    }
    return response;
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
};

export const useAboutPage = () =>
  useQuery({
    queryKey: ["about-page"],
    queryFn: fetchAboutPage,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (i) => Math.min(1000 * 2 ** i, 5000),
    throwOnError: (error: Error, query: Query<AboutPageResponse, Error, AboutPageResponse, string[]>) => {
      console.error('About page fetch error:', error);
      return true;
    }
});