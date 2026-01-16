import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { HowItWorksResponse } from "@/types/how-it-works.types";
import { HOW_IT_WORKS_ENDPOINT } from "@/constants/apiConstants";

interface HowItWorksApiResponse {
  data: HowItWorksResponse;
}

const fetchHowItWorks = async (): Promise<HowItWorksResponse> => {
  const { data } = await apiClient.get<HowItWorksApiResponse>(HOW_IT_WORKS_ENDPOINT);
  return data.data;
};

export const useHowItWorks = () => {
  return useQuery({
    queryKey: ["how-it-works"],
    queryFn: fetchHowItWorks,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
