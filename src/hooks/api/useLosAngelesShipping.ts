import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { LOS_ANGELS_ENDPOINT } from "@/constants/apiConstants";
import { LosAngelesData, LosAngelesDataResponse } from "@/types/LosAngelesShipping.types";

const fetchLosAngelesShipping = async (): Promise<LosAngelesData> => {
  const { data } = await apiClient.get<LosAngelesDataResponse>(
    LOS_ANGELS_ENDPOINT
  );

  // Return EXACT nested model data
  return data.data.data;
};

export const useLosAngelesShipping = () => {
  return useQuery({
    queryKey: ["los-angeles-shipping"],
    queryFn: fetchLosAngelesShipping,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
