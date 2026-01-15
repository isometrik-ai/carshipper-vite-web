import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { EnclosedTransportResponse, EnclosedTransportData } from "@/types/EnclosedTransport.types";
import { ENCLOSED_TRANSPORT_ENDPOINT } from "@/constants/apiConstants";

const fetchEnclosedTransport = async (): Promise<EnclosedTransportData> => {
    const { data } = await apiClient.get<EnclosedTransportResponse>(ENCLOSED_TRANSPORT_ENDPOINT);
    return data.data.data;
};

export const useEnclosedTransport = () => {
    return useQuery({
        queryKey: ["enclosed-transport"],
        queryFn: fetchEnclosedTransport,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
