import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { RentalCarLogisticsResponse, RentalCarLogisticsData } from "@/types/RentalCarLogistics.types";
import { RENTAL_CAR_LOGISTICS_ENDPOINT } from "@/constants/apiConstants";


const fetchRentalCarLogistics = async (): Promise<RentalCarLogisticsData> => {
    const { data } = await apiClient.get<RentalCarLogisticsResponse>(RENTAL_CAR_LOGISTICS_ENDPOINT);
    return data.data.data;
};

export const useRentalCarLogistics = () => {
    return useQuery({
        queryKey: ["rental-car-logistics"],
        queryFn: fetchRentalCarLogistics,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
