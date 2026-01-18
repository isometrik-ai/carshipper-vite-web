import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { HeavyHaulingData, HeavyHaulingResponse } from "@/types/HeavyHauling.types";
import { HEAVY_HAULING_ENDPOINT } from "@/constants/apiConstants";

const fetchHeavyHauling = async (): Promise<HeavyHaulingData> => {
    const { data } = await apiClient.get<HeavyHaulingResponse>(HEAVY_HAULING_ENDPOINT);
    return data.data.data;
};

export const useHeavyHauling = () => {
    return useQuery({
        queryKey: ["heavy-hauling"],
        queryFn: fetchHeavyHauling,
        staleTime: 300000,
        gcTime: 600000,
    });
};
