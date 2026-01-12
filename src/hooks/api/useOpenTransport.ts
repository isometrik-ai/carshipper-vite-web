import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { OpenTransportResponse } from "@/types/open-transport";

const fetchOpenTransport = async (): Promise<OpenTransportResponse> => {
    const { data } = await apiClient.get<OpenTransportResponse>("/api/open-transport?populate[heroSection][populate]=*&populate[openTransportSecondaryHeader][populate]=*&populate[featuresGrid][populate]=*&populate[benefits][populate]=*&populate[faqs][populate]=*&populate[testimonials][populate]=*&populate[safety][populate]=*&populate[CTA][populate]=*");
    return data;
};

export const useOpenTransport = () => {
    return useQuery({
        queryKey: ["open-transport"],
        queryFn: fetchOpenTransport,
        staleTime: 5 * 60 * 1000,
    });
};