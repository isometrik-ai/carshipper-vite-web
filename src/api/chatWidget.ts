import { useQuery } from "@tanstack/react-query";
import type { ChatWidgetResponse } from "@/types/ChatWidget.types";

const STRAPI_API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

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
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
