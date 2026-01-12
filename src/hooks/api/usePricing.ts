import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";

interface PricingResponse {
  data: any;
}

const fetchPricing = async () => {
  const { data } = await apiClient.get<PricingResponse>("/api/pricing?populate=*");
  return data.data;
};

export const usePricing = () => {
  return useQuery({
    queryKey: ["pricing"],
    queryFn: fetchPricing,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
