import { useQuery } from "@tanstack/react-query";
import type { ContactResponse } from "@/types/Contact.types";
import { STRAPI_API_URL } from "@/lib/strapi";
import { CONTACT_QUERY } from "./query.constants";
/**
 * Fetches Contact page data from Strapi with full population
 */
const fetchContact = async (): Promise<ContactResponse> => {
  try {
    const response = await fetch(
      `${STRAPI_API_URL}/api/contact?${CONTACT_QUERY}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch contact page: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    // Log error or handle fallback
    throw new Error(`Network or parsing error: ${error.message}`);
  }
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
