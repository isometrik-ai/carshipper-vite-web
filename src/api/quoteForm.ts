import { useQuery } from "@tanstack/react-query";
import type { QuoteFormResponse } from "@/types/QuoteForm.types";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const fetchQuoteForm = async (): Promise<QuoteFormResponse> => {
  const response = await fetch(
    `${STRAPI_API_URL}/api/quote-form?populate[form_config][populate][steps][populate][fields][populate]=*&populate[form_config][populate][timeframe_options][populate]=*&populate[form_config][populate][transport_type_options][populate]=*&populate[form_config][populate][button_texts][populate]=*&populate[form_config][populate][running_status_options][populate]=*&populate[form_config][populate][vehicle_field_config][populate]=*&populate[form_config][populate][vehicle_data][populate][models][populate]=*`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch quote form: ${response.statusText}`);
  }

  return response.json();
};

export const useQuoteForm = () =>
  useQuery({
    queryKey: ["quote-form"],
    queryFn: fetchQuoteForm,
    refetchOnWindowFocus: false,
  });
