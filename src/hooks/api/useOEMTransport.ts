import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { OEMTransportResponse, OEMTransportData } from "@/types/OEMTransport.types";
import { OEM_TRANSPORT_ENDPOINT } from "@/constants/apiConstants";


const fetchOEMTransport = async (): Promise<OEMTransportData> => {
    const { data } = await apiClient.get<OEMTransportResponse>(OEM_TRANSPORT_ENDPOINT);
    return data.data.data;
};

export const useOEMTransport = () => {
    return useQuery({
        queryKey: ["oem-transport"],
        queryFn: fetchOEMTransport,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
