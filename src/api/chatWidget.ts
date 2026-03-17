import { useQuery } from "@tanstack/react-query";
import type { ChatWidgetResponse } from "@/types/ChatWidget.types";
import { STRAPI_API_URL } from "@/lib/strapi";

/**
 * Fetches Chat Widget data from Strapi with full population
 */
const fetchChatWidget = async (): Promise<ChatWidgetResponse> => {
  const response = await fetch(
    `${STRAPI_API_URL}/api/chat-widget?populate=*`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch chat widget: ${response.statusText}`);
  }

  return response.json();
};

/**
 * React Query hook for fetching Chat Widget data
 */
export const useChatWidget = () =>
  useQuery({
    queryKey: ["chat-widget"],
    queryFn: fetchChatWidget,
    refetchOnWindowFocus: false,
  });
