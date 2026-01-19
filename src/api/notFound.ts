import { useQuery } from "@tanstack/react-query";
import type { NotFoundResponse } from "@/types/NotFound.types";

const STRAPI_API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

/**
 * Fetches NotFound page data from Strapi with full population
 */
const fetchNotFound = async (): Promise<NotFoundResponse> => {
  const response = await fetch(
    `${STRAPI_API_URL}/api/not-found?populate=*`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch not-found page: ${response.statusText}`);
  }

  return response.json();
};

/**
 * React Query hook for fetching NotFound page data
 */
export const useNotFound = () =>
  useQuery({
    queryKey: ["not-found"],
    queryFn: fetchNotFound,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
