import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { AutoAuctionShippingResponse, AutoAuctionShippingData } from "@/types/AutoAuctionShipping.types";
import { AUTO_AUCTION_SHIPPING_ENDPOINT } from "@/constants/apiConstants";


const fetchAutoAuctionShipping = async (): Promise<AutoAuctionShippingData> => {
    const { data } = await apiClient.get<AutoAuctionShippingResponse>(AUTO_AUCTION_SHIPPING_ENDPOINT);
    return data.data.data;
};

export const useAutoAuctionShipping = () => {
    return useQuery({
        queryKey: ["auto-auction-shipping"],
        queryFn: fetchAutoAuctionShipping,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
