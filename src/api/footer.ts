import { Query, useQuery } from "@tanstack/react-query";
import type { FooterResponse } from "@/types/Footer.types";
import { apiRequest } from "@/lib/api-client";
import { FOOTER_QUERY } from "./query.constants";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const fetchFooter = (): Promise<FooterResponse> =>
  apiRequest<FooterResponse>(`${STRAPI_API_URL}/api/footer${FOOTER_QUERY}`, { method: "GET" });

export const useFooter = () => {
  return useQuery({
    queryKey: ["footer"],
    queryFn: () => fetchFooter().catch((error) => {
      // Handle error explicitly to prevent unhandled promise rejection
      console.error('Failed to fetch footer:', error);
      throw error;
    }),
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (i) => Math.min(1000 * 2 ** i, 5000),
    throwOnError: (error: Error, query: Query<FooterResponse, Error, FooterResponse, string[]>) => {
      console.error('Footer fetch error:', error);
      return true;
    }
  });
};
