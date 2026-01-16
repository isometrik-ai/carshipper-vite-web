import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { DealershipDeliveryResponse, DealershipDeliveryData } from "@/types/DealershipDelivery.types";
import { DEALERSHIP_ENDPOINT } from "@/constants/apiConstants";


const fetchDealershipDelivery = async (): Promise<DealershipDeliveryData> => {
    const { data } = await apiClient.get<DealershipDeliveryResponse>(DEALERSHIP_ENDPOINT);
    return data.data.data;
};

export const useDealershipDelivery = () => {
    return useQuery({
        queryKey: ["dealership-delivery"],
        queryFn: fetchDealershipDelivery,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
