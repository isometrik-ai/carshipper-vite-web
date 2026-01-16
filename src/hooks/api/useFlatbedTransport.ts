import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { FLATBED_TRANSPORT_ENDPOINT } from "@/constants/apiConstants";
import { FlatbedData, FlatbedResponse } from "@/types/FlatbedTransport.types";


const fetchFlatbed = async (): Promise<FlatbedData> => {
  const { data } = await apiClient.get<FlatbedResponse>(FLATBED_TRANSPORT_ENDPOINT);
  return data.data.data;
};

export const useFlatbedTransport = () => {
  return useQuery({
    queryKey: ["flatbed-transport"],
    queryFn: fetchFlatbed,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
