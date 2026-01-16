import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { QuoteResponse, QuoteData } from "@/types/Quote.types";
import { QUOTE_ENDPOINT } from "@/constants/apiConstants";


const fetchQuote = async (): Promise<QuoteData> => {
    const { data } = await apiClient.get<QuoteResponse>(QUOTE_ENDPOINT);
    return data.data.data;
};

export const useQuote = () => {
    return useQuery({
        queryKey: ["quote"],
        queryFn: fetchQuote,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
