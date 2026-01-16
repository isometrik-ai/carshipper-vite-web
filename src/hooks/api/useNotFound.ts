import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { NOT_FOUND_ENDPOINT } from "@/constants/apiConstants";

interface HomeLink {
  id: number;
  label: string;
  href: string;
}

interface NotFoundData {
  status_code: string;
  status_message: string | null;
  home_link: HomeLink;
}

interface NotFoundResponse {
  data: NotFoundData;
}

const fetchNotFound = async (): Promise<NotFoundData> => {
  const { data } = await apiClient.get<NotFoundResponse>(NOT_FOUND_ENDPOINT);
  return data.data;
};

export const useNotFound = () => {
  return useQuery({
    queryKey: ["not-found"],
    queryFn: fetchNotFound,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
