import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { FOOTER_ENDPOINT } from "@/constants/apiConstants";

interface FooterResponse {
  data: any;
}

const fetchFooter = async () => {
  const { data } = await apiClient.get<FooterResponse>(FOOTER_ENDPOINT);
  return data;
};

export const useFooter = () => {
  return useQuery({
    queryKey: ["footer"],
    queryFn: fetchFooter,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
