import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";

interface ContactResponse {
  data: any;
}

const fetchContact = async () => {
  const { data } = await apiClient.get<ContactResponse>(
    "/api/contact?populate[contact_methods]=*&populate[contact_form]=*&populate[business_info][populate]=*"
  );
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
