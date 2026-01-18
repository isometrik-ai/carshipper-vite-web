import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { CONTACT_ENDPOINT } from "@/constants/apiConstants";

interface ContactResponse {
  data: any;
}

const fetchContact = async () => {
  const { data } = await apiClient.get<ContactResponse>(CONTACT_ENDPOINT);
  return data.data;
};

export const useContact = () => {
  return useQuery({
    queryKey: ["contact"],
    queryFn: fetchContact,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
