import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { QuoteFormConfigData, QuoteFormConfigResponse } from "@/types/quote-form.types";
import { QUOTE_FORM_CONFIG_ENDPOINT } from "@/constants/apiConstants";

const fetchQuoteFormConfig = async (): Promise<QuoteFormConfigData> => {
    const { data } = await apiClient.get<QuoteFormConfigResponse>(QUOTE_FORM_CONFIG_ENDPOINT);
    return data.data;
};

export const useQuoteFormConfig = () => {
    return useQuery({
        queryKey: ["quote-form-config"],
        queryFn: fetchQuoteFormConfig,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};