import { useQuery } from "@tanstack/react-query";
import type { AboutPageResponse } from "@/types/AboutPage.types";
import { apiRequest } from "@/lib/api-client";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const ABOUT_QUERY =
  "?populate[seo_metadata]=*&populate[page_content][on][shared.hero-section][populate]=*&populate[page_content][on][shared.stats-bar][populate]=*&populate[page_content][on][shared.text-section][populate]=*&populate[page_content][on][shared.process-section][populate]=*&populate[page_content][on][shared.feature-list-section][populate]=*&populate[page_content][on][shared.call-to-action][populate]=*";

const fetchAboutPage = (): Promise<AboutPageResponse> =>
  apiRequest<AboutPageResponse>(`${STRAPI_API_URL}/api/about${ABOUT_QUERY}`, { method: "GET" });

export const useAboutPage = () =>
  useQuery({
    queryKey: ["about-page"],
    queryFn: fetchAboutPage,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (i) => Math.min(1000 * 2 ** i, 5000),
  });
