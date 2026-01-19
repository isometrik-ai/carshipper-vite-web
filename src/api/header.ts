import { useQuery } from "@tanstack/react-query";
import type { HeaderResponse } from "@/types/Header.types";

const STRAPI_API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

const fetchHeader = async (): Promise<HeaderResponse> => {
  const response = await fetch(`${STRAPI_API_URL}/api/header?populate=*`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch header: ${response.statusText}`);
  }
  
  return response.json();
};

export const useHeader = () =>
  useQuery({
    queryKey: ["header"],
    queryFn: fetchHeader,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
