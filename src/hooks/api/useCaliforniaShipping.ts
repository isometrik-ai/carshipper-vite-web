import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { CaliforniaShippingData, CaliforniaShippingResponse } from "@/types/CaliforniaShipping.types";
import { CALIFORNIA_ENDPOINT } from "@/constants/apiConstants";


const fetchCaliforniaShipping = async (): Promise<CaliforniaShippingData> => {
    const { data } = await apiClient.get<CaliforniaShippingResponse>(CALIFORNIA_ENDPOINT);
    return data.data.data;
};

export const useCaliforniaShipping = () => {
    return useQuery({
        queryKey: ["california-shipping"],
        queryFn: fetchCaliforniaShipping,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
