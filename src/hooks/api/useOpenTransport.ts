import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { OpenTransportResponse } from "@/types/open-transport";
import { OPEN_TRANSPORT_ENDPOINT } from "@/constants/apiConstants";

const fetchOpenTransport = async (): Promise<OpenTransportResponse> => {
    const { data } = await apiClient.get<OpenTransportResponse>(OPEN_TRANSPORT_ENDPOINT);
    return data;
};

export const useOpenTransport = () => {
    return useQuery({
        queryKey: ["open-transport"],
        queryFn: fetchOpenTransport,
        staleTime: 5 * 60 * 1000,
    });
};