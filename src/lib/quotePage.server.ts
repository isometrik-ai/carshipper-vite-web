import { cache } from "react";
import type { QuoteResponse } from "@/types/Quote.types";
import { fetchQuotePageData } from "@/lib/quotePage.shared";

export const getQuotePageData = cache(async (): Promise<QuoteResponse | undefined> => {
  try {
    return await fetchQuotePageData();
  } catch {
    return undefined;
  }
});
