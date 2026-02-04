import { useQuery } from "@tanstack/react-query";
import type { AboutPageResponse } from "@/types/AboutPage.types";

const STRAPI_API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

/**
 * Fetches About page data from Strapi with full population
 */
const fetchAboutPage = async (): Promise<AboutPageResponse> => {
  const response = await fetch(
    `${STRAPI_API_URL}/api/about?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate]=*&populate[page_content][on][shared.stats-bar][populate]=*&populate[page_content][on][shared.text-section][populate]=*&populate[page_content][on][shared.process-section][populate]=*&populate[page_content][on][shared.feature-list-section][populate]=*&populate[page_content][on][shared.call-to-action][populate]=*`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch about page: ${response.statusText}`);
  }

  return response.json();
};

/**
 * React Query hook for fetching About page data
 */
export const useAboutPage = () =>
  useQuery({
    queryKey: ["about-page"],
    queryFn: fetchAboutPage,
    refetchOnWindowFocus: false,
  });
