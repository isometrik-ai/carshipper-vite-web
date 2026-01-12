import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";

interface StepConfig {
    id: number;
    step_key: string;
    title: string;
    description: string;
}

interface Option {
    id: number;
    label: string;
    value: string;
}

interface QuoteFormConfig {
    [x: string]: any;
    banner_timer_text?: string;
    privacy_lock_text?: string;
    vin_lookup_label?: string;
    vin_placeholder?: string;
    manual_divider_text?: string;
    next_button_text?: string;
    back_button_text?: string;
    submit_button_text?: string;
    make_model_placeholder?: string;
    steps_config?: StepConfig[];
    timeframe_options?: Option[];
    transport_options?: Option[];
}

interface QuoteFormConfigResponse {
    data: QuoteFormConfig;
}

const fetchQuoteFormConfig = async (): Promise<QuoteFormConfig> => {
    const { data } = await apiClient.get<QuoteFormConfigResponse>(
        "/api/quote-form-config?populate=*"
    );
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