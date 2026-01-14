import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { FleetTransportResponse, FleetTransportData } from "@/types/FleetTransport.types";

const ENDPOINT = "/api/fleet-transport?populate=*";

const fetchFleetTransport = async (): Promise<FleetTransportData> => {
    const { data } = await apiClient.get<FleetTransportResponse>(ENDPOINT);
    return data.data.data;
};

export const useFleetTransport = () => {
    return useQuery({
        queryKey: ["fleet-transport"],
        queryFn: fetchFleetTransport,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
