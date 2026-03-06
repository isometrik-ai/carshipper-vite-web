import { useQuery } from "@tanstack/react-query";
import type { ContactResponse } from "@/types/Contact.types";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

/**
 * Fetches Contact page data from Strapi with full population
 */
const fetchContact = async (): Promise<ContactResponse> => {
  const response = await fetch(
    `${STRAPI_API_URL}/api/contact?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate][trust_indicators][populate]=*&populate[page_content][on][shared.hero-section][populate][statistics][populate]=*&populate[page_content][on][shared.hero-section][populate][background_image][fields][0]=url&populate[page_content][on][shared.hero-section][populate][background_image][fields][1]=alternativeText&populate[page_content][on][shared.hero-section][populate][background_image][fields][2]=width&populate[page_content][on][shared.hero-section][populate][background_image][fields][3]=height&populate[page_content][on][shared.contact-methods][populate]=*&populate[page_content][on][shared.contact-form][populate]=*&populate[page_content][on][shared.business-info][populate][info_items]=*`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch contact page: ${response.statusText}`);
  }

  return response.json();
};

/**
 * React Query hook for fetching Contact page data
 */
export const useContact = () =>
  useQuery({
    queryKey: ["contact"],
    queryFn: fetchContact,
    refetchOnWindowFocus: false,
  });
