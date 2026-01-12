import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { AboutData } from "@/types/about.types";

interface AboutResponse {
  data: AboutData;
}

const fetchAbout = async (): Promise<AboutData> => {
  const { data } = await apiClient.get<AboutResponse>(
    "/api/about?populate[StatsItems][populate]=*&populate[ValueItems][populate]=*&populate[Why30Items][populate]=*&populate[sharedCTA][populate]=*"
  );
  return data.data;
};

export const useAbout = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: fetchAbout,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
