import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { CHAT_WIDGET_ENDPOINT } from "@/constants/apiConstants";

interface ChatWidgetData {
    modal_icon: string;
    modal_title: string;
    modal_description: string;
    modal_close_icon: string;
    welcome_message: string;
    reply_message: string;
    input_placehoder: string;
}

interface ChatWidgetResponse {
    data: ChatWidgetData;
}

const fetchChatWidget = async (): Promise<ChatWidgetData> => {
    const { data } = await apiClient.get<ChatWidgetResponse>(CHAT_WIDGET_ENDPOINT);
    return data.data;
};

export const useChatWidget = () => {
    return useQuery({
        queryKey: ["chat-widget"],
        queryFn: fetchChatWidget,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
};
