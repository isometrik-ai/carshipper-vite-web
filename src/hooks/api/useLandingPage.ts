import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { LandingPageData } from "@/types/landing-page.types";
import { LANDING_PAGE_ENDPOINT } from "@/constants/apiConstants";

interface LandingPageResponse {
  data: LandingPageData;
}

const fetchLandingPage = async (): Promise<LandingPageData> => {
  const { data } = await apiClient.get<LandingPageResponse>(LANDING_PAGE_ENDPOINT);
  return data.data;
};

export const useLandingPage = () => {
  return useQuery({
    queryKey: ["landing-page"],
    queryFn: fetchLandingPage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
