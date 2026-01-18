import { useQuery } from "@tanstack/react-query";
import type { FooterResponse } from "@/types/Footer.types";

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337/api";

const fetchFooter = async (): Promise<FooterResponse> => {
  const response = await fetch(
    `${STRAPI_API_URL}/footer?populate[social_links][populate]=*&populate[link_groups][populate][links][populate]=*&populate[seo_link_groups][populate][links][populate]=*&populate[bottom_links][populate]=*`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch footer: ${response.statusText}`);
  }
  
  return response.json();
};

export const useFooter = () =>
  useQuery({
    queryKey: ["footer"],
    queryFn: fetchFooter,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
